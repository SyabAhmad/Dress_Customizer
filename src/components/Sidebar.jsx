import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function SidebarItem({ icon, label, to, active = false }) {
  return (
    <Link
      to={to}
      className={
        "flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors " +
        (active
          ? "bg-linear-to-r from-[#87ceeb] to-[#0099ff] text-[#001a33]"
          : "text-[#0066cc] hover:bg-white/40 hover:text-[#001a33]")
      }
      style={{
        border: active ? "1px solid #0099ff" : "1px solid transparent",
      }}
    >
      <span className="shrink-0" style={{ color: active ? "#0099ff" : "#0066cc" }}>
        {icon}
      </span>
      <span className="truncate" style={{ color: active ? "#0099ff" : "#0066cc" }}>
        {label}
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const base = "/" + (location.pathname.split("/")[1] || "");

  const initials = user
    ? `${(user.first_name?.[0] || "").toUpperCase()}${(user.last_name?.[0] || "").toUpperCase()}`
    : user?.email?.[0]?.toUpperCase() || "?";

  const displayName = user?.first_name || user?.email?.split("@")[0] || "User";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user-name");
    navigate("/");
  };

  const items = [
    { to: "/", icon: <HomeIcon className="w-3.5 h-3.5" />, label: "Home" },
    { to: "/studio", icon: "🎫", label: "Studio" },
    { to: "/recent-chats", icon: <ChatIcon className="w-3.5 h-3.5" />, label: "Chats" },
    { to: "/styles", icon: <DesignIcon className="w-3.5 h-3.5" />, label: "Styles" },
    { to: "/profile", icon: <UserIcon className="w-3.5 h-3.5" />, label: "Profile" },
    { to: "/settings", icon: <SettingsIcon className="w-3.5 h-3.5" />, label: "Settings" },
  ];

  return (
    <aside className="hidden lg:block">
      <nav
        className="sticky top-0 h-full overflow-auto px-2.5 py-3 flex flex-col gap-0.5 shadow-sm"
        style={{
          border: "1px solid rgba(255,255,255,0.3)",
          background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))",
          backdropFilter: "blur(10px)",
          color: "#001a33",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: "0.75rem",
          borderBottomRightRadius: "0.75rem",
        }}
      >
        {/* Profile */}
        <Link to="/profile" className="flex items-center gap-2 px-2 py-2 rounded-lg mb-1.5 transition-colors hover:bg-white/40">
          <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #0066cc, #0099ff)", color: "#fff" }}>
            <UserIcon className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold truncate" style={{ color: "#001a33" }}>{displayName}</span>
        </Link>

        <div style={{ borderTop: "1px solid rgba(0,102,204,0.08)" }} className="mb-1" />

        {/* Navigation */}
        {items.map((item) => (
          <SidebarItem key={item.to} {...item} active={base === item.to} />
        ))}

        {/* Logout */}
        <div className="mt-auto pt-2" style={{ borderTop: "1px solid rgba(0,102,204,0.08)" }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors text-red-500 hover:bg-red-50"
          >
            <LogoutIcon className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
      <path d="M3 12h2" /><path d="M19 12h2" />
      <path d="M12 3v2" /><path d="M12 19v2" />
      <path d="m5.6 5.6 1.4 1.4" /><path d="m17 17 1.4 1.4" />
      <path d="m5.6 18.4 1.4-1.4" /><path d="m17 7 1.4-1.4" />
    </svg>
  );
}

function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    </svg>
  );
}

function DesignIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 7h18v11H3z" /><path d="M7 3v4" /><path d="M17 3v4" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
