"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

const WIDGET_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

function buildEmbedUrl(url: string) {
  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    background_color: "0a0a0f",
    text_color: "e5e5e5",
    primary_color: "a855f7",
  });
  return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
}

/**
 * Loads Calendly's official inline widget. The raw iframe embed frequently
 * hangs on a spinner, so we use the supported widget.js initializer and always
 * surface a direct-link fallback so a booking is never blocked.
 */
export function CalendlyEmbed({ url, height = 600 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const embedUrl = buildEmbedUrl(url);

  useEffect(() => {
    let cancelled = false;

    const init = () => {
      const calendly = (window as unknown as { Calendly?: { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void } }).Calendly;
      if (calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        calendly.initInlineWidget({ url: embedUrl, parentElement: containerRef.current });
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`);
    if (existing && (window as unknown as { Calendly?: unknown }).Calendly) {
      init();
    } else {
      const script = existing ?? document.createElement("script");
      script.src = WIDGET_SCRIPT;
      script.async = true;
      script.onload = () => {
        if (!cancelled) init();
      };
      script.onerror = () => {
        if (!cancelled) setFailed(true);
      };
      if (!existing) document.body.appendChild(script);
      else if ((window as unknown as { Calendly?: unknown }).Calendly) init();
    }

    // Safety net: if the widget hasn't rendered an iframe within 6s, show fallback.
    const timer = window.setTimeout(() => {
      if (!cancelled && containerRef.current && !containerRef.current.querySelector("iframe")) {
        setFailed(true);
      }
    }, 6000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [embedUrl]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="calendly-inline-widget w-full"
        style={{ minWidth: 320, height }}
        data-url={embedUrl}
      />
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary/95 p-6 text-center">
          <p className="text-sm text-muted">
            The scheduler is taking a moment to load. You can open it directly in a new tab.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent/90"
          >
            <ExternalLink className="h-4 w-4" />
            Open Scheduling Page
          </a>
        </div>
      )}
    </div>
  );
}
