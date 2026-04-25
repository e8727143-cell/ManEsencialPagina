import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const VISITS_FILE = path.join(process.cwd(), "visits.json");

// Helper to get visits
function getVisits() {
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading internal visits file", e);
  }
  return { total: 0 };
}

// Helper to save visits
function saveVisits(visits: { total: number }) {
  try {
    fs.writeFileSync(VISITS_FILE, JSON.stringify(visits), "utf-8");
  } catch (e) {
    console.error("Error saving internal visits file", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to send Telegram notification
  app.post("/api/notify-visit", async (req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Increment counter
    const visits = getVisits();
    visits.total += 1;
    saveVisits(visits);

    if (!token || !chatId) {
      console.warn("Telegram credentials not configured");
      return res.status(200).json({ status: "skipped", reason: "no_credentials", currentTotal: visits.total });
    }

    try {
      const message = `Visita Nueva MAN 🔥 (${visits.total})`;
      
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      
      res.json({ status: "ok", total: visits.total });
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
