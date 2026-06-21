"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Sparkles } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  async function onSubmit(data: LoginFormValues) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#0B1D3A]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(199,164,97,0.12),transparent_18%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:90px_90px] opacity-8" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F234E] shadow-2xl shadow-black/30 lg:grid-cols-2">
          <div className="relative hidden bg-gradient-to-br from-[#102858] via-[#0E1F4A] to-[#0A1330] p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C7A461]/25 bg-[#C7A461]/10 px-3 py-1.5 text-sm text-[#E8D6A4]">
                <Sparkles className="h-4 w-4" />
                Aura Business Intelligence
              </span>
              <h2 className="mt-6 text-4xl leading-tight text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Welcome back.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-[#F8F6F2]/75">
                Continue your strategic analysis, track performance, and stay ahead of market change.
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.35em] text-[#C7A461]">Member access</p>
              <h3 className="mt-3 text-3xl text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Log in
              </h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-[#F8F6F2]/80">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full rounded-2xl border border-white/10 bg-[#0B1D3A] px-4 py-3 text-white outline-none placeholder:text-[#F8F6F2]/40 focus:border-[#C7A461]"
                  placeholder="you@company.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm text-[#F8F6F2]/80">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    className="w-full rounded-2xl border border-white/10 bg-[#0B1D3A] px-4 py-3 pr-12 text-white outline-none placeholder:text-[#F8F6F2]/40 focus:border-[#C7A461]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F8F6F2]/60"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              {error && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#C7A461] px-5 py-3.5 text-sm font-semibold text-[#0B1D3A] transition hover:bg-[#E6C883] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#F8F6F2]/70">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="font-semibold text-[#C7A461] hover:text-[#E6C883]">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
