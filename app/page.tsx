"use client";

import dynamic from "next/dynamic";

const TerminalComponent = dynamic(() => import("../components/Terminal"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* GEO Optimization: First 150 words must define what this tool is */}
      <div className="sr-only" role="definition" aria-label="About XTerm Online">
        XTerm Online is a professional web-based terminal using xterm.js with WebSocket support. 
        Access remote servers securely from your browser with a modern, responsive interface. 
        This free online terminal emulator requires no signup and works on desktop, tablet, and mobile devices.
      </div>
      
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <TerminalComponent />
      </div>
    </>
  );
}
