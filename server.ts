import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import cron from "node-cron";

dotenv.config();

const VISITS_FILE = path.join(process.cwd(), "visits.json");

interface VisitsData {
  total: number;
  daily: number;
  lastDate: string;
}

// Helper to get visits
function getVisits(): VisitsData {
  const today = new Date().toISOString().split('T')[0];
  try {
    if (fs.existsSync(VISITS_FILE)) {
      const data = fs.readFileSync(VISITS_FILE, "utf-8");
      const visits = JSON.parse(data) as VisitsData;
      
      // If it's a new day, reset daily but keep the date for the cron job to know when to send
      // (Actually, the cron job will handle the reset after sending)
      if (visits.lastDate !== today) {
        // We don't reset here so the cron job can send the Final count of the previous day if it missed it
        // But for simplicity, let's just ensure the structure is correct
        if (visits.daily === undefined) visits.daily = 0;
        if (visits.lastDate === undefined) visits.lastDate = today;
      }
      return visits;
    }
  } catch (e) {
    console.error("Error reading internal visits file", e);
  }
  return { total: 0, daily: 0, lastDate: today };
}

// Helper to save visits
function saveVisits(visits: VisitsData) {
  try {
    fs.writeFileSync(VISITS_FILE, JSON.stringify(visits, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving internal visits file", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Cron Job: Send daily report at 23:00 (11 PM) Uruguay Time
  cron.schedule("0 23 * * *", async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!token || !chatId) return;

    const visits = getVisits();
    
    if (visits.daily > 0) {
      try {
        const message = `📊 **RESUMEN DEL DÍA**\n\nHoy tuviste **${visits.daily}** visitantes en la página. ¡Felicidades! 🎉\n\nTotal histórico: ${visits.total}`;
        
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        });

        // Reset daily count after sending report
        visits.daily = 0;
        visits.lastDate = new Date().toISOString().split('T')[0];
        saveVisits(visits);
        
        console.log("Daily report sent successfully");
      } catch (error) {
        console.error("Error sending daily Telegram report:", error);
      }
    }
  }, {
    timezone: "America/Montevideo"
  });

  // API Route to send Telegram notification with counter
  app.post("/api/notify-visit", async (req, res) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Increment counters
    const today = new Date().toISOString().split('T')[0];
    const visits = getVisits();
    
    // Check if we need to reset daily count (if the cron didn't run or it's just a new day)
    if (visits.lastDate !== today) {
      visits.daily = 1;
      visits.lastDate = today;
    } else {
      visits.daily += 1;
    }
    
    visits.total += 1;
    saveVisits(visits);

    if (!token || !chatId) {
      console.warn("Telegram credentials not configured");
      return res.status(200).json({ status: "skipped", reason: "no_credentials", total: visits.total });
    }

    try {
      const message = `🚨 ¡Nuevo visitante en tu página!\n\nEsta es la visita #${visits.daily} del día 🔥\nTotal acumulado: ${visits.total} usuarios.`;
      
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: message,
      });
      res.json({ status: "ok", total: visits.total, daily: visits.daily });
    } catch (error) {
      console.error("Error sending Telegram message:", error);
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
