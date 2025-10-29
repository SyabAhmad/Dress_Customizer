import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { DressSVG } from "../utils/dressGenerator.jsx";

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
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-14 pb-16 lg:pt-20 lg:pb-24 relative">
          <BackgroundSparkle />
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl/tight sm:text-5xl/tight font-semibold tracking-tight font-['Playfair_Display']">
                Design couture dresses with natural language
              </h1>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">
                Describe your vision—color, pattern, sleeves, neckline,
                fabric—and see it instantly as a refined vector mock‑up. Tweak
                parameters, save variants, and export in seconds.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/studio"
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-600 text-white px-5 py-3 font-medium shadow hover:bg-rose-700"
                >
                  Launch Studio <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 px-5 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  Explore features
                </a>
              </div>
              <div className="mt-6 text-sm text-zinc-500">
                No signup • 100% client‑side • Export SVG/PNG
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 shadow-sm">
                <div className="aspect-5/7 w-full grid place-items-center bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-hidden text-rose-600 dark:text-rose-400">
                  <DressSVG params={samples[0].params} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 lg:py-16">
          <h2 className="text-2xl font-semibold font-['Playfair_Display']">
            Crafted for fashion creatives
          </h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              title="Prompt to design"
              desc="Describe a dress in plain English and get a clean, editable mock‑up."
            >
              <Wand className="w-5 h-5" />
            </FeatureCard>
            <FeatureCard
              title="Rich customization"
              desc="Adjust color, pattern, sleeves, neckline, train, texture, and volume."
            >
              <Sliders className="w-5 h-5" />
            </FeatureCard>
            <FeatureCard
              title="Save & compare"
              desc="Capture variants with thumbnails; switch styles in one click."
            >
              <Layers className="w-5 h-5" />
            </FeatureCard>
            <FeatureCard
              title="Vector export"
              desc="Export crisp SVG or ready‑to‑share PNG with one tap."
            >
              <Export className="w-5 h-5" />
            </FeatureCard>
            <FeatureCard
              title="Fast & private"
              desc="Everything runs locally in your browser—no uploads required."
            >
              <Bolt className="w-5 h-5" />
            </FeatureCard>
            <FeatureCard
              title="Dark mode"
              desc="Comfortable UI for long sessions, day or night."
            >
              <Moon className="w-5 h-5" />
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
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900 shadow-sm"
              >
                <div className="aspect-5/7 grid place-items-center bg-zinc-50 dark:bg-zinc-950 rounded-lg overflow-hidden text-rose-600 dark:text-rose-400">
                  <DressSVG params={s.params} />
                </div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 rounded-lg bg-rose-600 text-white px-5 py-3 font-medium shadow hover:bg-rose-700"
            >
              Start designing now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-sm text-zinc-500 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} Dress Customizer</div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Mahboobiqbal/Dress_Customizer"
                target="_blank"
                className="hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                GitHub
              </a>
              <Link
                to="/studio"
                className="hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Studio
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ title, desc, children }) {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
        {children}
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm">{desc}</p>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <li className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="text-xs text-zinc-500">Step {n}</div>
      <div className="mt-1 font-medium">{title}</div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
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
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-linear-to-br from-rose-400/25 to-pink-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-linear-to-tr from-rose-300/25 to-fuchsia-400/20 blur-3xl" />
    </div>
  );
}
