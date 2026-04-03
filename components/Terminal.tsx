"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import Script from "next/script";

// Google AdSense Component
function GoogleAdSense({ adSlot, style }: { adSlot: string; style?: React.CSSProperties }) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div ref={adRef} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-2958462056335326"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const ws = useRef<WebSocket | null>(null);
  
  const [wsUrl, setWsUrl] = useState("localhost:8080");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: "#0d1117",
        foreground: "#e6edf3",
        cursor: "#00d4ff",
        selectionBackground: "#264f78",
        black: "#484f58",
        red: "#ff7b72",
        green: "#3fb950",
        yellow: "#d29922",
        blue: "#58a6ff",
        magenta: "#a371f7",
        cyan: "#00d4ff",
        white: "#e6edf3",
      },
    });

    const fit = new FitAddon();
    term.loadAddon(fit);

    term.open(terminalRef.current);
    fit.fit();

    terminal.current = term;
    fitAddon.current = fit;

    const handleResize = () => {
      fit.fit();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ws.current?.close();
      term.dispose();
    };
  }, []);

  const connect = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.close();
    }

    try {
      setConnectionStatus("Connecting...");
      const fullUrl = wsUrl.startsWith("ws://") ? wsUrl : `ws://${wsUrl}`;
      const socket = new WebSocket(fullUrl);

      socket.onopen = () => {
        setIsConnected(true);
        setConnectionStatus("Connected");
        terminal.current?.writeln("\r\n\x1b[32m✓ Connected to WebSocket server\x1b[0m\r\n");
      };

      socket.onmessage = (event) => {
        if (terminal.current) {
          terminal.current.write(event.data);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        setConnectionStatus("Disconnected");
        terminal.current?.writeln("\r\n\x1b[31m✗ Disconnected from server\x1b[0m\r\n");
      };

      socket.onerror = () => {
        setConnectionStatus("Error");
        terminal.current?.writeln("\r\n\x1b[31m✗ WebSocket error occurred\x1b[0m\r\n");
      };

      ws.current = socket;

      terminal.current?.onData((data) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(data);
        }
      });
    } catch (error) {
      setConnectionStatus("Error");
      terminal.current?.writeln("\r\n\x1b[31m✗ Failed to connect\x1b[0m\r\n");
    }
  };

  const disconnect = () => {
    ws.current?.close();
  };

  const clearTerminal = () => {
    terminal.current?.clear();
  };

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2958462056335326"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
        
        {/* Modern Header */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">XTerm Online</h1>
                  <p className="text-xs text-slate-400">Modern Web Terminal</p>
                </div>
              </div>

              {/* Connection Status Badge */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                isConnected 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : connectionStatus === "Connecting..."
                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
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

        {/* Top Ad Banner */}
        <div className="bg-slate-900/50 border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="hidden sm:flex justify-center">
              <GoogleAdSense adSlot="1234567890" style={{ height: "90px", width: "728px" }} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            
            {/* Left Column - Terminal */}
            <div className="flex-1 flex flex-col gap-4">
              
              {/* Connection Panel */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  {/* URL Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-500 font-mono text-sm">ws://</span>
                    </div>
                    <input
                      type="text"
                      value={wsUrl}
                      onChange={(e) => setWsUrl(e.target.value)}
                      placeholder="localhost:8080"
                      disabled={isConnected}
                      className="w-full pl-14 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-mono text-sm disabled:opacity-50"
                    />
                    
                    {isConnected && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={isConnected ? disconnect : connect}
                      className={`
                        px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                        flex items-center gap-2 min-w-[100px] justify-center
                        ${isConnected 
                          ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25' 
                          : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40'
                        }
                      `}
                    >
                      {isConnected ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          断开
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          连接
                        </>
                      )}
                    </button>

                    <button
                      onClick={clearTerminal}
                      className="px-4 py-3 rounded-xl font-medium text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-all duration-200 flex items-center gap-2 border border-slate-600 hover:border-slate-500"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      清屏
                    </button>
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden min-h-[400px]">
                <div ref={terminalRef} className="h-full w-full p-4" />
              </div>
            </div>

            {/* Right Column - Ad & Info */}
            <div className="w-full lg:w-[300px] flex flex-col gap-4">
              
              {/* Sidebar Ad */}
              <div className="bg-slate-800/30 rounded-2xl border border-slate-700/30 p-4 hidden lg:block">
                <GoogleAdSense adSlot="2345678901" style={{ width: "100%", height: "600px" }} />
              </div>

              {/* Quick Info */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  使用说明
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• 输入 WebSocket 地址连接</li>
                  <li>• 支持 ws:// 和 wss:// 协议</li>
                  <li>• 按键自动发送到服务器</li>
                  <li>• 支持全屏终端体验</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
              <span>© 2026 XTerm Online. Powered by xterm.js</span>
              <span className="font-mono">WebSocket Terminal</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
