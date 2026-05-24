import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { supabase } from "../supabaseClient";
import Upload from "../components/Upload";
import Gallery from "../components/Gallery";

gsap.registerPlugin(useGSAP);

export default function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [eventName, setEventName] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState("upload");

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
  }, [eventId]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1 },
      });
      tl.from(".evt-hdr", { y: -20, opacity: 0 }).from(
        ".evt-card-holder",
        { scale: 0.97, y: 20, opacity: 0 },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="min-h-screen  text-brand-ivory p-4">
      <div className="max-w-2xl mx-auto">
        <div className="evt-hdr text-center pt-8 pb-10 border-b border-[#413e0cb8] mb-8">
          <span className="text-[10px] text-brand-sage uppercase tracking-widest font-black block mb-1">
            Welcome to
          </span>
          <h2 className="text-2xl font-black text-brand-ivory mb-2">
            {eventName || "Live Celebration"}
          </h2>
          <span className="inline-block px-3 py-1 bg-[#d9cc148f]/20 border border-brand-burgundy/40 text-brand-cream font-mono text-xs font-bold rounded-full">
            #{eventId}
          </span>
        </div>

        <div className="evt-hdr flex justify-center gap-8 mb-6 font-bold text-xs uppercase tracking-widest">
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-2 transition-colors ${activeTab === "upload" ? "text-brand-cream border-b border-brand-cream" : "text-zinc-500"}`}
          >
            Upload Photo
          </button>
          <button
            onClick={() => {
              setActiveTab("gallery");
              setRefresh((r) => r + 1);
            }}
            className={`pb-2 transition-colors ${activeTab === "gallery" ? "text-brand-cream border-b border-brand-cream" : "text-zinc-500"}`}
          >
            View Stream
          </button>
        </div>

        <div className="evt-card-holder bg-zinc-900 border border-[#413e0cb8] rounded-2xl p-6 shadow-2xl">
          {activeTab === "upload" ? (
            <Upload
              eventId={eventId}
              onUploadComplete={() => {
                setRefresh((r) => r + 1);
                setActiveTab("gallery");
              }}
            />
          ) : (
            <Gallery eventId={eventId} refresh={refresh} allowDelete={false} />
          )}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-[10px] uppercase font-bold text-brand-sage hover:text-brand-cream"
          >
            Exit Experience
          </button>
        </div>
      </div>
    </div>
  );
}
