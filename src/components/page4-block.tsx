"use client";

import { useEffect, useRef } from "react";
import { ScrambleGroup } from "@/lib/typer/typer";

const LINES = ["decisions and prior work", "carry into the next task"];

export default function Page4Block() {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<ScrambleGroup | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = [
      ...container.querySelectorAll<HTMLElement>("[data-sc]"),
    ];
    if (!els.length) return;

    const group = new ScrambleGroup(
      els,
      { maxFrame: 90, accentWords: new Set(["decisions", "work", "next"]) },
      0.2,
    );
    groupRef.current = group;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          group.go();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(container);

    return () => {
      io.disconnect();
      group.destroy();
      groupRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-8 leading-none select-none overflow-hidden"
      style={
        {
          "--sc-fg": "#18181b",
          "--sc-bg": "#fafafa",
          "--sc-accent": "#007a55",
          "--sc-accent-ink": "#fafafa",
        } as React.CSSProperties
      }
    >
      {/* top-left box */}
      <div
        className="absolute top-[8%] left-[4%] sm:top-[10%] sm:left-[8%] w-[min(150px,40vw)] sm:w-[clamp(200px,24vw,400px)] bg-[#007a55]"
        style={{ aspectRatio: "5 / 1" }}
      >
        <div className="flex items-center justify-center text-white/80 font-mono text-[clamp(9px,1.6vw,16px)] whitespace-nowrap leading-[1.3] size-full px-2 sm:px-4 py-2 overflow-hidden">
          ✓ Used Coord MCP
        </div>
      </div>

      {/* right label — desktop/tablet only; collides with headline on phones */}
      <div className="absolute top-[18%] right-[4%] w-full max-w-[clamp(160px,18vw,240px)] p-2 hidden sm:block">
        <div className="text-[#007a55] font-mono text-[clamp(11px,1.5vw,16px)] leading-[1.35] text-right">
          your agents do not have to be clueless sandboxed employees
        </div>
      </div>

      {/* bottom-right Claude Code terminal */}
      <div className="absolute bottom-[6%] right-[4%] sm:bottom-[10%] sm:right-[8%] w-[min(200px,55vw)] sm:w-[clamp(220px,24vw,420px)] h-fit bg-[#007a55]">
        <div className="flex flex-col p-2 sm:p-3">
          <div className="w-full gap-1 mt-1 h-fit py-0.5 font-mono text-[clamp(9px,1.8vw,15px)] text-white/60 bg-white/20 leading-[1.3] flex items-center overflow-hidden">
            &gt; deploy the new API
          </div>
          <div className="w-full mt-1 text-white/70 font-mono text-[clamp(9px,1.8vw,15px)] leading-[1.3] flex items-center gap-1">
            <span className="text-white">✓</span> Checked Coord
          </div>
          <div className="w-full mt-1 text-white/70 font-mono text-[clamp(9px,1.8vw,15px)] leading-[1.3] flex items-start">
            <span className="shrink-0 text-[0.5em] mt-[0.55em] leading-none text-white/80">●</span>
            <span className="ml-1.5 line-clamp-2 sm:line-clamp-none">Found rollout notes from @amoreX</span>
          </div>
          <div className="w-full gap-1 mt-1 bg-white/20 py-1.5 text-white/70 flex items-center font-mono text-[clamp(9px,1.8vw,15px)] leading-[1.3] overflow-hidden">
            &gt; <span className="truncate">continuing from those notes</span>
            <span className="inline-block w-[0.6em] h-[1em] bg-white/80 align-middle animate-[blink_1s_step-end_infinite] ml-px shrink-0" />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {LINES.map((line, i) => (
          <div
            key={line}
            data-sc="idle"
            className={`font-mono text-[clamp(1.15rem,6.2vw,8rem)] font-medium tracking-tighter ${
              i === 0 ? "text-left" : "text-right"
            }`}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
