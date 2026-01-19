import { handleUpload } from "@vercel/blob/client";

export default async function handler(request, response) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // This is where you can limit what files are allowed
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          tokenPayload: JSON.stringify({
            // optional data to send to the callback
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Logic to run after upload finishes
        console.log("Upload finished:", blob.url);
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}
