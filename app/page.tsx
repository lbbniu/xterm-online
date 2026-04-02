"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TerminalComponent = dynamic(() => import("../components/Terminal"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-white">Loading Terminal...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Suspense fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-white">Loading Terminal...</div>
        </div>
      }>
        <TerminalComponent />
      </Suspense>
    </div>
  );
}
