import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

gsap.registerPlugin(useGSAP);

// ─── اللوجو مدمج مباشرة بألوان ذهبية تتماشى مع الخلفية الداكنة ───
function MomentoLogo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 680 340"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MomentoLive Logo"
    >
      <defs>
        <linearGradient id="spotLight" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#e8c97a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e8c97a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c4905a" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#9a6a35" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7c4a1e" stopOpacity="0" />
        </radialGradient>
        <clipPath id="mainClip">
          <rect x="0" y="0" width="680" height="340" />
        </clipPath>
      </defs>

      {/* Spotlight beams */}
      <polygon points="120,0 80,0 20,200 180,200" fill="url(#spotLight)" clipPath="url(#mainClip)" />
      <line x1="120" y1="0" x2="20" y2="200" stroke="#c4905a" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="80"  y1="0" x2="180" y2="200" stroke="#c4905a" strokeOpacity="0.15" strokeWidth="1" />

      <polygon points="360,0 320,0 260,220 420,220" fill="url(#spotLight)" clipPath="url(#mainClip)" />
      <line x1="360" y1="0" x2="260" y2="220" stroke="#c4905a" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="320" y1="0" x2="420" y2="220" stroke="#c4905a" strokeOpacity="0.12" strokeWidth="1" />

      <polygon points="590,0 550,0 490,200 640,200" fill="url(#spotLight)" clipPath="url(#mainClip)" />
      <line x1="590" y1="0" x2="490" y2="200" stroke="#c4905a" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="550" y1="0" x2="640" y2="200" stroke="#c4905a" strokeOpacity="0.10" strokeWidth="1" />

      {/* Studio light heads */}
      <rect x="60" y="0" width="100" height="10" rx="3" fill="#e8c97a" fillOpacity="0.5" />
      <rect x="75" y="10" width="12" height="18" rx="2" fill="#c4905a" fillOpacity="0.5" />
      <circle cx="100" cy="28" r="14" fill="#7c4a1e" fillOpacity="0.3" stroke="#e8c97a" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="100" cy="28" r="8"  fill="#c4905a" fillOpacity="0.45" stroke="#e8c97a" strokeOpacity="0.6" strokeWidth="0.8" />
      <circle cx="100" cy="28" r="3.5" fill="#f5e0a0" fillOpacity="0.95" />

      <rect x="300" y="0" width="100" height="10" rx="3" fill="#e8c97a" fillOpacity="0.5" />
      <rect x="315" y="10" width="12" height="18" rx="2" fill="#c4905a" fillOpacity="0.5" />
      <circle cx="340" cy="28" r="14" fill="#7c4a1e" fillOpacity="0.3" stroke="#e8c97a" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="340" cy="28" r="8"  fill="#c4905a" fillOpacity="0.45" stroke="#e8c97a" strokeOpacity="0.6" strokeWidth="0.8" />
      <circle cx="340" cy="28" r="3.5" fill="#f5e0a0" fillOpacity="0.95" />

      <rect x="530" y="0" width="100" height="10" rx="3" fill="#e8c97a" fillOpacity="0.4" />
      <rect x="555" y="10" width="12" height="18" rx="2" fill="#c4905a" fillOpacity="0.4" />
      <circle cx="580" cy="28" r="14" fill="#7c4a1e" fillOpacity="0.25" stroke="#e8c97a" strokeOpacity="0.4" strokeWidth="1.2" />
      <circle cx="580" cy="28" r="8"  fill="#c4905a" fillOpacity="0.35" stroke="#e8c97a" strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="580" cy="28" r="3.5" fill="#f5e0a0" fillOpacity="0.85" />

      {/* Camera Lens */}
      <g transform="translate(148,168)">
        <circle cx="0" cy="0" r="52" fill="#c4905a" fillOpacity="0.08" stroke="#e8c97a" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="42" fill="none" stroke="#c4905a" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="0" cy="0" r="32" fill="#7c4a1e" fillOpacity="0.15" stroke="#c4905a" strokeOpacity="0.3" strokeWidth="1.2" />
        <g fill="#e8c97a" fillOpacity="0.55">
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(0)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(51.4)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(102.8)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(154.2)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(205.6)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(257)" />
          <ellipse cx="0" cy="-19" rx="6" ry="12" transform="rotate(308.4)" />
        </g>
        <circle cx="0" cy="0" r="16" fill="url(#lensGlow)" stroke="#c4905a" strokeOpacity="0.5" strokeWidth="0.8" />
        <ellipse cx="-5" cy="-5" rx="5" ry="3" fill="#ffffff" fillOpacity="0.18" transform="rotate(-30)" />
        <circle cx="5" cy="-8" r="2" fill="#ffffff" fillOpacity="0.12" />
      </g>

      {/* Film Strip */}
      <rect x="42" y="145" width="22" height="50" rx="2" fill="#c4905a" fillOpacity="0.12" stroke="#e8c97a" strokeOpacity="0.25" strokeWidth="0.8" />
      {[148, 157, 166, 175, 184].map((y) => (
        <g key={y}>
          <rect x="45" y={y} width="6" height="5" rx="1" fill="#e8c97a" fillOpacity="0.45" />
          <rect x="55" y={y} width="6" height="5" rx="1" fill="#e8c97a" fillOpacity="0.45" />
        </g>
      ))}

      {/* Clapperboard */}
      <g transform="translate(580,152)">
        <rect x="-42" y="10" width="84" height="58" rx="4" fill="#c4905a" fillOpacity="0.08" stroke="#e8c97a" strokeOpacity="0.3" strokeWidth="1.2" />
        <rect x="-42" y="-6" width="84" height="20" rx="3" fill="#7c4a1e" fillOpacity="0.3" stroke="#e8c97a" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="-26" y1="-6" x2="-34" y2="14" stroke="#e8c97a" strokeOpacity="0.55" strokeWidth="5" />
        <line x1="-8"  y1="-6" x2="-16" y2="14" stroke="#e8c97a" strokeOpacity="0.55" strokeWidth="5" />
        <line x1="10"  y1="-6" x2="2"   y2="14" stroke="#e8c97a" strokeOpacity="0.55" strokeWidth="5" />
        <line x1="28"  y1="-6" x2="20"  y2="14" stroke="#e8c97a" strokeOpacity="0.55" strokeWidth="5" />
        <circle cx="-40" cy="2" r="3.5" fill="#c4905a" fillOpacity="0.6" />
        <text x="0" y="36" fontFamily="Georgia,serif" fontSize="16" fontWeight="700"
          fill="#f5e0a0" fillOpacity="0.9" textAnchor="middle" letterSpacing="3">ACTION</text>
        <rect x="-28" y="44" width="56" height="2.5" rx="1" fill="#c4905a" fillOpacity="0.2" />
        <rect x="-28" y="50" width="40" height="2.5" rx="1" fill="#c4905a" fillOpacity="0.15" />
        <rect x="-28" y="56" width="48" height="2.5" rx="1" fill="#c4905a" fillOpacity="0.15" />
      </g>

      {/* MOMENTO */}
      <text x="210" y="200"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="58" fontWeight="700"
        fill="#f0e4cc" fillOpacity="0.95"
        letterSpacing="2">MOMENTO</text>

      {/* dot */}
      <circle cx="209" cy="222" r="5" fill="#c4905a" fillOpacity="0.85" />

      {/* LIVE */}
      <text x="222" y="240"
        fontFamily="Georgia,'Times New Roman',serif"
        fontSize="28" fontWeight="400"
        fill="#c4905a" fillOpacity="0.85"
        letterSpacing="8">L I V E</text>

      {/* rule lines */}
      <line x1="210" y1="256" x2="535" y2="256" stroke="#e8c97a" strokeOpacity="0.2" strokeWidth="0.6" />
      <line x1="210" y1="259" x2="535" y2="259" stroke="#c4905a" strokeOpacity="0.1" strokeWidth="0.4" />

      {/* flare dots */}
      <circle cx="230" cy="130" r="2"   fill="#e8c97a" fillOpacity="0.3" />
      <circle cx="245" cy="120" r="1.2" fill="#c4905a" fillOpacity="0.25" />
      <circle cx="215" cy="125" r="1"   fill="#f5e0a0" fillOpacity="0.35" />
      <circle cx="470" cy="140" r="1.8" fill="#e8c97a" fillOpacity="0.25" />
      <circle cx="490" cy="128" r="1"   fill="#c4905a" fillOpacity="0.3" />
    </svg>
  );
}

