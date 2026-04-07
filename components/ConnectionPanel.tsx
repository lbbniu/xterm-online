"use client";

interface ConnectionPanelProps {
  wsUrl: string;
  setWsUrl: (url: string) => void;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onClear: () => void;
}

export default function ConnectionPanel({
  wsUrl,
  setWsUrl,
  isConnected,
  onConnect,
  onDisconnect,
  onClear,
}: ConnectionPanelProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-3 sm:p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        
        {/* URL Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <span className="text-slate-500 font-mono text-sm sm:text-base">ws://</span>
          </div>
          <input
            type="text"
            value={wsUrl}
            onChange={(e) => setWsUrl(e.target.value)}
            placeholder="localhost:8080"
            disabled={isConnected}
            aria-label="WebSocket server address"
            className="w-full pl-12 sm:pl-16 pr-3 sm:pr-4 py-3 sm:py-4 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-mono text-sm sm:text-base disabled:opacity-50 min-h-[44px] sm:min-h-[52px]"
          />
          
          {isConnected && (
            <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={isConnected ? onDisconnect : onConnect}
            aria-label={isConnected ? "断开连接" : "连接服务器"}
            className={`
              px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200
              flex items-center gap-1.5 sm:gap-2 min-w-[80px] sm:min-w-[100px] justify-center min-h-[44px] sm:min-h-[52px]
              ${isConnected 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
              }
            `}
          >
            {isConnected ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>断开</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>连接</span>
              </>
            )}
          </button>

          <button
            onClick={onClear}
            aria-label="清屏"
            className="px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-1.5 sm:gap-2 border border-slate-600 hover:border-slate-500 min-h-[44px] sm:min-h-[52px] min-w-[80px] sm:min-w-[100px] justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="hidden sm:inline">清屏</span>
          </button>
        </div>
      </div>
    </div>
  );
}
