"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().min(1, "Industry is required"),
  location: z.string().min(1, "Location is required"),
  teamSize: z.string().min(1, "Team size is required"),
  revenueRange: z.string().min(1, "Revenue range is required"),
  goal: z.string().min(1, "Goal is required"),
});

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const steps = [
    { label: "Business Name", name: "businessName", placeholder: "Acme Retail" },
    { label: "Industry", name: "industry", placeholder: "Retail & Consumer" },
    { label: "Location", name: "location", placeholder: "New York, USA" },
    { label: "Team Size", name: "teamSize", placeholder: "11-50 employees" },
    { label: "Revenue Range", name: "revenueRange", placeholder: "$1M - $5M" },
    { label: "Goal", name: "goal", placeholder: "Increase profitability and reduce churn" },
  ];

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to save onboarding info");

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to continue");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return (
    <main className="min-h-screen bg-[#0B1D3A] text-[#F8F6F2]">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10">
        <div className="w-full rounded-3xl border border-white/10 bg-[#121212]/80 p-8 shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#C7A461]">Onboarding</p>
          <h1 className="mt-2 text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Tell us about your business
          </h1>
          <div className="mt-6 h-2 rounded-full bg-white/5">
            <div className="h-2 rounded-full bg-[#C7A461]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm text-[#F8F6F2]/80">{steps[step].label}</label>
              <input
                {...register(steps[step].name as any)}
                placeholder={steps[step].placeholder}
                className="w-full rounded-2xl border border-white/10 bg-[#0B1D3A] px-4 py-3 text-white outline-none focus:border-[#C7A461]"
              />
              {errors[steps[step].name as keyof typeof errors] && (
                <p className="mt-2 text-sm text-red-400">{
                  (errors[steps[step].name as keyof typeof errors]?.message as string) || "Required"
                }</p>
              )}
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 0}
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-[#F8F6F2] disabled:opacity-40"
              >
                Back
              </button>

              {step === steps.length - 1 ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-[#C7A461] px-5 py-2.5 text-sm font-semibold text-[#0B1D3A]"
                >
                  {loading ? "Saving..." : "Finish"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-full bg-[#C7A461] px-5 py-2.5 text-sm font-semibold text-[#0B1D3A]"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}