import { useState } from "react";

export default function UploadBox({ onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    setLoading(false);
    setFile(null);
    onUpload(); // refresh images
  };

  return (
    <div className="mb-6 flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
