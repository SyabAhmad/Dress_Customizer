import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { DressSVG } from "../utils/dressGenerator.jsx";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image5 from "../assets/5.jpg";

function AiIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export default function Landing() {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #87CEEB 0%, #87CEEB 30%, #ADD8E6 70%, #E0F6FF 100%)",
        color: "#001a33",
      }}
    >
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero */}
        <section className="pt-14 pb-16 lg:pt-20 lg:pb-24 relative">
          <BackgroundSparkle />
          <div className="grid lg:grid-cols-10 gap-10 items-center">
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "#0066cc",
                }}
              >
                <AiIcon className="w-4 h-4" /> New • AI Dress Customizer
              </div>
              <h1
                className="mt-3 text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight font-['Playfair_Display']"
                style={{ color: "#0066cc" }}
              >
                Turn ideas into elegant fashion mock‑ups in seconds
              </h1>
              <p className="mt-4 text-lg" style={{ color: "#001a33" }}>
                Describe the color, pattern, sleeves, neckline and fabric. Get a
                refined, editable vector preview you can tweak and export.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/studio"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium shadow"
                  style={{
                    background:
                      "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                    color: "#ffffff",
                  }}
                >
                  Launch Studio <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 border"
                  style={{
                    color: "#001a33",
                    borderColor: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Explore features
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted">
                <span className="inline-flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent-2 animate-float" /> Loved
                  by designers
                </span>
                <span>Private • 100% browser • Export SVG/PNG</span>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div
                className="rounded-2xl p-px shadow-lg"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(0,153,255,0.5),rgba(135,206,235,0.5))",
                }}
              >
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    borderColor: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="aspect-5/7 w-full rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image5}
                      alt="Elegant dress inspiration"
                      className=" w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 lg:py-16">
          <h2
            className="text-2xl font-semibold font-['Playfair_Display']"
            style={{ color: "#0066cc" }}
          >
            Crafted for fashion creatives
          </h2>
          <p className="mt-2" style={{ color: "#001a33" }}>
            Everything you need to ideate, iterate and share.
          </p>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              title="Prompt to design"
              desc="Describe a dress in plain English and get a clean, editable mock‑up."
            >
              <Wand className="w-5 h-5" style={{ color: "#3be8d0" }} />
            </FeatureCard>
            <FeatureCard
              title="Rich customization"
              desc="Adjust color, pattern, sleeves, neckline, train, texture, and volume."
            >
              <Sliders className="w-5 h-5 text-accent" />
            </FeatureCard>
            <FeatureCard
              title="Save & compare"
              desc="Capture variants with thumbnails; switch styles in one click."
            >
              <Layers className="w-5 h-5 text-accent" />
            </FeatureCard>
            <FeatureCard
              title="Vector export"
              desc="Export crisp SVG or ready‑to‑share PNG with one tap."
            >
              <Export className="w-5 h-5 text-accent" />
            </FeatureCard>
            <FeatureCard
              title="Fast & private"
              desc="Everything runs locally in your browser—no uploads required."
            >
              <Bolt className="w-5 h-5 text-accent" />
            </FeatureCard>
            <FeatureCard
              title="Polished visuals"
              desc="Tasteful palettes and gentle shading for high‑end presentation."
            >
              <Moon className="w-5 h-5 text-accent" />
            </FeatureCard>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 lg:py-16">
          <h2
            className="text-2xl font-semibold font-['Playfair_Display']"
            style={{ color: "#0066cc" }}
          >
            How it works
          </h2>
          <ol className="mt-6 grid md:grid-cols-3 gap-5">
            <Step n={1} title="Describe">
              Type your idea: “Emerald velvet ballgown with off‑shoulder
              neckline and long train.”
            </Step>
            <Step n={2} title="Refine">
              Tweak color, sleeves, pattern, and fabric. Save variants to
              compare.
            </Step>
            <Step n={3} title="Export">
              Download as SVG or PNG for presentations or hand‑offs.
            </Step>
          </ol>
        </section>

        {/* Gallery */}
        <section className="py-12 lg:py-16">
          <h2
            className="text-2xl font-semibold font-['Playfair_Display']"
            style={{ color: "#0066cc" }}
          >
            Inspiration gallery
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Image 1 */}
            <div
              className="group rounded-2xl p-px shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              style={{
                background:
                  "linear-gradient(135deg,rgba(0,153,255,0.5),rgba(135,206,235,0.5))",
              }}
            >
              <div
                className="rounded-2xl border p-2"
                style={{
                  borderColor: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.7)",
                }}
              >
                <div className="aspect-5/7 w-full rounded-lg overflow-hidden">
                  <img
                    src={image1}
                    alt="Elegant blue gown"
                    className=" object-fit hover:scale-105 transition-transform"
                  />
                </div>
                <div
                  className="mt-2 text-sm font-medium"
                  style={{ color: "#0066cc" }}
                >
                  Elegant Evening Gown
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div
              className="group rounded-2xl p-px shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              style={{
                background:
                  "linear-gradient(135deg,rgba(0,153,255,0.4),rgba(173,216,230,0.4))",
              }}
            >
              <div
                className="rounded-2xl border p-2"
                style={{
                  borderColor: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.7)",
                }}
              >
                <div className="aspect-5/7 w-full rounded-lg overflow-hidden">
                  <img
                    src={image2}
                    alt="Modern dress design"
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div
                  className="mt-2 text-sm font-medium"
                  style={{ color: "#0066cc" }}
                >
                  Modern Silhouette
                </div>
              </div>
            </div>

            {/* Image 3 */}
            <div
              className="group rounded-2xl p-px shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              style={{
                background:
                  "linear-gradient(135deg,rgba(0,153,255,0.3),rgba(224,246,255,0.3))",
              }}
            >
              <div
                className="rounded-2xl border p-2"
                style={{
                  borderColor: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.7)",
                }}
              >
                <div className="aspect-5/7 w-full rounded-lg overflow-hidden">
                  <img
                    src={image3}
                    alt="Trendy fashion look"
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div
                  className="mt-2 text-sm font-medium"
                  style={{ color: "#0066cc" }}
                >
                  Trendy Fashion
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-medium shadow"
              style={{
                background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                color: "#ffffff",
              }}
            >
              Start designing now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ title, desc, children }) {
  return (
    <div
      className="rounded-xl p-4 hover:shadow-lg transition-all"
      style={{
        background: "rgba(255,255,255,0.8)",
        color: "#001a33",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 15px rgba(0,102,204,0.1)",
      }}
    >
      <div className="flex items-center gap-2" style={{ color: "#0066cc" }}>
        {children}
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-2 text-sm" style={{ color: "#001a33" }}>
        {desc}
      </p>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <li
      className="rounded-xl p-4 hover:shadow-lg transition-all"
      style={{
        background: "rgba(255,255,255,0.8)",
        color: "#001a33",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 15px rgba(0,102,204,0.1)",
      }}
    >
      <div
        className="text-xs flex items-center gap-2"
        style={{ color: "#0066cc" }}
      >
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full font-medium text-white"
          style={{ backgroundColor: "#0099ff" }}
        >
          {n}
        </span>
        <span style={{ color: "#0066cc" }}>Step {n}</span>
      </div>
      <div className="mt-1 font-medium" style={{ color: "#001a33" }}>
        {title}
      </div>
      <p className="mt-1 text-sm" style={{ color: "#001a33" }}>
        {children}
      </p>
    </li>
  );
}

function ArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
function Wand(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M6 19 19 6l-1-1L5 18l1 1Z" />
      <path d="M15 6l3 3" />
    </svg>
  );
}
function Sliders(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 4H14" />
      <path d="M10 4H3" />
      <circle cx="12" cy="4" r="2" />
      <path d="M21 12h-7" />
      <path d="M7 12H3" />
      <circle cx="9" cy="12" r="2" />
      <path d="M21 20h-3" />
      <path d="M9 20H3" />
      <circle cx="15" cy="20" r="2" />
    </svg>
  );
}
function Layers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}
function Export(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
function Bolt(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="m13 2-8 14h7l-1 6 8-14h-7l1-6Z" />
    </svg>
  );
}
function Moon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function BackgroundSparkle() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl animate-pulse-neon"
        style={{
          background: `radial-gradient(circle at 30% 30%, var(--color-neon-blue)33, transparent 40%), linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.12))`,
        }}
      />
      <div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl animate-float"
        style={{
          background: `radial-gradient(circle at 70% 70%, var(--color-neon-pink)20, transparent 40%), linear-gradient(135deg, rgba(255,0,255,0.12), rgba(0,255,255,0.2))`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full blur-2xl animate-pulse-neon"
        style={{
          background: `radial-gradient(circle, var(--color-neon-purple)50, transparent)`,
        }}
      />
    </div>
  );
}

function Star(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" />
    </svg>
  );
}
