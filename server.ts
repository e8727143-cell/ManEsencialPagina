import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// Lazy initialization of Supabase
let supabaseClient: any = null;

function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.warn("Supabase credentials missing. Visits will not be counted.");
      return null;
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to send Telegram notification
  app.post("/api/notify-visit", async (req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let currentTotal = 0;
    const supabase = getSupabase();

    if (supabase) {
      try {
        // Increment total_visits in Supabase using the SQL function or simple update
        // Since we want the new value, we'll do a read-then-write or use a RPC if available
        // For simplicity: fetch current, increment, update.
        const { data, error } = await supabase
          .from('site_stats')
          .select('value')
          .eq('name', 'total_visits')
          .single();
        
        if (!error && data) {
          currentTotal = Number(data.value) + 1;
          await supabase
            .from('site_stats')
            .update({ value: currentTotal })
            .eq('name', 'total_visits');
        } else {
          console.error("Supabase error fetching visits:", error);
        }
      } catch (err) {
        console.error("Error updating Supabase:", err);
      }
    }

    if (!token || !chatId) {
      console.warn("Telegram credentials not configured");
      return res.status(200).json({ status: "skipped", reason: "no_credentials", currentTotal });
    }

    try {
      const message = `Visita Nueva MAN 🔥 (${currentTotal})`;
      
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      
      res.json({ status: "ok", total: currentTotal });
    } catch (error: any) {
      console.error("Error sending Telegram message:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
