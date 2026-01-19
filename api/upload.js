import { put } from "@vercel/blob";

export default async function handler(req, res) {
  const blob = await put(req.query.filename, req, { access: "public" });
  res.status(200).json(blob);
}
