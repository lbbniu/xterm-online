"use client";

interface HeaderProps {
  isConnected: boolean;
  connectionStatus: string;
}

export default function Header({ isConnected, connectionStatus }: HeaderProps) {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">XTerm Online</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Modern Web Terminal</p>
            </div>
          </div>

          {/* Connection Status Badge */}
          <div 
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
              isConnected 
                ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                : connectionStatus === "Connecting..."
                ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                : 'bg-red-500/10 text-red-400 border border-red-500/30'
            }`}
            role="status"
            aria-live="polite"
            aria-label={`Connection status: ${connectionStatus}`}
          >
            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isConnected 
                ? 'bg-green-400 animate-pulse' 
                : connectionStatus === "Connecting..."
                ? 'bg-yellow-400 animate-bounce'
                : 'bg-red-400'
            }`}></span>
            <span className="hidden sm:inline">{connectionStatus}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
