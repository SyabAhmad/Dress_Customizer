import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gownDesignsAPI } from "../utils/api.js";
import toast from "react-hot-toast";

export default function DesignDetail() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await gownDesignsAPI.getById(id);
        if (mounted) setDesign(res);
      } catch (err) {
        console.error("Failed to load design", err);
        toast.error("Could not load design");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    const ok = window.confirm("Delete this design? This cannot be undone.");
    if (!ok) return;
    try {
      setDeleting(true);
      await gownDesignsAPI.delete(id);
      toast.success("Design deleted");
      navigate("/designs");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const renderSkeleton = () => (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div
          className="h-10 w-2/3 rounded-md animate-pulse"
          style={{ background: "rgba(255,255,255,0.5)" }}
        />
        <div
          className="h-[480px] rounded-xl border animate-pulse"
          style={{
            background: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.55)",
          }}
        />
      </div>
      <div className="space-y-4">
        <div
          className="h-10 w-1/2 rounded-md animate-pulse"
          style={{ background: "rgba(255,255,255,0.5)" }}
        />
        <div
          className="h-[480px] rounded-xl border animate-pulse"
          style={{
            background: "rgba(255,255,255,0.4)",
            border: "1px solid rgba(255,255,255,0.55)",
          }}
        />
      </div>
    </div>
  );

  const renderNotFound = () => (
    <div className="mt-16 text-center">
      <h2 className="text-xl font-semibold" style={{ color: "#0066cc" }}>
        Design not found
      </h2>
      <p className="mt-2 text-sm" style={{ color: "#004999" }}>
        It may have been removed or the link is invalid.
      </p>
      <button
        onClick={() => navigate("/designs")}
        className="mt-6 px-4 py-2 rounded-md text-sm font-medium shadow"
        style={{
          background: "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
          color: "#fff",
        }}
      >
        Back to Designs
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, rgba(135,206,235,0.95), rgba(173,216,230,0.9))",
        color: "#001a33",
      }}
    >
      <main className="px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col gap-4">
          <nav
            className="text-xs font-medium flex items-center gap-2"
            style={{ color: "#004999" }}
          >
            <button
              onClick={() => navigate("/designs")}
              className="hover:underline"
              style={{ color: "#0066cc" }}
            >
              Designs
            </button>
            <span>/</span>
            <span style={{ color: "#001a33" }}>{design?.name || "..."}</span>
          </nav>
          {loading ? null : design ? (
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold font-['Playfair_Display']">
                  {design.name}
                </h1>
                <div className="text-sm mt-1" style={{ color: "#0066cc" }}>
                  {new Date(design.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(0,102,204,0.15)",
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => navigate("/studio", { state: { design } })}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition"
                  style={{
                    background:
                      "linear-gradient(90deg,#0066cc 0%,#0099ff 100%)",
                    color: "#fff",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-3 py-1.5 rounded-md text-sm font-medium transition"
                  style={{
                    background: "rgba(255,255,255,0.4)",
                    color: "#b91c1c",
                    border: "1px solid rgba(185,28,28,0.25)",
                    opacity: deleting ? 0.7 : 1,
                  }}
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Main content */}
        {loading ? (
          renderSkeleton()
        ) : !design ? (
          renderNotFound()
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preview */}
            <section className="lg:col-span-2 space-y-6">
              <div
                className="rounded-xl border shadow-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(140deg,rgba(255,255,255,0.85),rgba(255,255,255,0.65))",
                  border: "1px solid rgba(255,255,255,0.55)",
                  backdropFilter: "blur(10px)",
                  minHeight: 480,
                }}
              >
                <div className="p-4">
                  {design.svg ? (
                    <div
                      className="max-w-full"
                      dangerouslySetInnerHTML={{ __html: design.svg }}
                    />
                  ) : design.thumbnail ? (
                    <img
                      src={design.thumbnail}
                      alt={design.name}
                      className="rounded-md max-w-full h-auto"
                      style={{ objectFit: "contain" }}
                    />
                  ) : (
                    <div
                      className="text-center py-24 text-sm"
                      style={{ color: "#004999" }}
                    >
                      No preview available
                    </div>
                  )}
                </div>
              </div>

              {design.notes && (
                <div
                  className="rounded-lg border p-4 text-sm"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "#0066cc" }}>
                    Designer Notes
                  </h3>
                  <p style={{ color: "#004999", lineHeight: 1.5 }}>
                    {design.notes}
                  </p>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div
                className="rounded-xl border p-5 shadow-sm"
                style={{
                  background:
                    "linear-gradient(150deg,rgba(255,255,255,0.88),rgba(255,255,255,0.62))",
                  border: "1px solid rgba(255,255,255,0.55)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <h3
                  className="text-sm font-semibold tracking-wide mb-3"
                  style={{ color: "#0066cc" }}
                >
                  Parameters
                </h3>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <dt style={{ color: "#004999" }}>Color</dt>
                  <dd style={{ color: "#001a33" }}>{design.color || "—"}</dd>
                  <dt style={{ color: "#004999" }}>Pattern</dt>
                  <dd style={{ color: "#001a33" }}>{design.pattern || "—"}</dd>
                  <dt style={{ color: "#004999" }}>Neckline</dt>
                  <dd style={{ color: "#001a33" }}>{design.neckline || "—"}</dd>
                  <dt style={{ color: "#004999" }}>Sleeve length</dt>
                  <dd style={{ color: "#001a33" }}>
                    {design.sleeve_length || "—"}
                  </dd>
                  <dt style={{ color: "#004999" }}>Train length</dt>
                  <dd style={{ color: "#001a33" }}>
                    {design.train_length || "—"}
                  </dd>
                  <dt style={{ color: "#004999" }}>Texture</dt>
                  <dd style={{ color: "#001a33" }}>{design.texture || "—"}</dd>
                </dl>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
