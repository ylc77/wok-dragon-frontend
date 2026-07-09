export default function handler(_req, res) {
  return res.status(200).json({
    ok: true,
    message: 'api function works',
  });
}
