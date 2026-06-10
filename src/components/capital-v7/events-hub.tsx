"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapitalHeader } from "./capital-header";
import type { IrEvent } from "@/data/capital-v7/events";

export function EventsHub() {
  const [events, setEvents] = useState<IrEvent[]>([]);

  useEffect(() => {
    fetch("/api/v1/events").then((r) => r.json()).then((d) => setEvents(d.events ?? []));
  }, []);

  const upcoming = events.filter((e) => new Date(e.scheduledAt) > new Date());
  const replays = events.filter((e) => e.replayUrl);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CapitalHeader
          label="Events"
          title="Investor Events"
          description="Webinars, market briefings, Q&A sessions, and conference replays with registration and attendance tracking."
          breadcrumb={{ name: "Events", path: "/events" }}
        />

        <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {upcoming.map((e) => (
            <div key={e.slug} className="rounded-xl border border-border bg-primary/30 p-6">
              <span className="text-[10px] uppercase tracking-wider text-accent">{e.eventType}</span>
              <h3 className="font-semibold text-foreground mt-1">{e.title}</h3>
              <p className="text-sm text-muted mt-2">{e.description}</p>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(e.scheduledAt).toLocaleString()}</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" />{e.registrationCount} registered</span>
              </div>
              <Button asChild size="sm" className="mt-4"><Link href={`/events/${e.slug}`}>Register</Link></Button>
            </div>
          ))}
        </div>

        {replays.length > 0 && (
          <>
            <h2 className="text-lg font-semibold text-foreground mb-4">Replay Library</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {replays.map((e) => (
                <div key={e.slug} className="rounded-xl border border-border bg-primary/20 p-5 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{e.title}</p>
                    <p className="text-xs text-muted">{new Date(e.scheduledAt).toLocaleDateString()}</p>
                  </div>
                  <Video className="h-5 w-5 text-accent" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
