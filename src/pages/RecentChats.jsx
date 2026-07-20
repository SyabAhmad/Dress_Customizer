import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { conversationsAPI } from "../utils/api.js";
import toast from "react-hot-toast";

function timeGroup(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now - d;
  const day = 86400000;
  if (diff < day) return "Today";
  if (diff < 2 * day) return "Yesterday";
  if (diff < 7 * day) return "This Week";
  if (diff < 30 * day) return "This Month";
  return "Older";
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now - d;
  const day = 86400000;
  if (diff < day) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diff < 7 * day) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function RecentChats() {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await conversationsAPI.list();
      setChats(response.conversations || []);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const openConversation = (convId) => {
    navigate(`/studio/${convId}`);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await conversationsAPI.delete(deleteId);
      setChats((prev) => prev.filter((c) => c.id !== deleteId));
      toast.success("Chat deleted");
    } catch {
      toast.error("Failed to delete");
    }
    setDeleteId(null);
  };

  const filtered = chats.filter(
    (c) => c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {};
  filtered.forEach((c) => {
    const g = timeGroup(c.created_at);
    if (!grouped[g]) grouped[g] = [];
    grouped[g].push(c);
  });
  const groupOrder = ["Today", "Yesterday", "This Week", "This Month", "Older"];

  return (
    <div className="h-full overflow-y-auto" style={{ background: "#f0f4f8" }}>
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-bold" style={{ color: "#001a33" }}>Recent Chats</h1>
            <p className="text-[11px] mt-0.5" style={{ color: "#94a3b8" }}>
              {chats.length} {chats.length === 1 ? "conversation" : "conversations"}
            </p>
          </div>
          <button
            onClick={() => navigate("/studio")}
            className="text-[11px] px-3 py-1.5 rounded-full font-medium transition-all hover:shadow-sm"
            style={{
              background: "#0066cc",
              color: "#fff",
            }}
          >
            + New Chat
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: "#94a3b8" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-full border pl-9 pr-4 py-2 text-xs focus:outline-none transition-all"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#ffffff",
              color: "#001a33",
            }}
          />
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(0,102,204,0.08)" }}>
              <svg className="w-5 h-5" style={{ color: "#0066cc" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: "#001a33" }}>
              {search ? "No matching conversations" : "No conversations yet"}
            </p>
            <p className="text-[11px] mt-1 mb-4" style={{ color: "#94a3b8" }}>
              {search ? "Try a different search term" : "Start designing to create your first chat"}
            </p>
            {!search && (
              <button
                onClick={() => navigate("/studio")}
                className="text-[11px] px-4 py-1.5 rounded-full font-medium transition-all hover:shadow-sm"
                style={{ background: "#0066cc", color: "#fff" }}
              >
                Start Designing
              </button>
            )}
          </div>
        ) : (
          groupOrder.map((group) => {
            const items = grouped[group];
            if (!items?.length) return null;
            return (
              <div key={group} className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                    {group}
                  </h2>
                  <div className="flex-1 h-px" style={{ background: "rgba(0,0,0,0.06)" }} />
                  <span className="text-[10px]" style={{ color: "#cbd5e1" }}>{items.length}</span>
                </div>
                <div className="space-y-1">
                  {items.map((c) => (
                    <div
                      key={c.id}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all hover:bg-white"
                      style={{ border: "1px solid transparent" }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                      onClick={() => openConversation(c.id)}
                    >
                      <div
                        className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-medium"
                        style={{ background: "rgba(0,102,204,0.08)", color: "#0066cc" }}
                      >
                        {(c.title || "D")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-semibold truncate" style={{ color: "#001a33" }}>
                            {c.title || "Design Session"}
                          </h3>
                          <span className="text-[10px] shrink-0" style={{ color: "#94a3b8" }}>
                            {formatTime(c.created_at)}
                          </span>
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: "#94a3b8" }}>
                          {c.message_count || 0} {(c.message_count || 0) === 1 ? "message" : "messages"}
                        </p>
                      </div>
                      <button
                        className="w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-[#94a3b8] hover:text-red-500 hover:bg-red-50 shrink-0"
                        onClick={(e) => { e.stopPropagation(); setDeleteId(c.id); }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="rounded-2xl shadow-2xl p-5 w-full max-w-xs mx-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold mb-1" style={{ color: "#001a33" }}>Delete conversation?</h3>
            <p className="text-[11px] mb-4" style={{ color: "#94a3b8" }}>This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-[11px] px-3 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors" style={{ color: "#0066cc", border: "1px solid rgba(0,0,0,0.08)" }}>Cancel</button>
              <button onClick={confirmDelete} className="flex-1 text-[11px] px-3 py-2 rounded-lg font-medium text-white transition-all hover:shadow-sm" style={{ background: "#E11D48" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
