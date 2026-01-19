import { list } from "@vercel/blob";

export default async function handler(req, res) {
  const { blobs } = await list();
  res
    .status(200)
    .json(
      blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)),
    );
}
