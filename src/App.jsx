import React, { useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { FiUploadCloud, FiCopy, FiCheck, FiImage, FiCloud, FiTrash2 } from 'react-icons/fi';

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [blobs, setBlobs] = useState([]);
  const [copyIndex, setCopyIndex] = useState(null);

  // Load images from cloud on startup
  useEffect(() => {
    fetch("/api/list")
      .then(res => res.json())
      .then(data => setBlobs(data.blobs || []))
      .catch(err => console.error("Error loading images:", err));
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const newBlob = await upload(file.name, file, { 
        access: "public", 
        handleUploadUrl: "/api/upload" 
      });
      setBlobs([newBlob, ...blobs]);
    } catch (error) {
      alert("Upload failed. Make sure Vercel Blob is connected.");
    } finally {
      setUploading(false);
    }
  };

  const copyUrl = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopyIndex(index);
    setTimeout(() => setCopyIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#fe741d] p-2 rounded-xl text-white shadow-lg shadow-orange-100">
              <FiCloud size={20}/>
            </div>
            <span className="font-black text-xl text-slate-800 uppercase tracking-tighter">
              Victus<span className="text-[#fe741d]">Assets</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
             <span className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
              {blobs.length} Files Live
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Upload Terminal */}
        <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 p-12 text-center mb-12 group hover:border-[#fe741d] transition-all duration-300 shadow-sm">
          <input type="file" onChange={handleUpload} className="hidden" id="asset-up" disabled={uploading} />
          <label htmlFor="asset-up" className="cursor-pointer block">
            <div className="bg-orange-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
              <FiUploadCloud className="text-[#fe741d]" size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
              {uploading ? "Deploying to Cloud..." : "Upload New Asset"}
            </h2>
            <p className="text-slate-400 font-medium mb-8 max-w-xs mx-auto">Selected files will be hosted permanently on your Vercel subdomain.</p>
            <div className={`inline-block px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all ${uploading ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-[#fe741d] hover:shadow-xl hover:shadow-orange-200'}`}>
              {uploading ? "Uploading..." : "Browse Local Files"}
            </div>
          </label>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {blobs.map((b, i) => (
            <div key={b.url} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="h-44 bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
                <img src={b.url} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" alt="Cloud Asset" />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="p-4 bg-white">
                <button 
                  onClick={() => copyUrl(b.url, i)}
                  className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                    copyIndex === i 
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {copyIndex === i ? <><FiCheck size={14} /> Copied</> : <><FiCopy size={14} /> Copy Link</>}
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {blobs.length === 0 && !uploading && (
            <div className="col-span-full py-24 text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 opacity-40">
                <FiImage size={32} className="text-slate-400" />
              </div>
              <p className="font-black text-slate-300 uppercase tracking-[0.4em] text-xs">Registry Empty</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}