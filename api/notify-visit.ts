import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  let currentTotal = 0;

  console.log("Processing visit notification...");

  // 1. Supabase Logic
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Try to get current value
      const { data, error: fetchError } = await supabase
        .from('site_stats')
        .select('value')
        .eq('name', 'total_visits')
        .maybeSingle();
      
      if (fetchError) {
        console.error("Supabase fetch error:", fetchError);
      }

      if (data) {
        currentTotal = Number(data.value) + 1;
        await supabase
          .from('site_stats')
          .update({ value: currentTotal })
          .eq('name', 'total_visits');
      } else {
        // If row doesn't exist, try to create it
        currentTotal = 1;
        await supabase
          .from('site_stats')
          .insert([{ name: 'total_visits', value: 1 }]);
      }
    } catch (e) {
      console.error("Supabase exception:", e);
    }
  }

  // 2. Telegram Notification
  if (token && chatId) {
    try {
      const message = `Visita Nueva MAN 🔥 (${currentTotal || '1'})`;
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      
      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });
      console.log("Telegram message sent");
    } catch (e: any) {
      console.error("Telegram notification failed:", e.message);
    }
  }

  return res.status(200).json({ status: 'ok', total: currentTotal });
}
