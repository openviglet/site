// ── Fórmulas químicas com subscrito Unicode ──
const FORMULAS = [
  "H₂O", "CO₂", "NaCl", "C₆H₁₂O₆", "O₂",
  "NH₃", "CH₄", "H₂SO₄", "Fe₂O₃", "CaCO₃",
  "C₂H₅OH", "HCl", "NaOH", "KMnO₄", "N₂",
  "SiO₂", "Al₂O₃", "MgO", "ZnSO₄", "Cu",
  "H₂O₂", "SO₃", "PbO₂", "BaSO₄", "AgNO₃",
  "K₂Cr₂O₇", "Na₂CO₃", "Mg(OH)₂", "FeCl₃", "CuSO₄",
  "Ca(OH)₂", "HNO₃", "P₄O₁₀", "Cl₂", "Br₂",
];

// Distribui fórmulas em grid para evitar agrupamento
const FORMULA_ITEMS = FORMULAS.map((f, i) => {
  const cols = 7;
  const rows = Math.ceil(FORMULAS.length / cols);
  const col = i % cols;
  const row = Math.floor(i / cols);
  const cellW = 100 / cols;
  const cellH = 90 / rows;
  return {
    text: f,
    top: `${3 + row * cellH + ((i * 7) % (cellH * 0.6))}%`,
    left: `${1 + col * cellW + ((i * 11) % (cellW * 0.6))}%`,
    size: 0.8 + (i % 5) * 0.25,
    duration: 14 + (i % 7) * 4,
    delay: (i % 8) * -2.5,
    drift: ["hero-drift-a", "hero-drift-b", "hero-drift-c"][i % 3],
    opacity: 0.25 + (i % 4) * 0.08,
  };
});

// ── Ligações atômicas (SVG paths) ──
interface Bond {
  top: string; left: string; size: number;
  duration: number; delay: number; drift: string;
  opacity: number; path: string;
}

const BONDS: Bond[] = [
  { top: "8%",  left: "6%",   size: 80,  duration: 18, delay: -2,  drift: "hero-drift-b", opacity: 0.35,
    path: "M10,40 L40,20 L70,40 M40,20 L40,5 M40,20 L25,8 M40,20 L55,8" },
  { top: "22%", left: "75%",  size: 100, duration: 22, delay: -5,  drift: "hero-drift-a", opacity: 0.3,
    path: "M20,50 L50,30 L80,50 M50,30 L50,10 M20,50 L20,70 M80,50 L80,70 M50,30 L35,15 M50,30 L65,15" },
  { top: "60%", left: "85%",  size: 70,  duration: 16, delay: -1,  drift: "hero-drift-b", opacity: 0.32,
    path: "M15,35 L35,15 L55,35 L35,55 Z M35,15 L35,5 M55,35 L65,35" },
  { top: "70%", left: "12%",  size: 90,  duration: 20, delay: -4,  drift: "hero-drift-a", opacity: 0.3,
    path: "M10,45 L45,25 L80,45 M45,25 L45,5 M10,45 L10,65 M80,45 L80,65" },
  { top: "5%",  left: "42%",  size: 60,  duration: 15, delay: -3,  drift: "hero-drift-c", opacity: 0.28,
    path: "M10,30 L30,10 L50,30 M30,10 L30,0 M10,30 L0,40 M50,30 L60,40" },
  { top: "45%", left: "3%",   size: 75,  duration: 19, delay: -6,  drift: "hero-drift-a", opacity: 0.3,
    path: "M20,40 L40,20 L60,40 M40,20 L40,5 M20,40 L5,50 M60,40 L75,50 M40,5 L30,0 M40,5 L50,0" },
  { top: "78%", left: "52%",  size: 85,  duration: 21, delay: -2,  drift: "hero-drift-b", opacity: 0.28,
    path: "M15,45 L42,20 L70,45 M42,20 L42,5 M15,45 L30,60 M70,45 L55,60" },
  { top: "32%", left: "92%",  size: 65,  duration: 17, delay: -5,  drift: "hero-drift-a", opacity: 0.3,
    path: "M10,35 L32,15 L55,35 M32,15 L32,3 M10,35 L10,50" },
  { top: "15%", left: "28%",  size: 70,  duration: 19, delay: -1,  drift: "hero-drift-c", opacity: 0.3,
    path: "M10,35 L35,10 L60,35 M35,10 L35,0 M10,35 L0,50 M60,35 L70,50" },
  { top: "50%", left: "35%",  size: 65,  duration: 16, delay: -7,  drift: "hero-drift-b", opacity: 0.25,
    path: "M10,30 L30,10 L50,30 L30,50 Z M30,10 L30,0" },
  { top: "40%", left: "60%",  size: 80,  duration: 20, delay: -3,  drift: "hero-drift-a", opacity: 0.28,
    path: "M15,40 L40,15 L65,40 M40,15 L40,3 M15,40 L5,55 M65,40 L75,55 M40,15 L28,5 M40,15 L52,5" },
  { top: "75%", left: "35%",  size: 75,  duration: 18, delay: -4,  drift: "hero-drift-c", opacity: 0.3,
    path: "M10,40 L38,18 L65,40 M38,18 L38,5 M10,40 L10,55 M65,40 L65,55" },
  { top: "85%", left: "78%",  size: 60,  duration: 15, delay: -6,  drift: "hero-drift-b", opacity: 0.28,
    path: "M10,30 L30,10 L50,30 M30,10 L30,0 M10,30 L0,40 M50,30 L60,40" },
  { top: "5%",  left: "60%",  size: 55,  duration: 17, delay: -2,  drift: "hero-drift-a", opacity: 0.25,
    path: "M8,28 L28,8 L48,28 M28,8 L28,0 M8,28 L0,35 M48,28 L55,35" },
  { top: "55%", left: "18%",  size: 70,  duration: 21, delay: -5,  drift: "hero-drift-c", opacity: 0.28,
    path: "M12,35 L35,12 L58,35 M35,12 L35,2 M12,35 L5,48 M58,35 L65,48" },
  { top: "30%", left: "48%",  size: 55,  duration: 14, delay: -8,  drift: "hero-drift-b", opacity: 0.22,
    path: "M10,25 L28,8 L45,25 L28,42 Z" },
];

