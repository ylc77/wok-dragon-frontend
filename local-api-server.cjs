const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

function loadLocalEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadLocalEnv();

const PORT = Number(process.env.LOCAL_API_PORT || 8787);

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error('Request body is too large.'));
      }
    });
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });
    request.on('error', reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  });
  response.end(JSON.stringify(payload));
}

function validateReservation(data) {
  const required = ['name', 'phone', 'date', 'time', 'guests'];
  const missing = required.filter((field) => !String(data[field] ?? '').trim());
  return missing.length ? `Missing required fields: ${missing.join(', ')}` : '';
}

function formatTelegramMessage(data) {
  return [
    '🍜 New Wok Dragon reservation request',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Date: ${data.date}`,
    `Time: ${data.time}`,
    `Guests: ${data.guests}`,
    `Notes: ${data.notes || '-'}`,
    '',
    'Please contact the guest directly to confirm.',
  ].join('\n');
}

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram is not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.');
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });
  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.description || 'Telegram sendMessage failed.');
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {});
    return;
  }

  if (request.url !== '/api/reservation' || request.method !== 'POST') {
    sendJson(response, 404, { ok: false, error: 'Not found.' });
    return;
  }

  try {
    const reservation = await readJson(request);
    const validationError = validateReservation(reservation);
    if (validationError) {
      sendJson(response, 400, { ok: false, error: validationError });
      return;
    }

    await sendTelegramMessage(formatTelegramMessage(reservation));
    sendJson(response, 200, { ok: true });
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : 'Reservation request failed.',
    });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Reservation API listening on http://127.0.0.1:${PORT}`);
});
