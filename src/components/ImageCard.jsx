export default function ImageCard({ image, onDelete }) {
  const copyUrl = () => navigator.clipboard.writeText(image.url);

  const remove = async () => {
    await fetch(`/api/delete?url=${encodeURIComponent(image.url)}`);
    onDelete();
  };

  return (
    <div className="relative group">
      <img src={image.url} className="rounded-xl aspect-square object-cover" />

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
        <button
          onClick={copyUrl}
          className="px-3 py-1 bg-white text-sm rounded"
        >
          Copy
        </button>
        <button
          onClick={remove}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