export function FloatingFormulas(): JSX.Element {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Lightning flashes — grouped to fire 2-4 simultaneously */}
      <div className="hero-lightning hero-lightning--a1" />
      <div className="hero-lightning hero-lightning--a2" />
      <div className="hero-lightning hero-lightning--a3" />
      <div className="hero-lightning hero-lightning--b1" />
      <div className="hero-lightning hero-lightning--b2" />
      <div className="hero-lightning hero-lightning--c1" />
      <div className="hero-lightning hero-lightning--c2" />
      <div className="hero-lightning hero-lightning--c3" />
      <div className="hero-lightning hero-lightning--c4" />
      {/* NUKE: rare full-screen explosion */}
      <div className="hero-lightning hero-lightning--nuke" />
      {/* Ambient glow */}
      <div className="hero-orb hero-orb--1" />
      <div className="hero-orb hero-orb--2" />
      {/* Dot grid */}
      <div className="hero-grid" />
      {/* Molecular bonds */}
      {BONDS.map((b, i) => (
        <svg
          key={`bond-${i}`}
          className={`hero-bond ${b.drift}`}
          width={b.size} height={b.size}
          viewBox={`0 0 ${b.size} ${b.size}`}
          style={{
            top: b.top, left: b.left,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
          }}
        >
          <path d={b.path} fill="none" className="hero-bond-line" strokeWidth="1.5" strokeLinecap="round" />
          {b.path.match(/[ML]\s*(\d+),(\d+)/g)?.map((m, j) => {
            const coords = m.match(/(\d+),(\d+)/);
            if (!coords) return null;
            return <circle key={j} cx={coords[1]} cy={coords[2]} r="3" className="hero-bond-node" />;
          })}
        </svg>
      ))}
      {/* Formulas */}
      {FORMULA_ITEMS.map((item, i) => (
        <span
          key={`f-${i}`}
          className={`hero-formula ${item.drift}`}
          style={{
            top: item.top, left: item.left,
            fontSize: `${item.size}rem`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
