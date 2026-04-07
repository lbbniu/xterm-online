"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import Script from "next/script";
import Header from "./Header";
import ConnectionPanel from "./ConnectionPanel";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Type definitions for Google AdSense
interface WindowWithAds extends Window {
  adsbygoogle?: unknown[];
}

// Google AdSense Component - Auto hides when no ad content
function GoogleAdSense({ 
  adSlot, 
  style 
}: { 
  adSlot: string; 
  style?: React.CSSProperties 
}) {
  const adRef = useRef<HTMLDivElement>(null);
  const [hasAd, setHasAd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      try {
        const win = window as WindowWithAds;
        (win.adsbygoogle = win.adsbygoogle || []).push({});
        // Check if ad loaded after a delay
        setTimeout(() => {
          if (adRef.current) {
            const adContent = adRef.current.querySelector('iframe');
            setHasAd(!!adContent && adContent.offsetHeight > 0);
          }
        }, 2000);
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <div ref={adRef} style={{...style, display: hasAd ? 'block' : 'none'}}>
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

  // Initialize terminal
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

  // WebSocket connection handlers
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

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-x-hidden">
        
        <Header isConnected={isConnected} connectionStatus={connectionStatus} />

        {/* Top Ad Banner - Hidden on small screens, auto height */}
        <div className="bg-slate-900/50 border-b border-slate-700/30 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex justify-center min-h-[90px]">
              <GoogleAdSense adSlot="1234567890" style={{ minHeight: "90px", width: "728px" }} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full">
            
            {/* Left Column - Terminal */}
            <div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
              
              <ConnectionPanel
                wsUrl={wsUrl}
                setWsUrl={setWsUrl}
                isConnected={isConnected}
                onConnect={connect}
                onDisconnect={disconnect}
                onClear={clearTerminal}
              />

              {/* Terminal Container - Responsive sizing */}
              <div className="flex-1 bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden min-h-[300px] sm:min-h-[400px]">
                <div 
                  ref={terminalRef} 
                  className="h-full w-full p-2 sm:p-4"
                  role="log"
                  aria-live="polite"
                  aria-label="Terminal output"
                />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <Sidebar>
              <div className="bg-slate-800/30 rounded-2xl border border-slate-700/30 p-4">
                <GoogleAdSense adSlot="2345678901" style={{ width: "100%", minHeight: "600px" }} />
              </div>
            </Sidebar>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
