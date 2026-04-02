"use client";

import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "XTerm Online",
    description: "Professional web-based terminal using xterm.js with WebSocket support",
    url: "https://xterm.online",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires WebSocket.",
    featureList: [
      "WebSocket terminal connection",
      "xterm.js powered terminal emulator",
      "Responsive design",
      "Dark theme support",
      "Mobile friendly interface"
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    author: {
      "@type": "Organization",
      name: "XTerm Online",
      url: "https://xterm.online"
    },
    screenshot: {
      "@type": "ImageObject",
      url: "https://xterm.online/screenshot-wide.png",
      width: 1280,
      height: 720
    },
    softwareVersion: "1.0.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://xterm.online"
      }
    ]
  };

  return (
    <>
      <Script
        id="structured-data-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
