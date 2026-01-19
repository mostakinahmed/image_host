import { list } from "@vercel/blob";
export default async function handler(request, response) {
  try {
    const { blobs } = await list();
    return response.status(200).json({ blobs });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
