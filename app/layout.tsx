import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "XTerm Online - Professional Web Terminal",
    template: "%s | XTerm Online"
  },
  description: "XTerm Online is a professional web-based terminal using xterm.js with WebSocket support. Access remote servers securely from your browser with a modern, responsive interface.",
  keywords: [
    "web terminal", "xterm.js", "online terminal", "websocket terminal",
    "browser terminal", "remote access", "SSH web client", "cloud terminal",
    "terminal emulator", "web-based SSH"
  ],
  authors: [{ name: "XTerm Online" }],
  creator: "XTerm Online",
  publisher: "XTerm Online",
  metadataBase: new URL("https://xterm.online"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: "https://xterm.online",
    siteName: "XTerm Online",
    title: "XTerm Online - Professional Web Terminal",
    description: "Access remote servers securely from your browser with a modern, responsive web terminal powered by xterm.js",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "XTerm Online - Web Terminal Interface"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "XTerm Online - Professional Web Terminal",
    description: "Access remote servers securely from your browser with a modern, responsive web terminal",
    images: ["/og-image.png"],
    creator: "@xterm_online"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#00d4ff"
      }
    ]
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "XTerm Online"
  },
  applicationName: "XTerm Online",
  formatDetection: {
    telephone: false
  },
  category: "developer_tools",
  classification: "Developer Tools"
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  colorScheme: "dark"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet"
        />
        <meta name="msapplication-TileColor" content="#0d1117" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
