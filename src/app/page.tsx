"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import TerminalDemo from "@/components/TerminalDemo";
import DashboardDemo from "@/components/DashboardDemo";
import Providers from "@/components/Providers";
import Install from "@/components/Install";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <TerminalDemo />
      <DashboardDemo />
      <Providers />
      <Install />
      <Footer />
    </main>
  );
}
