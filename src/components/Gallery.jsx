import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "../supabaseClient";
import { Loader2, Trash2, Download } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function Gallery({ eventId, refresh, allowDelete = false }) {
  const gridRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadImages();
  }, [eventId, refresh]);

  async function loadImages() {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("events")
      .list(eventId, { sortBy: { column: "created_at", order: "desc" } });
    if (error || !data) {
      setLoading(false);
      return;
    }

    const urls = data
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((file) => {
        const { data: urlData } = supabase.storage
          .from("events")
          .getPublicUrl(`${eventId}/${file.name}`);
        return { url: urlData.publicUrl, name: file.name };
      });

    setImages(urls);
    setLoading(false);
  }

  useGSAP(() => {
    if (images.length > 0 && !loading) {
      gsap.fromTo(
        ".gallery-card-node",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "back.out(1.15)",
          overwrite: "auto",
        },
      );
    }
  }, [images, loading]);

  async function handleDelete(img) {
    if (!window.confirm("تحذف الصورة دي نهائياً؟")) return;
    setDeleting(img.name);
    const { error } = await supabase.storage
      .from("events")
      .remove([`${eventId}/${img.name}`]);
    if (!error) setImages((prev) => prev.filter((i) => i.name !== img.name));
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-brand-sage gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-cream" />
        <span className="text-xs font-mono tracking-widest uppercase">
          Streaming Grid...
        </span>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-[#413e0cb8] rounded-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-sage">
          المعرض فارغ حالياً
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
    >
      {images.map((img, idx) => (
        <div
          key={img.name || idx}
          onClick={() => setLightbox(img)}
          className="gallery-card-node aspect-square rounded-xl overflow-hidden  border border-[#413e0cb8] relative group cursor-pointer shadow-md"
        >
          <img
            src={img.url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {allowDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(img);
              }}
              disabled={deleting === img.name}
              className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-[#d9cc148f] text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ))}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
          <img
            src={lightbox.url}
            alt=""
            className="max-w-full max-h-[80vh] rounded-xl object-contain border border-[#413e0cb8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex gap-4 mt-6" onClick={(e) => e.stopPropagation()}>
            <a
              href={lightbox.url}
              download
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-[#d9cc148f] text-white font-black rounded-xl text-xs flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> تحميل الصورة بدقة كاملة
            </a>
            <button
              onClick={() => setLightbox(null)}
              className="px-4 py-2.5 bg-zinc-900 border border-[#413e0cb8] text-brand-cream text-xs rounded-xl"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
