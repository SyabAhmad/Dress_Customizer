import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";

const fallbackChats = [
  {
    id: "1",
    title: "Emerald velvet with off-shoulder",
    date: Date.now() - 86400000,
  },
  {
    id: "2",
    title: "Blush lace A-line with train",
    date: Date.now() - 2 * 86400000,
  },
  {
    id: "3",
    title: "Minimal silk slip dress",
    date: Date.now() - 3 * 86400000,
  },
];

export default function RecentChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentChats") || "null");
      setChats(Array.isArray(stored) && stored.length ? stored : fallbackChats);
    } catch {
      setChats(fallbackChats);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white text-zinc-900">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold font-['Playfair_Display']">
          Recent chats
        </h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chats.map((c) => (
            <article
              key={c.id}
              className="rounded-xl border border-rose-200 bg-white/70 backdrop-blur p-4 shadow-sm"
            >
              <div className="text-sm text-zinc-500">
                {new Date(c.date).toLocaleString()}
              </div>
              <div className="mt-1 font-medium">{c.title}</div>
              <div className="mt-3 flex gap-2">
                <button className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50">
                  Open
                </button>
                <button className="text-xs px-3 py-1.5 rounded-md border border-zinc-200 hover:bg-zinc-50">
                  Duplicate
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
