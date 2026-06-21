"use client";

import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  role: string;
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Welcome to Aura AI Mentor. How can I support your business strategy today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/groq/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: nextHistory,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Chat failed");
      setMessages(result.history || [...nextHistory, { role: "assistant", content: result.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I could not respond right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1D3A] text-[#F8F6F2]">
      <div className="mx-auto max-w-5xl px-4 pb-10 pt-8">
        <div className="rounded-3xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl">
          <div className="border-b border-white/10 px-5 py-4">
            <h1 className="text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>AI Mentor</h1>
          </div>
          <div className="h-[65vh] space-y-3 overflow-y-auto px-5 py-5">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.role === "user" ? "bg-[#C7A461] text-[#0B1D3A]" : "bg-white/5 text-[#F8F6F2]"}`}>
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-white/10 px-5 py-4">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 rounded-2xl border border-white/10 bg-[#0B1D3A] px-4 py-3 text-sm text-white outline-none focus:border-[#C7A461]"
                placeholder="Ask the AI Mentor anything..."
              />
              <button onClick={handleSend} disabled={loading} className="inline-flex items-center gap-2 rounded-2xl bg-[#C7A461] px-4 py-3 text-sm font-semibold text-[#0B1D3A]">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}