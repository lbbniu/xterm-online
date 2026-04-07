// Analytics tracking utility for XTerm Online
// Supports Plausible, Google Analytics 4, and custom events

interface TrackingEvent {
  eventName: string;
  properties?: Record<string, string | number | boolean>;
}

// Track custom events
export function trackEvent({ eventName, properties }: TrackingEvent): void {
  // Plausible
  if (typeof window !== "undefined" && (window as WindowWithPlausible).plausible) {
    (window as WindowWithPlausible).plausible?.(eventName, { props: properties });
  }
  
  // Google Analytics 4
  if (typeof window !== "undefined" && (window as WindowWithGA).gtag) {
    (window as WindowWithGA).gtag?.("event", eventName, properties);
  }
  
  // Microsoft Clarity
  if (typeof window !== "undefined" && (window as WindowWithClarity).clarity) {
    (window as WindowWithClarity).clarity?.("event", eventName, properties);
  }
}

// Track connection events
export function trackConnection(status: "connected" | "disconnected" | "error", wsUrl: string): void {
  trackEvent({
    eventName: "websocket_connection",
    properties: {
      status,
      ws_url: wsUrl.replace(/:\d+/, ":PORT"), // Mask port for privacy
    },
  });
}

// Track terminal interactions
export function trackTerminalAction(action: "clear" | "focus" | "blur"): void {
  trackEvent({
    eventName: "terminal_action",
    properties: { action },
  });
}

// Get UTM parameters from URL
export function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const value = params.get(key);
    if (value) utmParams[key] = value;
  });
  
  return utmParams;
}

// Track page view with UTM parameters
export function trackPageView(pagePath?: string): void {
  const utmParams = getUTMParams();
  
  trackEvent({
    eventName: "page_view",
    properties: {
      page_path: pagePath || window.location.pathname,
      ...utmParams,
    },
  });
}

// Type definitions
interface WindowWithPlausible extends Window {
  plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
}

interface WindowWithGA extends Window {
  gtag?: (command: string, ...args: unknown[]) => void;
  dataLayer?: unknown[];
}

interface WindowWithClarity extends Window {
  clarity?: (command: string, ...args: unknown[]) => void;
}
