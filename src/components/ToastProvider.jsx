import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#FFFFFF",
          color: "#003366",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          duration: 4000,
          style: {
            background: "#E8F5E9",
            borderLeft: "4px solid #4CAF50",
          },
          icon: "✓",
        },
        error: {
          duration: 5000,
          style: {
            background: "#FFEBEE",
            borderLeft: "4px solid #FF6B6B",
          },
          icon: "✕",
        },
        loading: {
          style: {
            background: "#E3F2FD",
            borderLeft: "4px solid #0066CC",
          },
        },
      }}
    />
  );
}
