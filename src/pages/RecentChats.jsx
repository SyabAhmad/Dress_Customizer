import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { gownDesignsAPI } from "../utils/api.js";

const fallbackChats = [
  {
    id: "1",
    name: "Emerald velvet with off-shoulder",
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    name: "Blush lace A-line with train",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "3",
    name: "Minimal silk slip dress",
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

export default function RecentChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await gownDesignsAPI.getAll();
      const designs = response.designs || [];
      
      if (designs.length > 0) {
        setChats(designs);
      } else {
        setChats(fallbackChats);
      }
    } catch (error) {
      console.error("Failed to fetch designs:", error);
      // Fallback to demo data if not authenticated or API fails
      setChats(fallbackChats);
    }
  };

  return (
    <div
      className="min-h-screen text-[#001a33]"
      style={{
        background:
          "linear-gradient(180deg, rgba(135,206,235,0.95), rgba(173,216,230,0.9))",
      }}
    >
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1
          className="text-3xl font-semibold font-['Playfair_Display']"
          style={{ color: "#001a33" }}
        >
          Recent Chats
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#0066cc" }}>
          Your design history and saved generations
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chats.length === 0 ? (
            <div
              className="col-span-full py-12 text-center rounded-lg"
              style={{
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <p style={{ color: "#0066cc" }} className="font-medium">
                No recent chats yet
              </p>
              <p className="text-sm mt-1" style={{ color: "#004999" }}>
                Start creating designs in the Studio to see them here
              </p>
            </div>
          ) : (
            chats.map((c) => (
              <article
                key={c.id}
                className="rounded-xl border p-4 shadow-md hover:shadow-lg transition-shadow"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="text-xs font-medium"
                  style={{ color: "#0066cc" }}
                >
                  {new Date(c.created_at).toLocaleDateString()} ·{" "}
                  {new Date(c.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div
                  className="mt-2 font-semibold line-clamp-2"
                  style={{ color: "#001a33" }}
                >
                  {c.name}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    className="text-xs px-3 py-1.5 rounded-md font-medium transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                      color: "#ffffff",
                      boxShadow: "0 4px 12px rgba(0,102,204,0.2)",
                    }}
                  >
                    Open
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-md font-medium transition-all hover:opacity-90"
                    style={{
                      background: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.6)",
                      color: "#001a33",
                    }}
                  >
                    Duplicate
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
