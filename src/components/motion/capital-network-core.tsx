"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface CapitalNetworkCoreProps {
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  depth: number; // 0 (far) .. 1 (near) — drives parallax + size
  r: number;
  kind: "data" | "signal" | "risk";
}

interface Signal {
  a: number; // node index
  b: number; // node index
  t: number; // 0..1 progress
  speed: number;
}

const COLORS = {
  data: "157, 78, 221", // accent violet
  signal: "34, 211, 211", // cyan
  risk: "234, 179, 8", // gold
  edge: "157, 78, 221",
};

/**
 * "AI Trading Core" — an interactive capital-network visualization rendered on
 * a single GPU-friendly canvas: floating data nodes, connected pathways,
 * quantitative signal streams and a central risk-engine pulse. Subtle pointer
 * parallax only (no aggressive rotation), institutional aesthetic.
 *
 * Performance: device-pixel-ratio aware, paused via IntersectionObserver when
 * offscreen, static single-frame render under prefers-reduced-motion, and full
 * teardown on unmount. Designed to be lazy-loaded (ssr:false).
 */
export function CapitalNetworkCore({ className }: CapitalNetworkCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let signals: Signal[] = [];
    let raf = 0;
    let running = true;
    let phase = 0;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = width * height;
      const count = Math.max(14, Math.min(36, Math.round(area / 14000)));
      nodes = Array.from({ length: count }, (_, i) => {
        const depth = rand(0.25, 1);
        return {
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-0.08, 0.08),
          vy: rand(-0.08, 0.08),
          depth,
          r: 1.2 + depth * 2.4,
          kind: i % 11 === 0 ? "risk" : i % 4 === 0 ? "signal" : "data",
        };
      });

      // Seed signal streams between nearby nodes.
      signals = [];
      const target = Math.min(10, Math.round(count / 3));
      let guard = 0;
      while (signals.length < target && guard < 200) {
        guard++;
        const a = Math.floor(rand(0, count));
        const b = Math.floor(rand(0, count));
        if (a === b) continue;
        const dx = nodes[a].x - nodes[b].x;
        const dy = nodes[a].y - nodes[b].y;
        if (Math.hypot(dx, dy) > Math.min(width, height) * 0.55) continue;
        signals.push({ a, b, t: Math.random(), speed: rand(0.0016, 0.0042) });
      }
    };

    const linkDist = () => Math.min(width, height) * 0.42;

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth pointer easing for parallax.
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const px = (pointer.x - 0.5) * 2; // -1..1
      const py = (pointer.y - 0.5) * 2;

      const pos = (n: Node) => ({
        x: n.x + px * n.depth * 16,
        y: n.y + py * n.depth * 16,
      });

      const maxD = linkDist();

      // Edges (neural pathways)
      for (let i = 0; i < nodes.length; i++) {
        const pi = pos(nodes[i]);
        for (let j = i + 1; j < nodes.length; j++) {
          const pj = pos(nodes[j]);
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d = Math.hypot(dx, dy);
          if (d > maxD) continue;
          const alpha = (1 - d / maxD) * 0.18 * ((nodes[i].depth + nodes[j].depth) / 2);
          ctx.strokeStyle = `rgba(${COLORS.edge}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.stroke();
        }
      }

      // Signal streams traveling along pathways
      for (const s of signals) {
        const pa = pos(nodes[s.a]);
        const pb = pos(nodes[s.b]);
        const x = pa.x + (pb.x - pa.x) * s.t;
        const y = pa.y + (pb.y - pa.y) * s.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 6);
        g.addColorStop(0, `rgba(${COLORS.signal}, 0.9)`);
        g.addColorStop(1, `rgba(${COLORS.signal}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        if (animate) {
          s.t += s.speed;
          if (s.t >= 1) s.t = 0;
        }
      }

      // Nodes
      for (const n of nodes) {
        const p = pos(n);
        const pulse = n.kind === "risk" ? 0.5 + 0.5 * Math.sin(phase * 2 + n.x) : 1;
        const color = COLORS[n.kind];
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, n.r * 5);
        glow.addColorStop(0, `rgba(${color}, ${0.35 * n.depth * pulse})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color}, ${0.75 * n.depth})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central risk-engine ring
      const cx = width / 2;
      const cy = height / 2;
      const ringR = Math.min(width, height) * (0.26 + 0.012 * Math.sin(phase * 1.5));
      ctx.strokeStyle = `rgba(${COLORS.risk}, 0.10)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();

      if (animate) {
        phase += 0.01;
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          const m = 24;
          if (n.x < -m) n.x = width + m;
          if (n.x > width + m) n.x = -m;
          if (n.y < -m) n.y = height + m;
          if (n.y > height + m) n.y = -m;
        }
      }
    };

    const loop = () => {
      if (!running) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (prefersReduced) {
        draw(false);
        return;
      }
      if (!running) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    };

    const onResize = () => {
      build();
      if (prefersReduced) draw(false);
    };

    build();

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) start();
        else cancelAnimationFrame(raf);
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

export default CapitalNetworkCore;
