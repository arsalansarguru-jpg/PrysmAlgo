"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("prysm-cookie-consent")) {
      setVisible(true);
    }
  }, []);

  const accept = (marketing: boolean) => {
    localStorage.setItem("prysm-cookie-consent", marketing ? "all" : "essential");
    setVisible(false);
    void fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consent_type: marketing ? "cookies_all" : "cookies_essential", granted: true }),
    }).catch(() => null);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-border bg-primary/95 backdrop-blur-xl p-4 md:p-6">
      <div className="mx-auto max-w-4xl flex flex-col md:flex-row md:items-center gap-4">
        <p className="text-sm text-muted flex-1">
          We use cookies for analytics, marketing, and to improve your experience. See our{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={() => accept(false)}>Essential Only</Button>
          <Button size="sm" onClick={() => accept(true)}>Accept All</Button>
        </div>
      </div>
    </div>
  );
}
