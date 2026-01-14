"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EnterAnimation from "../animation/EnterAnimation";
import bglogo from "@/public/bglogo.webp";
import shiplogo from "@/public/shiplogo.webp";
import Image from "next/image";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: username,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("Sign-in failed");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "An error occurred");
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <div className="relative h-75 w-fit">
        <div className="relative">
          <Image src={bglogo} alt="Background" height={300} priority />
        </div>

        <EnterAnimation className="absolute inset-0 z-10">
          <Image src={shiplogo} alt="Ship" height={300} priority />
        </EnterAnimation>
      </div>

      <div className="min-w-lg p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {error && <div className="text-red-600 text-lg">{error}</div>}

          <button
            type="submit"
            disabled={!isLoaded}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
