"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  businessDescription: z.string().min(1, "Business description is required"),
  competitorUrl: z.string().optional(),
});

export default function DeepDivePage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/gemini/deepdive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to generate report");
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B1D3A] text-[#F8F6F2]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <h1 className="text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>Deep Dive Generator</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 rounded-3xl border border-white/10 bg-[#121212]/80 p-6 backdrop-blur-xl">
          <div>
            <label className="mb-2 block text-sm text-[#F8F6F2]/80">Business description</label>
            <textarea
              {...register("businessDescription")}
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-[#0B1D3A] px-4 py-3 text-white outline-none focus:border-[#C7A461]"
            />
            {errors.businessDescription && <p className="mt-2 text-sm text-red-400">{String(errors.businessDescription.message)}</p>}
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-[#F8F6F2]/80">Competitor URL (optional)</label>
            <input
              {...register("competitorUrl")}
              className="w-full rounded-2xl border border-white/10 bg-[#0B1D3A] px-4 py-3 text-white outline-none focus:border-[#C7A461]"
            />
          </div>
          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          <button disabled={loading} className="mt-6 rounded-full bg-[#C7A461] px-5 py-3 text-sm font-semibold text-[#0B1D3A]">
            {loading ? "Generating..." : "Generate Deep Dive"}
          </button>
        </form>

        {report && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-[#121212]/80 p-6 backdrop-blur-xl">
            <h2 className="text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>Executive Report</h2>
            <div className="mt-6 space-y-6">
              {Object.entries(report).map(([key, value], index) => (
                <div key={key}>
                  <h3 className="text-sm uppercase tracking-[0.3em] text-[#C7A461]">{key}</h3>
                  <div className="mt-3 border-l-2 border-[#C7A461] pl-4">
                    {typeof value === "string" ? (
                      <p className="text-sm text-[#F8F6F2]/80">{value}</p>
                    ) : (
                      <pre className="overflow-x-auto text-sm text-[#F8F6F2]/80">{JSON.stringify(value, null, 2)}</pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}