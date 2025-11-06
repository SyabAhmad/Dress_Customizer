import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gownDesignsAPI } from "../utils/api.js";
import toast from "react-hot-toast";

export default function DesignDetail() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading)
    return (
      <div className="min-h-screen">
        <main className="mx-auto max-w-7xl px-4 py-10">Loading…</main>
      </div>
    );
  if (!design)
    return (
      <div className="min-h-screen">
        <main className="mx-auto max-w-7xl px-4 py-10">Design not found</main>
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{design.name}</h1>
            <div className="text-sm text-[#0066cc]">
              {new Date(design.created_at).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="px-3 py-1.5 rounded-md"
                style={{ border: "1px solid rgba(0,102,204,0.15)" }}
              >
                Back
              </button>
              <button
                onClick={() => navigate("/studio", { state: { design } })}
                className="px-3 py-1.5 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(0,102,204,0.08)",
                }}
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  const ok = window.confirm(
                    "Delete this design? This cannot be undone."
                  );
                  if (!ok) return;
                  try {
                    await gownDesignsAPI.delete(id);
                    toast.success("Design deleted");
                    navigate("/designs");
                  } catch (err) {
                    console.error("Delete failed", err);
                    toast.error("Delete failed");
                  }
                }}
                className="px-3 py-1.5 rounded-md"
                style={{
                  background: "transparent",
                  color: "#b91c1c",
                  border: "1px solid rgba(185,28,28,0.12)",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div
              className="rounded-lg border p-4"
              style={{ background: "#fff", minHeight: 480 }}
            >
              {/* If SVG exists, render it; else show thumbnail */}
              {design.svg ? (
                <div dangerouslySetInnerHTML={{ __html: design.svg }} />
              ) : design.thumbnail ? (
                <img src={design.thumbnail} alt={design.name} />
              ) : (
                <div className="text-center py-12">No preview available</div>
              )}
            </div>
          </section>

          <aside
            className="lg:col-span-1 rounded-lg border p-4"
            style={{ background: "rgba(255,255,255,0.9)" }}
          >
            <h3 className="text-sm font-medium text-[#0066cc]">Parameters</h3>
            <dl className="mt-3 text-sm">
              <dt>Color</dt>
              <dd className="mb-2">{design.color}</dd>
              <dt>Pattern</dt>
              <dd className="mb-2">{design.pattern}</dd>
              <dt>Neckline</dt>
              <dd className="mb-2">{design.neckline}</dd>
              <dt>Sleeve length</dt>
              <dd className="mb-2">{design.sleeve_length}</dd>
              <dt>Train length</dt>
              <dd className="mb-2">{design.train_length}</dd>
              <dt>Texture</dt>
              <dd className="mb-2">{design.texture}</dd>
            </dl>
          </aside>
        </div>
      </main>
    </div>
  );
}
