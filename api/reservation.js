function readBody(request) {
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

function validateReservation(data) {
  const required = ['name', 'phone', 'date', 'time', 'guests'];
  const missing = required.filter((field) => !String(data[field] ?? '').trim());
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  return '';
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

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  try {
    const reservation = await readBody(request);
    const validationError = validateReservation(reservation);
    if (validationError) {
      response.status(400).json({ ok: false, error: validationError });
      return;
    }

    await sendTelegramMessage(formatTelegramMessage(reservation));
    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Reservation request failed.',
    });
  }
}
