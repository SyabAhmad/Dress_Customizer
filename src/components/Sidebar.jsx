import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function SidebarItem({ icon, label, to, active = false, collapsed }) {
  return (
    <Link
      to={to}
      title={label}
      className={
        "flex items-center gap-2.5 rounded-lg transition-all " +
        (collapsed ? "w-8 h-8 justify-center" : "w-full px-2.5 py-1.5") +
        (active
          ? " bg-[#0066cc] text-white shadow-sm"
          : " text-[#94a3b8] hover:bg-gray-100 hover:text-[#0066cc]")
      }
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && <span className="text-[11px] font-medium truncate">{label}</span>}
    </Link>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
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
    { to: "/studio", icon: <SparkIcon className="w-4 h-4" />, label: "Studio" },
    { to: "/recent-chats", icon: <ChatIcon className="w-4 h-4" />, label: "Chats" },
    { to: "/styles", icon: <DesignIcon className="w-4 h-4" />, label: "Styles" },
    { to: "/settings", icon: <SettingsIcon className="w-4 h-4" />, label: "Settings" },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col shrink-0 transition-all duration-200"
      style={{
        width: collapsed ? "52px" : "160px",
        background: "#ffffff",
        borderRight: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className={`flex items-center shrink-0 ${collapsed ? "flex-col gap-2 py-3" : "justify-between px-3 py-3"}`}>
        {!collapsed && (
          <span className="text-xs font-bold tracking-wide" style={{ color: "#001a33" }}>Dress</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 hover:bg-gray-100"
          style={{ color: "#94a3b8" }}
        >
          {collapsed ? <ChevronRightIcon className="w-4 h-4" /> : <ChevronLeftIcon className="w-4 h-4" />}
        </button>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} />

      {/* Profile */}
      <div className={`shrink-0 py-3 ${collapsed ? "flex justify-center" : "px-3"}`}>
        <Link
          to="/profile"
          title="Profile"
          className={
            "flex items-center rounded-xl transition-all hover:bg-gray-50 " +
            (collapsed ? "w-8 h-8 justify-center" : "gap-2.5 px-2 py-1.5")
          }
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
            style={{ background: "linear-gradient(135deg, #0066cc, #0099ff)", color: "#fff" }}
          >
            {initials}
          </div>
          {!collapsed && (
            <span className="text-[11px] font-semibold truncate" style={{ color: "#001a33" }}>
              {user?.first_name || user?.email?.split("@")[0] || "User"}
            </span>
          )}
        </Link>
      </div>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} />

      {/* Nav */}
      <div className={`flex flex-col gap-0.5 flex-1 py-2 ${collapsed ? "items-center px-0" : "px-2"}`}>
        {items.map((item) => (
          <SidebarItem key={item.to} {...item} active={base === item.to} collapsed={collapsed} />
        ))}
      </div>

      {/* Bottom: Home + Logout */}
      <div className={`flex flex-col gap-0.5 py-2 ${collapsed ? "items-center px-0" : "px-2"}`}>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }} className={`mb-1 ${collapsed ? "w-5" : "w-full"}`} />
        <Link
          to="/"
          title="Home"
          className={
            "flex items-center gap-2.5 rounded-lg transition-all " +
            (collapsed ? "w-8 h-8 justify-center" : "w-full px-2.5 py-1.5") +
            " text-[#94a3b8] hover:bg-gray-100 hover:text-[#0066cc]"
          }
        >
          <HomeIcon className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-[11px] font-medium">Home</span>}
        </Link>
        <button
          onClick={handleLogout}
          title="Logout"
          className={
            "flex items-center gap-2.5 rounded-lg transition-all " +
            (collapsed ? "w-8 h-8 justify-center" : "w-full px-2.5 py-1.5") +
            " text-[#94a3b8] hover:bg-red-50 hover:text-red-500"
          }
        >
          <LogoutIcon className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="text-[11px] font-medium">Logout</span>}
        </button>
      </div>
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

function ChevronLeftIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
