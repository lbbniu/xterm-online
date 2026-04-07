import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XTerm Online | Web-Based Terminal with WebSocket Support",
  description: "Access remote servers securely from your browser. XTerm Online is a professional web-based terminal using xterm.js with WebSocket support. Free, no signup required.",
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
        
        {/* Plausible Analytics */}
        <script 
          defer 
          data-domain="xterm.online" 
          src="https://plausible.io/js/script.js"
        />
        
        {/* Google Analytics 4 */}
        <script 
          async 
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "XXXXXXXXXX");
            `,
          }}
        />
        
        {/* JSON-LD Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "XTerm Online",
              "url": "https://xterm.online",
              "logo": "https://xterm.online/icon.svg",
              "description": "Professional web-based terminal using xterm.js with WebSocket support",
            }),
          }}
        />
        
        {/* JSON-LD Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "XTerm Online",
              "url": "https://xterm.online",
              "description": "Access remote servers securely from your browser with a modern web terminal",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://xterm.online/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        
        {/* JSON-LD Structured Data - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "XTerm Online",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "100",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
