import { useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { CloudUpload, CheckCircle, XCircle } from "lucide-react";

export default function Upload({ eventId, onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function addFiles(selected) {
    const valid = Array.from(selected).filter(
      (f) => f.size <= 20 * 1024 * 1024,
    );
    const mapped = valid.map((f) => ({
      file: f,
      id: Math.random().toString(36).slice(2),
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
    }));
    setFiles((prev) => [...prev, ...mapped]);
    setStatus("idle");
  }

  function removeFile(id) {
    setFiles((prev) => {
      const f = prev.find((x) => x.id === id);
      if (f?.preview) URL.revokeObjectURL(f.preview);
      return prev.filter((x) => x.id !== id);
    });
  }

  async function handleUpload() {
    if (files.length === 0 || status === "uploading") return;
    setStatus("uploading");
    setProgress(10);

    try {
      let step = Math.floor(80 / files.length);
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const ext = item.file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
        await supabase.storage
          .from("events")
          .upload(`${eventId}/${fileName}`, item.file);
        setProgress((prev) => Math.min(prev + step, 90));
      }
      setProgress(100);
      setStatus("success");
      setFiles([]);
      if (onUploadComplete) onUploadComplete();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      {status !== "success" && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${dragOver ? "border-brand-cream bg-brand-cream/5" : "border-[#413e0cb8] bg-zinc-950/40"}`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) addFiles(e.target.files);
            }}
            className="hidden"
          />
          <div
            className="max-w-xs mx-auto flex flex-col items-center justify-center cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <CloudUpload className="w-10 h-10 text-brand-sage mb-3" />
            <span className="block text-sm font-bold text-brand-ivory mb-1">
              اضغط هنا أو اسحب صورك هنا
            </span>
            <span className="block text-xs text-brand-cream/60">
              الحد الأقصى للصورة 20MB
            </span>
          </div>
        </div>
      )}

      {files.length > 0 && status === "idle" && (
        <div className="grid grid-cols-4 gap-2 border border-[#413e0cb8] p-3 rounded-xl ">
          {files.map((f) => (
            <div
              key={f.id}
              className="aspect-square rounded-lg overflow-hidden bg-zinc-900 relative border border-[#413e0cb8]"
            >
              {f.preview && (
                <img
                  src={f.preview}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={() => removeFile(f.id)}
                className="absolute top-1 left-1 w-5 h-5 bg-black/70 text-white rounded-full text-[10px] font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && status === "idle" && (
        <button
          onClick={handleUpload}
          className="w-full py-3.5 bg-[#d9cc148f] hover:bg-[#d9cc148f]/80 text-white font-black rounded-xl text-sm transition-all"
        >
          تأكيد ورفع {files.length} صور
        </button>
      )}

      {status === "uploading" && (
        <div className="space-y-2">
          <div className="w-full rounded-full h-1.5 overflow-hidden border border-[#413e0cb8]">
            <div
              className="bg-brand-cream h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="block text-center text-xs text-brand-sage font-mono">
            Uploading: {progress}%
          </span>
        </div>
      )}

      {status === "success" && (
        <div className="text-center py-8 space-y-4">
          <CheckCircle className="w-12 h-12 text-brand-sage mx-auto" />
          <div>
            <h4 className="text-base font-bold text-brand-ivory">
              تم الرفع بنجاح!
            </h4>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="px-4 py-2  border border-[#413e0cb8] text-brand-cream text-xs rounded-xl"
          >
            رفع المزيد
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center py-6 space-y-2">
          <XCircle className="w-10 h-10 text-red-500 mx-auto" />
          <p className="text-xs text-red-400">حصل خطأ، يرجى المحاولة لاحقاً.</p>
        </div>
      )}
    </div>
  );
}
