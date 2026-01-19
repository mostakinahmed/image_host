import { del } from "@vercel/blob";

export default async function handler(req, res) {
  await del(req.query.url);
  res.status(200).json({ success: true });
}
