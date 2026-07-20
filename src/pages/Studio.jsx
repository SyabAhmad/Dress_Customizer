import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import CustomizerPanel from "../components/CustomizerPanel.jsx";
import { conversationsAPI, aiAPI, stylesAPI, gownDesignsAPI } from "../utils/api.js";
import toast from "react-hot-toast";

export default function Studio() {
  const location = useLocation();
  const { convId } = useParams();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("pollinations");
  const [showCustomize, setShowCustomize] = useState(false);
  const [params, setParams] = useState({
    color: "#EC4899", pattern: "solid", sleeveLength: 70,
    neckline: "v-neck", trainLength: 50, texture: "satin",
    textureIntensity: 40, skirtVolume: 60, prompt: "",
    dressType: "frock", category: "simple-party",
  });
  const [savedStyles, setSavedStyles] = useState([]);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState("");
  const [slashIndex, setSlashIndex] = useState(0);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveNameError, setSaveNameError] = useState("");
  const inputRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [lastImageUrl, setLastImageUrl] = useState("");
  const [inputImage, setInputImage] = useState(null);
  const [inputImagePreview, setInputImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  const saveCurrentStyle = () => {
    setSaveName("");
    setSaveNameError("");
    setShowSaveDialog(true);
  };

  const confirmSaveStyle = async () => {
    const name = saveName.trim();
    if (!name) {
      setSaveNameError("Please enter a name");
      return;
    }
    try {
      const res = await stylesAPI.create({
        name,
        color: params.color, pattern: params.pattern,
        sleeve_length: params.sleeveLength, neckline: params.neckline,
        train_length: params.trainLength, texture: params.texture,
        texture_intensity: params.textureIntensity, skirt_volume: params.skirtVolume,
        category: params.category,
      });
      setSavedStyles((prev) => [res.style, ...prev]);
      if (lastImageUrl) {
        await gownDesignsAPI.create({
          name, prompt: name,
          color: params.color, pattern: params.pattern,
          sleeve_length: params.sleeveLength, neckline: params.neckline,
          train_length: params.trainLength, texture: params.texture,
          texture_intensity: params.textureIntensity, skirt_volume: params.skirtVolume,
          image_url: lastImageUrl,
        });
      }
      setShowSaveDialog(false);
      toast.success(`Style "${name}" saved!`);
    } catch {
      toast.error("Failed to save style");
    }
  };

  const applyStyle = (style) => {
    setParams((p) => ({
      ...p,
      color: style.color || p.color,
      pattern: style.pattern || p.pattern,
      neckline: style.neckline || p.neckline,
      texture: style.texture || p.texture,
      sleeveLength: style.sleeveLength ?? style.sleeve_length ?? p.sleeveLength,
      trainLength: style.trainLength ?? style.train_length ?? p.trainLength,
      textureIntensity: style.textureIntensity ?? style.texture_intensity ?? p.textureIntensity,
      skirtVolume: style.skirtVolume ?? style.skirt_volume ?? p.skirtVolume,
      category: style.category || p.category,
    }));
    setPrompt((prev) => {
      const withoutSlash = prev.replace(/\/\w*$/, "").trim();
      return withoutSlash ? `${withoutSlash} ` : "";
    });
    setShowSlashMenu(false);
    setShowCustomize(true);
    inputRef.current?.focus();
  };

  const deleteStyle = async (styleId) => {
    try {
      await stylesAPI.delete(styleId);
      setSavedStyles((prev) => prev.filter((s) => s.id !== styleId));
      toast.success("Style deleted");
    } catch {
      toast.error("Failed to delete style");
    }
  };

  useEffect(() => {
    stylesAPI.list().then((res) => setSavedStyles(res.styles || [])).catch(() => {});

    aiAPI.listModels().then((res) => {
      if (res.models?.length) {
        setModels(res.models);
        const def = res.models.find((m) => m.id === "pollinations")
          || res.models.find((m) => m.key_configured && !m.requires_key)
          || res.models.find((m) => m.key_configured)
          || res.models[0];
        setSelectedModel(def.id);
      }
    }).catch(() => {
      setModels([
        { id: "pollinations", name: "Pollinations.ai", provider: "Pollinations.ai", requires_key: false, key_configured: true },
        { id: "subnp-turbo", name: "SubNP (turbo)", provider: "SubNP", requires_key: false, key_configured: true },
      ]);
    });
  }, []);

  useEffect(() => {
    const state = location.state;

    if (state?.design) {
      const d = state.design;
      setParams((p) => ({
        ...p, color: d.color || p.color, pattern: d.pattern || p.pattern,
        sleeveLength: d.sleeve_length ?? p.sleeveLength, neckline: d.neckline || p.neckline,
        trainLength: d.train_length ?? p.trainLength, texture: d.texture || p.texture,
        textureIntensity: d.texture_intensity ?? p.textureIntensity, skirtVolume: d.skirt_volume ?? p.skirtVolume,
      }));
      setPrompt(d.name || "");
      try { window.history.replaceState({}, document.title); } catch {}
      return;
    }

    if (state?.style) {
      const s = state.style;
      setParams((p) => ({
        ...p, color: s.color || p.color, pattern: s.pattern || p.pattern,
        sleeveLength: s.sleeve_length ?? p.sleeveLength, neckline: s.neckline || p.neckline,
        trainLength: s.train_length ?? p.trainLength, texture: s.texture || p.texture,
        textureIntensity: s.texture_intensity ?? p.textureIntensity, skirtVolume: s.skirt_volume ?? p.skirtVolume,
        category: s.category || p.category,
      }));
      setPrompt(s.name ? `Style: ${s.name}` : "");
      setShowCustomize(true);
      try { window.history.replaceState({}, document.title); } catch {}
      return;
    }

    if (convId && convId !== conversationId) {
      setConversationId(convId);
      conversationsAPI.get(convId).then((res) => {
        if (res.messages) {
          setMessages(res.messages);
        }
      }).catch(() => toast.error("Failed to load conversation"));
    }
  }, [location, convId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const onGenerate = async () => {
    const text = prompt.trim() || params.prompt?.trim() || "Elegant dress";
    if (!text) return;

    const currentModel = models.find((m) => m.id === selectedModel);
    if (currentModel?.requires_key && !currentModel?.key_configured) {
      toast.error(`"${currentModel.name}" is not available. Please select another model.`);
      return;
    }

    setIsGenerating(true);
    setPrompt("");

    const userMsg = {
      id: "temp-" + Date.now(), sender_role: "user", content: text,
      image_url: inputImagePreview || null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      let inputImageData = null;
      if (inputImage) {
        inputImageData = await toBase64(inputImage);
      }

      const response = await aiAPI.generateImage(text, {
        color: params.color, pattern: params.pattern, neckline: params.neckline,
        sleeve_length: params.sleeveLength, train_length: params.trainLength,
        texture: params.texture, texture_intensity: params.textureIntensity,
        skirt_volume: params.skirtVolume, dress_type: params.dressType,
      }, selectedModel, conversationId, inputImageData);

      if (response.image) {
        if (response.conversation_id && !conversationId) {
          setConversationId(response.conversation_id);
        }
        setLastImageUrl(response.image);
        clearInputImage();
        const aiMsg = {
          id: "msg-" + Date.now(), sender_role: "assistant",
          content: prompt || "Here's your design",
          image_url: response.image,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        toast.success("Design generated!");
      } else {
        toast.error(response.error || "Generation failed");
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      }
    } catch (error) {
      toast.error("Generation failed: " + (error.message || "Unknown error"));
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
    }
    setIsGenerating(false);
  };

  const resetChat = () => {
    setMessages([]);
    setConversationId(null);
    setPrompt("");
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in your browser");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setPrompt(finalTranscript + (interimTranscript ? " " + interimTranscript : ""));
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setPrompt(val);

    const slashMatch = val.match(/\/(\w*)$/);
    if (slashMatch) {
      setSlashFilter(slashMatch[1].toLowerCase());
      setSlashIndex(0);
      setShowSlashMenu(true);
    } else if (showSlashMenu) {
      setShowSlashMenu(false);
    }
  };

  const handleKeyDown = (e) => {
    if (showSlashMenu) {
      const filtered = savedStyles.filter((s) => s.name.toLowerCase().includes(slashFilter));
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSlashIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSlashIndex((prev) => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (filtered.length > 0) {
          applyStyle(filtered[Math.min(slashIndex, filtered.length - 1)]);
          return;
        }
        setShowSlashMenu(false);
      }
      if (e.key === "Escape") {
        setShowSlashMenu(false);
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  const downloadImage = (url) => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `design-${Date.now()}.png`;
    a.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setInputImage(file);
    setInputImagePreview(URL.createObjectURL(file));
  };

  const clearInputImage = () => {
    setInputImage(null);
    if (inputImagePreview) URL.revokeObjectURL(inputImagePreview);
    setInputImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const supportsImageInput = useMemo(() => {
    const m = models.find((m) => m.id === selectedModel);
    return m?.supports_image_input ?? false;
  }, [models, selectedModel]);

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{
        background: "#f0f4f8",
        color: "#001a33",
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b shrink-0" style={{ borderColor: "rgba(0,0,0,0.06)", background: "#ffffff" }}>
        <h1 className="text-sm font-bold tracking-wide" style={{ color: "#001a33" }}>
          {conversationId ? "Chat" : "New Chat"}
        </h1>
        <div className="flex items-center gap-3">
          {conversationId && (
            <button
              onClick={resetChat}
              className="text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 hover:shadow-sm"
              style={{
                background: "#ffffff",
                color: "#0066cc",
                border: "1px solid rgba(0,102,204,0.2)",
              }}
            >
              + New Chat
            </button>
          )}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-[11px] rounded-lg border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#0099ff]/30 cursor-pointer transition-all"
            style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff", color: "#001a33" }}
          >
            {models.map((m) => (
              <option key={m.id} value={m.id} disabled={m.requires_key && !m.key_configured}>
                {m.name}{m.requires_key && !m.key_configured ? " (no key)" : ""}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 hover:shadow-sm"
            style={{
              background: showCustomize ? "linear-gradient(135deg, #0066cc, #0099ff)" : "#ffffff",
              color: showCustomize ? "#fff" : "#0066cc",
              border: showCustomize ? "none" : "1px solid rgba(0,102,204,0.2)",
            }}
          >
            Customize
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
          showCustomize ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b bg-white" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <h2 className="text-sm font-bold tracking-wide" style={{ color: "#001a33" }}>Customize</h2>
          <button
            onClick={() => setShowCustomize(false)}
            className="text-xs px-3 py-1.5 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            style={{ color: "#0066cc", border: "1px solid rgba(0,102,204,0.15)" }}
          >
            Close
          </button>
        </div>
        <div className="p-4">
          <CustomizerPanel
            params={params} setParams={setParams}
            onSaveVariant={saveCurrentStyle}
            isGenerating={isGenerating} onGenerate={onGenerate}
            models={models} selectedModel={selectedModel} onModelChange={setSelectedModel}
          />
        </div>
      </div>
      {showCustomize && <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm" onClick={() => setShowCustomize(false)} />}

      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm" onClick={() => setShowSaveDialog(false)}>
          <div className="rounded-2xl border shadow-2xl p-6 w-full max-w-sm mx-4" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.06)" }} onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold tracking-wide mb-4" style={{ color: "#001a33" }}>Save Design Style</h3>
            <input
              autoFocus
              value={saveName}
              onChange={(e) => { setSaveName(e.target.value); setSaveNameError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") confirmSaveStyle(); if (e.key === "Escape") setShowSaveDialog(false); }}
              placeholder="e.g. My Red Velvet Dress"
              className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0099ff]/30 transition-all"
              style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#f8fafc", color: "#001a33" }}
            />
            {saveNameError && <p className="text-xs mt-1.5" style={{ color: "#E11D48" }}>{saveNameError}</p>}
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowSaveDialog(false)} className="flex-1 text-xs px-3 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors" style={{ background: "#f8fafc", color: "#0066cc", border: "1px solid rgba(0,102,204,0.15)" }}>Cancel</button>
              <button onClick={confirmSaveStyle} className="flex-1 text-xs px-3 py-2.5 rounded-xl font-medium text-white transition-all hover:shadow-md" style={{ background: "linear-gradient(135deg, #0066cc, #0099ff)", border: "none" }}>Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1.5 min-h-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "linear-gradient(135deg, rgba(0,102,204,0.1), rgba(0,153,255,0.05))", border: "1px solid rgba(0,102,204,0.1)" }}>
              <WandIcon className="w-5 h-5" style={{ color: "#0066cc" }} />
            </div>
            <p className="text-base font-bold" style={{ color: "#001a33" }}>Design Your Dream Dress</p>
            <p className="text-xs mt-1.5 max-w-xs" style={{ color: "#004999" }}>
              Describe a dress, upload a photo, or both — and let AI bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
              {["A red velvet evening gown", "Upload my photo & pick a dress", "Elegant outfit for a wedding"].map((s) => (
                <button key={s} onClick={() => setPrompt(s)} className="text-[11px] px-2.5 py-1 rounded-full font-medium transition-all hover:scale-105" style={{ background: "rgba(0,102,204,0.08)", color: "#0066cc", border: "1px solid rgba(0,102,204,0.15)" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender_role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-xl px-3 py-2 ${
                  msg.sender_role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                }`}
                style={{
                  background: msg.sender_role === "user"
                    ? "linear-gradient(135deg, #0066cc, #0099ff)"
                    : "#ffffff",
                  color: msg.sender_role === "user" ? "#fff" : "#001a33",
                  border: msg.sender_role === "user" ? "none" : "1px solid rgba(0,0,0,0.06)",
                  boxShadow: msg.sender_role === "user"
                    ? "0 1px 4px rgba(0,102,204,0.15)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {msg.sender_role === "user" ? (
                  <div>
                    {msg.image_url && (
                      <img src={msg.image_url} alt="Your upload" className="w-14 h-14 rounded-md object-cover mb-1 border border-white/30" />
                    )}
                    <p className="text-xs whitespace-pre-wrap leading-snug">{msg.content}</p>
                  </div>
                ) : (
                  <div>
                    {msg.image_url ? (
                      <div className="relative group cursor-pointer" onClick={() => downloadImage(msg.image_url)}>
                        <img
                          src={msg.image_url}
                          alt="Generated design"
                          className="w-full rounded-lg object-cover"
                          style={{ maxHeight: "220px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button className="text-[10px] px-2 py-1 rounded-md font-medium bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors">
                            Download
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs whitespace-pre-wrap leading-snug">{msg.content}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="px-3 pb-3 pt-1.5 shrink-0">
        <div
          className="flex items-end gap-1.5 rounded-xl border p-2"
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            background: "#ffffff",
            boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex-1 relative">
            {inputImagePreview && (
              <div className="absolute bottom-full left-0 mb-1.5 flex items-center gap-1.5 rounded-lg border bg-white p-1.5 shadow-md" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                <img src={inputImagePreview} alt="Input" className="h-8 w-8 rounded object-cover" />
                <span className="text-[10px] font-medium truncate max-w-[80px]" style={{ color: "#001a33" }}>{inputImage.name}</span>
                <button onClick={clearInputImage} className="text-[10px] p-0.5 rounded hover:bg-gray-100 transition-colors" style={{ color: "#E11D48" }}>&#x2715;</button>
              </div>
            )}
            {showSlashMenu && (
              <div
                className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border shadow-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(0,0,0,0.06)",
                  background: "#ffffff",
                  maxHeight: "280px",
                  overflowY: "auto",
                }}
              >
                <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                  Saved Styles
                </div>
                {savedStyles.length === 0 ? (
                  <p className="px-4 py-3 text-xs text-center" style={{ color: "#94a3b8" }}>No saved styles. Open Customize & click Save.</p>
                ) : (
                  savedStyles.filter((s) => s.name.toLowerCase().includes(slashFilter)).map((style, i) => (
                    <button key={style.id} className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors text-left ${i === slashIndex ? "bg-[#0066cc]/8" : "hover:bg-gray-50"}`} style={{ color: "#001a33" }} onClick={() => { setSlashIndex(-1); applyStyle(style); }} onMouseEnter={() => setSlashIndex(i)}>
                      <span className="flex items-center gap-2.5">
                        <span className="w-3 h-3 rounded-full border border-black/5 inline-block shrink-0" style={{ background: style.color }} />
                        <span className="truncate max-w-[140px]">{style.name}</span>
                        {style.category && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 whitespace-nowrap" style={{ background: "rgba(0,102,204,0.08)", color: "#0066cc" }}>
                            {style.category.replace(/-/g, " ")}
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] opacity-30 hover:opacity-100 px-1.5 py-0.5 rounded hover:bg-red-50 transition-all" onClick={(e) => { e.stopPropagation(); deleteStyle(style.id); }}>x</span>
                    </button>
                  ))
                )}

              </div>
            )}
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe what you want to design... (type / for saved styles)"
              rows={1}
              className="w-full resize-none rounded-lg border px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0099ff]/30 transition-all"
              style={{
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#f8fafc",
                color: "#001a33",
              }}
            />
          </div>
          <button
            onClick={toggleVoiceInput}
            className="rounded-lg p-2 transition-all duration-200 shrink-0 hover:shadow-sm"
            style={{
              background: isListening
                ? "linear-gradient(135deg,#E11D48,#FB7185)"
                : "#ffffff",
              color: isListening ? "#fff" : "#0066cc",
              border: isListening
                ? "2px solid #E11D48"
                : "1px solid rgba(0,102,204,0.15)",
              boxShadow: isListening ? "0 0 12px rgba(225,29,72,0.4)" : "none",
            }}
            title={isListening ? "Stop voice input" : "Start voice input"}
          >
            <MicIcon className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={!supportsImageInput}
            className="rounded-lg p-2 transition-all duration-200 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-sm"
            style={{
              background: inputImage ? "linear-gradient(135deg, #0066cc, #0099ff)" : "#ffffff",
              color: inputImage ? "#fff" : "#0066cc",
              border: inputImage ? "none" : "1px solid rgba(0,102,204,0.15)",
            }}
            title={supportsImageInput ? "Upload a photo of a person" : "This model doesn't support image input"}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-bold shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap shrink-0"
            style={{
              background: "linear-gradient(135deg, #0066cc 0%, #0099ff 100%)",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,102,204,0.25)",
            }}
          >
            {isGenerating ? (
              <><Spinner className="w-4 h-4" /> Generating</>
            ) : (
              <><WandIcon className="w-4 h-4" /> Generate</>
            )}
          </button>
        </div>
        <p className="mt-1 text-[9px] text-center font-medium" style={{ color: "#94a3b8" }}>
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

function WandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="m15 4 6-3-3 6m-4 2 4 4" />
      <path d="M9 9l-5 5" />
      <path d="M6 20l-4 4" />
    </svg>
  );
}

function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props} className="animate-spin">
      <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
