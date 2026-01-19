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
    <div className="mb-6 flex md:flex-row flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block text-md w-full md:w-auto border border-slate-300 px-5 py-1.5 bg-slate-200 rounded-2xl hover:bg-slate-300 cursor-pointer"
      />

    
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-8 py-2 w-full md:w-auto font-bold text-[12px] uppercase tracking-widest text-white transition-all duration-300 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-[#fe741d] hover:border-[#fe741d] hover:shadow-lg hover:shadow-orange-100 active:scale-95 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Syncing..." : "Upload Image"}
      </button>
    </div>
  );
}
