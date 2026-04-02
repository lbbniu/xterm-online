"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const ws = useRef<WebSocket | null>(null);
  
  const [wsUrl, setWsUrl] = useState("ws://localhost:8080");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize terminal
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: "#1a1a1a",
        foreground: "#e5e5e5",
        cursor: "#e5e5e5",
        selectionBackground: "#444",
      },
    });

    const fit = new FitAddon();
    term.loadAddon(fit);

    term.open(terminalRef.current);
    fit.fit();

    terminal.current = term;
    fitAddon.current = fit;

    // Handle resize
    const handleResize = () => {
      fit.fit();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
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
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        setIsConnected(true);
        setConnectionStatus("Connected");
        terminal.current?.writeln("\r\n\x1b[32mConnected to WebSocket server\x1b[0m\r\n");
      };

      socket.onmessage = (event) => {
        if (terminal.current) {
          terminal.current.write(event.data);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        setConnectionStatus("Disconnected");
        terminal.current?.writeln("\r\n\x1b[31mDisconnected from server\x1b[0m\r\n");
      };

      socket.onerror = (error) => {
        setConnectionStatus("Error");
        terminal.current?.writeln("\r\n\x1b[31mWebSocket error occurred\x1b[0m\r\n");
      };

      ws.current = socket;

      // Setup terminal input handling
      terminal.current?.onData((data) => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(data);
        }
      });
    } catch (error) {
      setConnectionStatus("Error");
      terminal.current?.writeln("\r\n\x1b[31mFailed to connect\x1b[0m\r\n");
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
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#333] p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
            </svg>
            Web Terminal
          </h1>
          
          <div className="flex-1 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={wsUrl}
              onChange={(e) => setWsUrl(e.target.value)}
              placeholder="ws://localhost:8080"
              disabled={isConnected}
              className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-[#444] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={isConnected ? disconnect : connect}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isConnected
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isConnected ? "Disconnect" : "Connect"}
            </button>
            <button
              onClick={clearTerminal}
              className="px-4 py-2 bg-[#333] hover:bg-[#444] text-white rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isConnected
                  ? "bg-green-500 animate-pulse"
                  : connectionStatus === "Connecting..."
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-400">{connectionStatus}</span>
          </div>
        </div>
      </header>

      {/* Terminal Container */}
      <main className="flex-1 p-4">
        <div className="max-w-7xl mx-auto h-[calc(100vh-140px)]">
          <div className="bg-[#1a1a1a] rounded-lg border border-[#333] h-full overflow-hidden">
            <div ref={terminalRef} className="h-full w-full p-2" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#333] p-3">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          Web Terminal powered by xterm.js • Press any key to send to WebSocket
        </div>
      </footer>
    </>
  );
}