// ─── الصفحة الرئيسية ───
export default function HomePage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["كل لقطة.. حكاية حب", "Your Event, Your Moments"];

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % phrases.length;
      const fullText = phrases[current];
      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1),
      );
      setTypingSpeed(isDeleting ? 75 : 150);
      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
      tl.from(".nav-brand", { y: -40, opacity: 0 })
        .from(".hero-eyebrow",    { y: 20, opacity: 0, duration: 1 }, "-=0.8")
        .from(".hero-main-title", { scale: 0.95, y: 40, opacity: 0, duration: 1.4 }, "-=0.6")
        .from(".hero-typewriter", { y: 20, opacity: 0 }, "-=0.9")
        .from(".hero-form-box",   { y: 30, opacity: 0, clearProps: "all" }, "-=0.7");
    },
    { scope: containerRef },
  );

  async function handleCreateEvent(e) {
    e.preventDefault();
    if (!eventName.trim()) {
      gsap.to(".hero-form-box", {
        x: 10, repeat: 5, yoyo: true, duration: 0.05,
      });
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    const { error } = await supabase
      .from("events")
      .insert([{ id, name: eventName.trim() }]);
    if (error) {
      alert("حدث خطأ، حاول مجدداً");
      setLoading(false);
    } else {
      navigate(`/admin/${id}`);
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-brand-ivory overflow-x-hidden relative z-10"
    >
      {/* الهيدر */}
      <nav className="flex justify-center items-center p-4 md:p-6 max-w-7xl mx-auto border-b border-zinc-800/40">
        <div
          className="nav-brand flex items-center cursor-pointer transition-all duration-300 hover:opacity-90 hover:scale-[1.01]"
          onClick={() => navigate("/")}
        >
          <MomentoLogo className="h-10 md:h-15 w-auto" />
        </div>
      </nav>

      {/* المحتوى */}
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">

{/* ─── Main Title ─── */}
<div className="hero-main-title text-center mb-6 select-none">
  <h1
    className="font-black tracking-tight leading-tight"
    style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}
  >
    <span
      className="block text-4xl md:text-6xl lg:text-7xl text-[#f0e4cc]"
      style={{
        animation: "titleRise 1s cubic-bezier(.16,1,.3,1) .2s both",
      }}
    >
      كل لحظة تستحق
    </span>
    <span
      className="block text-4xl md:text-6xl lg:text-7xl italic pt-5"
      style={{
        background: "linear-gradient(90deg,#d9cc148f,#f5e0a0,#c4905a00)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "titleRise 1s cubic-bezier(.16,1,.3,1) .5s both, shine 3s linear 1.5s infinite",
      }}
    >
      أن تُحكى
    </span>
  </h1>
        {/* typewriter — بتاعك */}
        <div className="hero-typewriter h-12 text-2xl md:text-3xl font-bold text-brand-cream flex items-center justify-center gap-1">
          <span>{typedText}</span>
          <span className="w-1 h-7 bg-brand-cream animate-pulse inline-block" />
        </div>

  <p
    className="text-xs tracking-[8px] mt-4 font-light"
    style={{
      color: "#d9cc14",
      fontFamily: "Georgia, serif",
      animation: "titleFade 1s ease 1.2s both",
    }}
  >
    ✦ &nbsp; MOMENTO LIVE &nbsp; ✦
  </p>
</div>



        {/* العنوان الرئيسي — بتاعك */}
  


        {/* الفورم — بتاعك */}
        <form
          onSubmit={handleCreateEvent}
          className="hero-form-box flex flex-col-reverse sm:flex-row items-center justify-between gap-3 w-full max-w-md mx-auto mt-12 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/60 p-3 sm:p-2 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] focus-within:border-brand-cream/40 transition-all duration-300"
        >
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto shrink-0 px-6 py-3.5 bg-[#d9cc148f] text-brand-ivory font-bold text-sm rounded-xl transition-all duration-300 hover:bg-brand-burgundy/90 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(127,32,32,0.3)] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-brand-cream" />
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-brand-cream animate-pulse" />
                <span className="tracking-wider">احفظ الذكرى</span>
              </>
            )}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder=". . .اسم المناسبة لإنشاء الألبوم"
            className="w-full bg-transparent text-brand-ivory placeholder-zinc-500 focus:outline-none text-right font-medium text-base tracking-wide px-3 py-2 sm:py-0"
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}