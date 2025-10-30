import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { DressSVG } from "../utils/dressGenerator.jsx";
import girlPicture from "../assets/girlpicture.png";

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
  const samples = [
    {
      name: "Blush Lace Gown",
      params: {
        color: "currentColor",
        pattern: "lace",
        sleeveLength: 80,
        neckline: "v-neck",
        trainLength: 80,
        texture: "satin",
        textureIntensity: 50,
        skirtVolume: 75,
      },
    },
    {
      name: "Emerald Velvet",
      params: {
        color: "currentColor",
        pattern: "solid",
        sleeveLength: 30,
        neckline: "off-shoulder",
        trainLength: 40,
        texture: "velvet",
        textureIntensity: 55,
        skirtVolume: 60,
      },
    },
    {
      name: "Minimal Silk",
      params: {
        color: "currentColor",
        pattern: "solid",
        sleeveLength: 0,
        neckline: "halter",
        trainLength: 10,
        texture: "silk",
        textureIntensity: 30,
        skirtVolume: 35,
      },
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg,#0b0f21 0%,#2b0b4f 45%,#3a0f6a 100%)",
        color: "#e6f7ff",
      }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero */}
        <section className="pt-14 pb-16 lg:pt-20 lg:pb-24 relative">
          <BackgroundSparkle />
          <div className="grid lg:grid-cols-10 gap-10 items-center">
            <div className="lg:col-span-7">
              <div
                className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-3 py-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  color: "#e6f7ff",
                }}
              >
                <AiIcon className="w-4 h-4" /> New • AI Dress Customizer
              </div>
              <h1
                className="mt-3 text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight font-['Playfair_Display']"
                style={{ color: "#37e6ff" }}
              >
                Turn ideas into elegant fashion mock‑ups in seconds
              </h1>
              <p className="mt-4 text-lg" style={{ color: "#b6bfd0" }}>
                Describe the color, pattern, sleeves, neckline and fabric. Get a
                refined, editable vector preview you can tweak and export.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/studio"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium shadow"
                  style={{
                    background:
                      "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
                    color: "#021018",
                  }}
                >
                  Launch Studio <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 border"
                  style={{
                    color: "black",
                    borderColor: "rgba(15,23,42,0.04)",
                    background: "#ffffff",
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
                className="rounded-2xl p-px shadow-sm"
                style={{
                  background: "linear-gradient(135deg,#7c5cff,#ffd1e6)",
                }}
              >
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    borderColor: "rgba(15,23,42,0.04)",
                    background:
                      "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div className="aspect-5/7 w-full rounded-lg overflow-hidden">
                    <img
                      src={girlPicture}
                      alt="Elegant dress inspiration"
                      className="w-full object-cover"
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
            style={{ color: "#cbb7ff" }}
          >
            Crafted for fashion creatives
          </h2>
          <p className="mt-2" style={{ color: "#b9ffca" }}>
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
          <h2 className="text-2xl font-semibold font-['Playfair_Display']">
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
          <h2 className="text-2xl font-semibold font-['Playfair_Display']">
            Inspiration gallery
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {samples.map((s) => (
              <div
                key={s.name}
                className="group rounded-2xl p-px shadow-sm transition-shadow"
                style={{
                  background: "linear-gradient(135deg,#ffd6a6,#7c5cff)",
                }}
              >
                <div
                  className="rounded-2xl border p-3"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="aspect-5/7 grid place-items-center rounded-lg overflow-hidden"
                    style={{ color: "#3be8d0" }}
                  >
                    <DressSVG params={s.params} />
                  </div>
                  <div className="mt-2 text-sm" style={{ color: "#b6bfd0" }}>
                    {s.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-medium shadow"
              style={{
                background: "linear-gradient(90deg,#7c5cff 0%,#3be8d0 100%)",
                color: "#021018",
              }}
            >
              Start designing now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-sm text-[#BDBDBD] border-t border-[#31363F]">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#76ABAE] to-[#31363F]" />
                <span className="font-semibold text-[#EEEEEE]">
                  Dress Customizer
                </span>
              </div>
              <p className="mt-3 text-[#BDBDBD]">
                Fast, private, and elegant mock‑ups for fashion ideas—right in
                your browser.
              </p>
            </div>
            <div>
              <div className="text-[#EEEEEE] font-medium">Product</div>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/studio" className="hover:text-[#EEEEEE]">
                    Studio
                  </Link>
                </li>
                <li>
                  <Link to="/recent-chats" className="hover:text-[#EEEEEE]">
                    Recent chats
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:text-[#EEEEEE]">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[#EEEEEE] font-medium">Account</div>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/signin" className="hover:text-[#EEEEEE]">
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="hover:text-[#EEEEEE]">
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="hover:text-[#EEEEEE]">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[#EEEEEE] font-medium">Connect</div>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href="https://github.com/Mahboobiqbal/Dress_Customizer"
                    target="_blank"
                    className="inline-flex items-center gap-2 hover:text-[#EEEEEE]"
                  >
                    <GitHubIcon className="w-4 h-4" /> GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-[#31363F] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} Dress Customizer</div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#EEEEEE]">
                Privacy
              </a>
              <a href="#" className="hover:text-[#EEEEEE]">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc, children }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        background: "#ffffff",
        color: "#0b1220",
        border: "1px solid rgba(15,23,42,0.04)",
        boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
      }}
    >
      <div className="flex items-center gap-2" style={{ color: "#0b1220" }}>
        {children}
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-2 text-sm" style={{ color: "#6b7280" }}>
        {desc}
      </p>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <li
      className="rounded-xl p-4"
      style={{
        background: "#ffffff",
        color: "#0b1220",
        border: "1px solid rgba(15,23,42,0.04)",
        boxShadow: "0 8px 20px rgba(2,6,23,0.06)",
      }}
    >
      <div
        className="text-xs flex items-center gap-2"
        style={{ color: "#6b7280" }}
      >
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full font-medium"
          style={{ backgroundColor: "#ffd6a6", opacity: 0.9, color: "#0b1220" }}
        >
          {n}
        </span>
        <span style={{ color: "#6b7280" }}>Step {n}</span>
      </div>
      <div className="mt-1 font-medium" style={{ color: "#0b1220" }}>
        {title}
      </div>
      <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
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

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.19-3.37-1.19-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
