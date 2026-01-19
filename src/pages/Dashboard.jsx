import { useEffect, useState } from "react";
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
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Image Dashboard</h1>

        <UploadBox onUpload={loadImages} />

        <h2 className="mt-8 mb-3 text-lg font-medium">Recent</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 4).map((img) => (
            <ImageCard key={img.url} image={img} onDelete={loadImages} />
          ))}
        </div>

        <h2 className="mt-10 mb-3 text-lg font-medium">All Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((img) => (
            <ImageCard key={img.url} image={img} onDelete={loadImages} />
          ))}
        </div>
      </div>
    </div>
  );
}
