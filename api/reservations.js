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
        const data = body ? JSON.parse(body) : {};
        resolve(data);
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });
    request.on('error', reject);
  });
}

function validateReservation(data) {
  const required = ['name', 'phone', 'date', 'time', 'guests'];
  const missing = required.filter((field) => !String(data?.[field] ?? '').trim());
  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(', ')}`;
  }
  return '';
}

function formatDateWithWeekday(rawDate) {
  const fallback = '未填写';
  const text = String(rawDate ?? '').trim();
  if (!text) {
    return fallback;
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (!dateMatch) {
    return fallback;
  }

  const [, year, month, day] = dateMatch;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }

  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return `${text} ${weekDays[parsed.getDay()]}`;
}

function formatTextWithFallback(value, fallback) {
  const text = String(value ?? '').trim();
  return text || fallback;
}

function formatTelegramMessage(data) {
  const dateText = formatDateWithWeekday(data?.date);
  const name = formatTextWithFallback(data?.name, '未填写');
  const phone = formatTextWithFallback(data?.phone, '未填写');
  const time = formatTextWithFallback(data?.time, '未填写');
  const guests = formatTextWithFallback(data?.guests, '未填写');
  const notes = formatTextWithFallback(data?.notes, '无');

  return [
    '🍽️ 新预约通知',
    '',
    `👤 姓名：${name}`,
    `📞 电话：${phone}`,
    `📅 日期：${dateText}`,
    `🕒 时间：${time}`,
    `👥 人数：${guests}`,
    `📝 备注：${notes}`,
    '',
    '请直接与顾客联系确认预约。',
  ].join('\n');
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

  const result = (await response.json().catch(() => null));

  if (!response.ok || !result?.ok) {
    const detail = result?.description || `Telegram API responded with status ${response.status}.`;
    throw new Error(detail);
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
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

  try {
    const reservation = await readBody(request);
    const validationError = validateReservation(reservation);

    if (validationError) {
      response.status(400).json({ ok: false, error: validationError });
      return;
    }

    await sendTelegramMessage(formatTelegramMessage(reservation), token, chatId);
    response.status(200).json({ ok: true });
  } catch (error) {
    response.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Reservation request failed.',
    });
  }
}
