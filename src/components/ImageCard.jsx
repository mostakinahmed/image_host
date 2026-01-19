export default function ImageCard({ image, onDelete }) {
  const copyLink = async () => {
    await navigator.clipboard.writeText(image.url);
    alert("Image link copied!");
  };

  const deleteImage = async () => {
    await fetch(`/api/delete?url=${encodeURIComponent(image.url)}`);
    onDelete();
  };

  return (
    <div className="rounded-xl overflow-hidden shadow bg-white">
      <img
        src={image.url}
        alt="uploaded"
        className="w-full h-40 object-cover"
      />

      <div className="p-2 flex justify-between gap-2">
        <button
          onClick={copyLink}
          className="flex-1 text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Copy Link
        </button>

        <button
          onClick={deleteImage}
          className="flex-1 text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
