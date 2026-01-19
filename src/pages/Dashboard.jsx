import { useEffect, useState } from "react";
import { FiGrid, FiClock, FiLayers, FiImage } from "react-icons/fi"; // Install react-icons
import UploadBox from "../components/UploadBox";
import ImageCard from "../components/ImageCard";

export default function Dashboard() {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans antialiased">
      {/* Header / Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#fe741d] p-2 rounded-xl shadow-lg shadow-orange-200">
              <FiLayers className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">
              Victus<span className="text-[#fe741d]">Assets</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {images.length} Units Online
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* Upload Section - Styled via UploadBox component */}
        <div className="mb-12">
          <UploadBox onUpload={loadImages} />
        </div>

        {/* Recent Section */}
        {images.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <FiClock size={18} />
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">
                Recently Deployed
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {images.slice(0, 4).map((img) => (
                <div
                  key={img.url}
                  className="transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <ImageCard image={img} onDelete={loadImages} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Images Section */}
        <section>
          <div className="flex items-center gap-2 mb-6 text-slate-400 border-t border-slate-200 pt-10">
            <FiGrid size={18} />
            <h2 className="text-xs font-black uppercase tracking-[0.2em]">
              Primary Registry
            </h2>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {images.map((img) => (
                <div
                  key={img.url}
                  className="hover:shadow-2xl hover:shadow-slate-200 rounded-3xl transition-all duration-300"
                >
                  <ImageCard image={img} onDelete={loadImages} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
              <FiImage size={48} className="text-slate-200 mb-4" />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                No assets found in cloud storage
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
