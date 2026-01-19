import { useEffect, useState } from "react";
import {
  FiGrid,
  FiClock,
  FiLayers,
  FiImage,
  FiChevronRight,
} from "react-icons/fi";
import UploadBox from "../components/UploadBox";
import ImageCard from "../components/ImageCard";

export default function Dashboard() {
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to sync registry:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased selection:bg-orange-100">
      {/* Dynamic Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 md:px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#fe741d] p-2 rounded-xl shadow-lg shadow-orange-200 ring-2 ring-white">
              <FiLayers className="text-white" size={18} />
            </div>
            <h1 className="text-lg md:text-xl font-black uppercase tracking-tighter italic">
              Victus<span className="text-[#fe741d]">Byte - Assets</span>
            </h1>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-300 shadow-sm">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[12px] font-black text-slate-600 uppercase tracking-widest">
              {images.length} Units Live
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12">
        {/* Upload Terminal Section */}
        <div className="mb-16">
          <UploadBox onUpload={loadImages} />
        </div>

        {/* Recent Deployment Section - Max 5 Items */}
        {images.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-slate-800">
                <FiClock className="text-[#fe741d]" size={20} />
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">
                  Recent Deployments
                </h2>
              </div>
              <div className="h-px flex-1 bg-slate-200 mx-6 hidden md:block"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-md">
                Top 5
              </span>
            </div>

            {/* Responsive Grid: 2 cols on mobile, 5 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {images.slice(0, 5).map((img) => (
                <div key={img.url} className="group">
                  <ImageCard image={img} onDelete={loadImages} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Primary Registry Section - All Data */}
        <section>
          <div className="flex items-center gap-2 mb-8 text-slate-800">
            <FiGrid className="text-[#fe741d]" size={20} />
            <h2 className="text-sm font-black uppercase tracking-[0.2em]">
              Primary Registry
            </h2>
          </div>

          {images.length > 0 ? (
            /* Responsive Grid: Adjusts density based on screen size */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6">
              {images.map((img) => (
                <div key={img.url} className="transition-all duration-300">
                  <ImageCard image={img} onDelete={loadImages} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 bg-white rounded border-2 border-dashed border-slate-200">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <FiImage size={40} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
                Registry Empty / Waiting for Assets
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Minimal Footer */}
      <footer className="mt-20 border-t border-slate-300 py-10 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">
          Victus Byte Systems &copy; 2026
        </p>
      </footer>
    </div>
  );
}
