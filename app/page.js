"use client";

import { useEffect } from "react";
import Features from "./components/landing/Features";
import Hero from "./components/landing/Hero";

import { useAuthStore } from "./stores/authStore";
import DashboardPage from "./components/Dashboard";

export default function HomePage() {
  const { getCurrentUser, current, loading } = useAuthStore((state) => state);

  // Fetch user on mount
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-3">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
        <p className="text-gray-600 font-medium">
          Getting needed data, please wait...
        </p>
      </div>
    );
  }

  // If logged in → show dashboard
  if (current) {
    return <DashboardPage user={current} />;
  }

  // Else → show landing page
  return (
    <>
      <Hero />
    </>
  );
}
