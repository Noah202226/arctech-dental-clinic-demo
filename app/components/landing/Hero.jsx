"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/stores/authStore";
import { useEffect, useState } from "react";

export default function Hero() {
  const { login, register, getCurrentUser } = useAuthStore((state) => state);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = await login(form.get("email"), form.get("password"));
    if (user) router.push("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const user = await register(form.get("email"), form.get("password"));
    if (user) router.push("/");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Floating Top Bar */}
      <div className="w-full bg-green-600 text-white py-3 px-6 text-center text-sm md:text-base font-medium flex flex-wrap justify-center gap-x-4">
        <span>🚀 Patient Records</span>
        <span>•</span>
        <span>⚙️ Customize Appp</span>
        <span>•</span>
        <span>📊 Generate reports</span>
        <span>•</span>
        <span>🔐 Secure Authentication</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-6 md:px-12 py-16 z-10">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Image
              src="/demo-app.png" // Replace with your demo logo
              alt="Demo App Logo"
              width={150}
              height={150}
              className="mx-auto md:mx-0 drop-shadow-md"
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to Our <span className="text-green-600">Demo App</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore a modern demo experience with clean UI, secure login, and a
            smooth user workflow. Sign in or create your account to continue.
          </motion.p>

          {/* Extra Info */}
          <motion.div
            className="mt-10 text-sm text-gray-600 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="font-semibold text-gray-700">
              🌍 A Demo App for showcasing features and UI/UX
            </p>
            <p>🕘 Accessible anytime — explore freely</p>
            <p>📌 Fully customizable for any project</p>
          </motion.div>
        </div>

        {/* Right Section - Auth Form */}
        <div className="px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : "login"}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <AuthForm
                handleSubmit={isSignUp ? handleRegister : handleLogin}
                submitType={isSignUp ? "Sign Up" : "Log In"}
                onToggle={() => setIsSignUp(!isSignUp)}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/10 via-green-100/10 to-transparent pointer-events-none"></div>
    </section>
  );
}
