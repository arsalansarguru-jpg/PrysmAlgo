"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { IrEvent } from "@/data/capital-v7/events";

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<IrEvent | null>(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetch("/api/v1/events").then((r) => r.json()).then((d) => {
      setEvent((d.events ?? []).find((e: IrEvent) => e.slug === slug) ?? null);
    });
  }, [slug]);

  if (!event) return <div className="pt-28 text-center text-muted">Loading...</div>;

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-lg px-4">
        <Button variant="ghost" size="sm" asChild className="mb-6"><Link href="/events">← Back to Events</Link></Button>
        <span className="text-xs uppercase tracking-wider text-accent">{event.eventType}</span>
        <h1 className="font-display text-2xl font-bold text-foreground mt-2 mb-4">{event.title}</h1>
        <p className="text-muted mb-6">{event.description}</p>
        <div className="space-y-2 text-sm text-muted mb-8">
          <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(event.scheduledAt).toLocaleString()}</p>
          <p className="flex items-center gap-2"><Clock className="h-4 w-4" />{event.durationMinutes} minutes</p>
          <p className="flex items-center gap-2"><Users className="h-4 w-4" />{event.registrationCount} registered</p>
        </div>
        {registered ? (
          <p className="text-success text-center">You are registered!</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setRegistered(true); }} className="space-y-3">
            <Input type="text" placeholder="Full Name" required />
            <Input type="email" placeholder="Email" required />
            <Button type="submit" className="w-full">Register</Button>
          </form>
        )}
      </div>
    </div>
  );
}
