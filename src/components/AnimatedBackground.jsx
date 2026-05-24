import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";  
import img7 from "../images/7.jpg";
import img8 from "../images/8.jpg";
export default function AnimatedBackground() {
    const IMGS = [img1, img2, img3, img4, img5, img6, img7, img8];
 const DATA = [...IMGS, ...IMGS.slice(0, 4)];
  const N = DATA.length;

  return (
    <div className="fixed inset-0 pointer-events-none z-[11] overflow-hidden  flex items-center justify-center">
      {/* طبقة تظليل علوية ناعمة لدمج الألوان مع الخلفية الداكنة */}
      <div className="absolute inset-0 bg-[#12111000]/75  z-[11] pointer-events-none" />

      {/* الـ 3D Scene الرئيسي مأخوذ من كودكِ */}
      <div className="scene w-full h-full flex items-center justify-center">
      <div className="a3d" style={{ '--n': N }}>
          {DATA.map((src, i) => (
            <img
              key={i}
             className="card-3d opacity-40 grayscale-[30%] contrast-[90%]"
              src={src}
        style={{ '--i': i, width: '220px', height: '300px', objectFit: 'cover', borderRadius: '16px' }}
              alt="Event visual element"
            />
          ))}
        </div>
      </div>
    </div>
  );
}