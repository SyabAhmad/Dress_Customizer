import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function SidebarItem({ icon, label, to, active = false }) {
  return (
    <Link
      to={to}
      title={label}
      className={
        "flex items-center justify-center w-8 h-8 rounded-lg transition-all " +
        (active
          ? "bg-[#0066cc] text-white shadow-sm"
          : "text-[#94a3b8] hover:bg-gray-100 hover:text-[#0066cc]")
      }
    >
      {icon}
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

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user-name");
    navigate("/");
  };

  const items = [
    { to: "/", icon: <HomeIcon className="w-4 h-4" />, label: "Home" },
    { to: "/studio", icon: <SparkIcon className="w-4 h-4" />, label: "Studio" },
    { to: "/recent-chats", icon: <ChatIcon className="w-4 h-4" />, label: "Chats" },
    { to: "/styles", icon: <DesignIcon className="w-4 h-4" />, label: "Styles" },
    { to: "/settings", icon: <SettingsIcon className="w-4 h-4" />, label: "Settings" },
  ];

  return (
    <aside className="hidden lg:flex flex-col items-center py-3 px-1.5 shrink-0" style={{ background: "#ffffff", borderRight: "1px solid rgba(0,0,0,0.06)" }}>
      {/* Profile */}
      <Link to="/profile" title="Profile" className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold mb-3 transition-all hover:ring-2 hover:ring-[#0066cc]/30" style={{ background: "linear-gradient(135deg, #0066cc, #0099ff)", color: "#fff" }}>
        {initials}
      </Link>

      {/* Nav */}
      <div className="flex flex-col items-center gap-1 flex-1">
        {items.map((item) => (
          <SidebarItem key={item.to} {...item} active={base === item.to} />
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        title="Logout"
        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94a3b8] hover:bg-red-50 hover:text-red-500 transition-all mt-1"
      >
        <LogoutIcon className="w-4 h-4" />
      </button>
    </aside>
  );
}

function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function DesignIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
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
