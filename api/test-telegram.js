function readMessageFromBody(request) {
  return new Promise((resolve) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        const message = typeof parsed?.message === 'string' && parsed.message.trim().length > 0 ? parsed.message : '';
        resolve(message);
      } catch {
        resolve('');
      }
    });
    request.on('error', () => {
      resolve('');
    });
  });
}

async function sendTelegramMessage(message, token, chatId) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      disable_web_page_preview: true,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.ok) {
    const detail = payload?.description || `Telegram API responded with status ${response.status}.`;
    const error = new Error(detail);
    throw error;
  }
}

export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    response.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    response.status(500).json({
      ok: false,
      error: 'Missing Telegram environment variables. Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.',
    });
    return;
  }

  let message = '✅ Telegram 测试消息发送成功，这是来自 Wok Dragon 预约系统的测试通知。';
  if (request.method === 'POST') {
    const customMessage = await readMessageFromBody(request);
    if (customMessage) {
      message = customMessage;
    }
  } else if (request.url.includes('?message=')) {
    const url = new URL(request.url, 'http://localhost');
    const queryMessage = url.searchParams.get('message');
    if (typeof queryMessage === 'string' && queryMessage.trim().length > 0) {
      message = queryMessage;
    }
  }

  try {
    await sendTelegramMessage(message, token, chatId);
    response.status(200).json({
      ok: true,
      message: '✅ Telegram 测试消息发送成功，这是来自 Wok Dragon 预约系统的测试通知。',
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Telegram test failed.',
    });
  }
}
