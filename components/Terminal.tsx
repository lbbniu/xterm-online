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

      {/* Header with AdSense */}
      <header className="bg-[var(--bg-secondary)] border-b border-[var(--border-default)] p-3 sm:p-4 shrink-0">
        <div className="max-w-7xl mx-auto">
          {/* Top Ad Banner */}
          <div className="mb-4 hidden sm:block">
            <GoogleAdSense adSlot="1234567890" style={{ height: "90px" }} />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-green)]/20 rounded-xl border border-[var(--accent-cyan)]/30">
                <svg className="w-6 h-6 text-[var(--accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">XTerm Online</h1>
                <p className="text-xs text-[var(--text-muted)]">Professional Web Terminal</p>
              </div>
            </div>

            {/* Connection Panel - Tech Style */}
            <div className="flex-1 glass-panel rounded-xl p-1 border border-[var(--border-default)]">
              <div className="flex flex-col sm:flex-row gap-2">
                {/* URL Input - Large & Tech */}
                <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)]/10 to-[var(--accent-green)]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  <div className="relative flex items-center bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-default)] group-hover:border-[var(--accent-cyan)]/50 transition-all duration-300 focus-within:border-[var(--accent-cyan)] focus-within:shadow-[0_0_20px_rgba(0,212,255,0.2)] h-12">
                    <span className="pl-4 pr-2 text-[var(--accent-cyan)] font-mono text-sm font-bold">WS://</span>
                    <input
                      type="text"
                      value={wsUrl}
                      onChange={(e) => setWsUrl(e.target.value)}
                      placeholder="localhost:8080"
                      disabled={isConnected}
                      className="flex-1 bg-transparent border-0 px-2 py-3 text-[var(--text-primary)] font-mono text-base placeholder-[var(--text-muted)] focus:outline-none disabled:opacity-50"
                    />
                    {isConnected && (
                      <span className="pr-4 text-[var(--accent-green)]">
                        <span className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-pulse inline-block"></span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={isConnected ? disconnect : connect}
                    className={`
                      relative overflow-hidden px-6 h-12 rounded-lg font-semibold text-sm uppercase tracking-wider
                      transition-all duration-300 transform hover:scale-105 active:scale-95
                      ${isConnected 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/30' 
                        : 'bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] text-[var(--bg-primary)] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50'
                      }
                    `}
                  >
                    <span className="relative flex items-center gap-2">
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
                    </span>
                  </button>

                  <button
                    onClick={clearTerminal}
                    className="px-4 h-12 rounded-lg font-medium text-sm border border-[var(--border-default)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:border-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    清屏
                  </button>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-2 flex items-center gap-3 px-2">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${
                  isConnected 
                    ? 'bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/30' 
                    : connectionStatus === "Connecting..."
                    ? 'bg-[var(--accent-yellow)]/10 text-[var(--accent-yellow)] border border-[var(--accent-yellow)]/30'
                    : 'bg-[var(--accent-red)]/10 text-[var(--accent-red)] border border-[var(--accent-red)]/30'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    isConnected 
                      ? 'bg-[var(--accent-green)] animate-pulse' 
                      : connectionStatus === "Connecting..."
                      ? 'bg-[var(--accent-yellow)] animate-blink'
                      : 'bg-[var(--accent-red)]'
                  }`}></span>
                  <span>{connectionStatus}</span>
                </div>
                
                <span className="text-[var(--text-muted)]">|</span>
                <span className="text-[var(--text-secondary)] font-mono text-xs">WebSocket Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Terminal Container */}
      <main className="flex-1 p-2 sm:p-4 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex gap-4">
          {/* Main Terminal */}
          <div className="flex-1 terminal-container h-full">
            <div ref={terminalRef} className="h-full w-full" />
          </div>

          {/* Sidebar Ad */}
          <div className="hidden lg:block w-[300px] shrink-0">
            <GoogleAdSense adSlot="2345678901" style={{ width: "300px", height: "600px" }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-default)] p-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
          <span>XTerm Online © 2026 • Professional Web Terminal powered by xterm.js</span>
          <span className="font-mono">Press any key to send to WebSocket</span>
        </div>
      </footer>
    </>
  );
}
