import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "../supabaseClient";
import Gallery from "../components/Gallery";
import {
  Sparkles,
  Copy,
  Printer,
  Download,
  LayoutGrid,
  QrCode,
  ArrowLeft,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function AdminPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [eventName, setEventName] = useState("");
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("qr");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const eventUrl = `${window.location.origin}/event/${eventId}`;

  useEffect(() => {
    async function loadEvent() {
      const { data } = await supabase
        .from("events")
        .select("name")
        .eq("id", eventId)
        .single();
      if (data) setEventName(data.name);
    }
    loadEvent();
    loadImagesCount();
  }, [eventId, refresh]);

  async function loadImagesCount() {
    const { data } = await supabase.storage.from("events").list(eventId);
    if (data) {
      setImages(data.filter((f) => f.name !== ".emptyFolderPlaceholder"));
    }
  }

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.2 },
      });
      tl.from(".admin-hdr", { y: -30, opacity: 0 })
        .from(".adm-stat-card", { y: 20, opacity: 0, stagger: 0.1 }, "-=0.5")
        .from(".adm-main-holder", { scale: 0.97, opacity: 0 }, "-=0.6");
    },
    { scope: containerRef },
  );

  function copyLink() {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function downloadAll() {
    if (images.length === 0 || downloading) return;
    setDownloading(true);
    try {
      for (const img of images) {
        const { data } = await supabase.storage
          .from("events")
          .download(`${eventId}/${img.name}`);
        if (data) {
          const url = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.href = url;
          a.download = img.name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      }
    } catch (err) {
      console.error(err);
    }
    setDownloading(false);
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-brand-ivory p-4 md:p-8 relative z-10"
    >
      <div className="max-w-5xl mx-auto">
        {/* الهيدر الأنيق الجديد */}
        <div className="admin-hdr flex justify-between items-center mb-10 pb-4 border-b border-zinc-800/60">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-cream/80 hover:text-brand-cream hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> العودة للرئيسية
          </button>
        </div>

        {/* الكروت الإحصائية الزجاجية الشفافة الفاخرة */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="adm-stat-card bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-5 rounded-2xl shadow-xl">
            <span className="block text-[10px] text-brand-cream/60 uppercase font-black tracking-wider mb-2 text-right">
              اسم المناسبة
            </span>
            <span className="text-base md:text-lg font-bold text-brand-ivory truncate block text-right">
              {eventName || "جاري التحميل..."}
            </span>
          </div>
          <div className="adm-stat-card bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-5 rounded-2xl shadow-xl">
            <span className="block text-[10px] text-brand-cream/60 uppercase font-black tracking-wider mb-2 text-right">
              رمز الدخول الداخلي
            </span>
            <span className="text-base md:text-lg font-mono font-bold text-brand-cream tracking-widest block text-right">
              {eventId}
            </span>
          </div>
          <div className="adm-stat-card bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-5 rounded-2xl shadow-xl col-span-2 md:col-span-1">
            <span className="block text-[10px] text-brand-cream/60 uppercase font-black tracking-wider mb-2 text-right">
              إجمالي الصور الملتقطة
            </span>
            <span className="text-base md:text-lg font-bold text-brand-ivory block text-right">
              {images.length}{" "}
              <span className="text-xs font-normal text-zinc-400">صورة</span>
            </span>
          </div>
        </div>

        {/* اللوحة الرئيسية المحسنة بتأثير الزجاج الداكن النقي */}
        <div className="adm-main-holder bg-zinc-950/40 backdrop-blur-2xl border border-zinc-800/60 rounded-3xl p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* التبويبات بطابع المودرن-كلاسيك */}
          <div className="flex gap-6 mb-8 border-b border-zinc-800/60 pb-3">
            <button
              onClick={() => setActiveTab("qr")}
              className={`pb-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${activeTab === "qr" ? "text-brand-cream border-b-2 border-brand-cream scale-105" : "text-zinc-500 hover:text-zinc-400"}`}
            >
              <QrCode className="w-3.5 h-3.5" /> تجهيز رمز الـ QR
            </button>
            <button
              onClick={() => {
                setActiveTab("gallery");
                setRefresh((r) => r + 1);
              }}
              className={`pb-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${activeTab === "gallery" ? "text-brand-cream border-b-2 border-brand-cream scale-105" : "text-zinc-500 hover:text-zinc-400"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> معرض الصور المستلمة (
              {images.length})
            </button>
          </div>

          {activeTab === "qr" ? (
            <div className="grid md:grid-cols-2 gap-8 items-center py-4">
              {/* صندوق الـ QR الفاخر المخفف */}
              <div className="flex flex-col items-center justify-center border border-zinc-800/50 p-6 bg-zinc-900/30 backdrop-blur-sm rounded-2xl max-w-sm mx-auto w-full shadow-inner">
                <div className="bg-brand-ivory p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:scale-[1.02]">
                  <QRCodeSVG
                    value={eventUrl}
                    size={190}
                    level="H"
                    fgColor="#121110"
                    bgColor="#FDFBF7"
                  />
                </div>
              </div>

              {/* النصوص المحدثة بأسلوب سينمائي دافئ ومحايد */}
              <div className="space-y-4 text-center md:text-right">
                <h3 className="text-xl md:text-2xl font-black  tracking-wide text-brand-cream/70 ">
                  كل ضيف يحمل لقطة فريدة؛ بمجرد مسح الرمز، تتدفق زواياكم المفضلة
                  لتصنع أرشيفاً حياً ينبض بجمال ليلتنا.
                </h3>

                {/* الأزرار المطورة المنحوتة */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                  <button
                    onClick={copyLink}
                    className="px-5 py-3 bg-zinc-800/80 hover:bg-zinc-700/80 text-brand-ivory text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-zinc-700/40 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Copy className="w-3.5 h-3.5 text-brand-cream" />
                    {copied ? "✓ تم نسخ الرابط" : "نسخ رابط المشاركة"}
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-5 py-3 bg-[#d9cc148f] hover:bg-[#d9cc148f]/90 text-brand-ivory text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(127,32,32,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Printer className="w-3.5 h-3.5 text-brand-cream" />
                    طباعة لوحة العرض المباشر
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* محتوى معرض الستريم الخاص بالصور */
            <div className="space-y-6">
              {images.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={downloadAll}
                    disabled={downloading}
                    className="px-5 py-2.5 bg-[#d9cc148f] text-brand-ivory font-bold text-xs rounded-xl hover:bg-[#d9cc148f]/90 flex items-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:bg-zinc-800 hover:scale-[1.02]"
                  >
                    <Download
                      className={`w-3.5 h-3.5 ${downloading ? "animate-bounce" : ""}`}
                    />
                    {downloading
                      ? "جاري التجميع والتحميل..."
                      : `تحميل كافة الصور (${images.length})`}
                  </button>
                </div>
              )}
              <Gallery eventId={eventId} refresh={refresh} allowDelete={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
