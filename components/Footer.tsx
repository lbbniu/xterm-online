"use client";

export default function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-slate-500">
          <span>© 2026 XTerm Online. Powered by xterm.js</span>
          <span className="font-mono">WebSocket Terminal</span>
        </div>
      </div>
    </footer>
  );
}
