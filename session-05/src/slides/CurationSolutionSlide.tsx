import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Step =
  | "idle"
  | "req-system"
  | "req-web"
  | "resp-web"
  | "resp-agent";

const STEPS: { step: Step; ms: number }[] = [
  { step: "idle", ms: 700 },
  { step: "req-system", ms: 1300 },
  { step: "req-web", ms: 1300 },
  { step: "resp-web", ms: 1600 },
  { step: "resp-agent", ms: 1800 },
];

const ICON_BOX = 112;
const ARROW_W = 160;

function AgentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={40} cy={10} r={3} fill="currentColor" />
      <line x1={40} y1={14} x2={40} y2={22} />
      <rect x={16} y={22} width={48} height={42} rx={10} />
      <circle cx={30} cy={40} r={4} fill="currentColor" stroke="none" />
      <circle cx={50} cy={40} r={4} fill="currentColor" stroke="none" />
      <rect
        x={32}
        y={52}
        width={16}
        height={4}
        rx={2}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function SystemIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x={14} y={18} width={52} height={44} rx={6} />
      <line x1={14} y1={30} x2={66} y2={30} />
      <circle cx={22} cy={24} r={1.5} fill="currentColor" stroke="none" />
      <circle cx={28} cy={24} r={1.5} fill="currentColor" stroke="none" />
      <path d="M24 42 L36 42" />
      <path d="M24 50 L48 50" />
      <path d="M52 40 L58 46 L52 52" />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={40} cy={40} r={28} />
      <path d="M12 40 L68 40" />
      <path d="M40 12 C54 24, 54 56, 40 68" />
      <path d="M40 12 C26 24, 26 56, 40 68" />
      <path d="M18 26 L62 26" />
      <path d="M18 54 L62 54" />
    </svg>
  );
}

type NodeProps = {
  icon: React.ReactNode;
  title: string;
  tone: "violet" | "sky" | "emerald";
};

const TONE: Record<
  NodeProps["tone"],
  { wrap: string; glow: string }
> = {
  violet: {
    wrap: "border-violet-400/60 bg-violet-500/15 text-violet-100",
    glow: "shadow-[0_0_24px_rgba(167,139,250,0.28)]",
  },
  sky: {
    wrap: "border-sky-400/60 bg-sky-500/15 text-sky-100",
    glow: "shadow-[0_0_24px_rgba(56,189,248,0.28)]",
  },
  emerald: {
    wrap: "border-emerald-400/60 bg-emerald-500/15 text-emerald-100",
    glow: "shadow-[0_0_24px_rgba(52,211,153,0.28)]",
  },
};

function Node({ icon, title, tone }: NodeProps) {
  const t = TONE[tone];
  return (
    <div
      className="relative shrink-0"
      style={{ width: ICON_BOX, height: ICON_BOX }}
    >
      <div
        className={`flex h-full w-full items-center justify-center rounded-2xl border ${t.wrap} ${t.glow}`}
      >
        {icon}
      </div>
      <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 text-sm font-semibold text-neutral-100">
        {title}
      </span>
    </div>
  );
}

type Direction = "ltr" | "rtl";

type ArrowSlotProps = {
  active: boolean;
  direction: Direction;
  label?: { text: string; cls: string; sizeClass?: string };
};

function ArrowSlot({ active, direction, label }: ArrowSlotProps) {
  const [displayDirection, setDisplayDirection] = useState(direction);
  useEffect(() => {
    if (active) setDisplayDirection(direction);
  }, [active, direction]);

  return (
    <div
      className="relative shrink-0"
      style={{ width: ARROW_W, height: ICON_BOX }}
    >
      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
        <motion.svg
          viewBox="0 0 120 20"
          width={ARROW_W}
          height={20}
          className="text-neutral-100"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {displayDirection === "ltr" ? (
            <>
              <line
                x1={4}
                y1={10}
                x2={110}
                y2={10}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <polygon points="118,10 106,4 106,16" fill="currentColor" />
            </>
          ) : (
            <>
              <line
                x1={10}
                y1={10}
                x2={116}
                y2={10}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              <polygon points="2,10 14,4 14,16" fill="currentColor" />
            </>
          )}
        </motion.svg>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center"
        style={{ top: ICON_BOX / 2 - 46 }}
      >
        <AnimatePresence>
          {label && (
            <motion.div
              key={label.text}
              className={`absolute whitespace-nowrap rounded-full border font-mono shadow ${label.cls} ${label.sizeClass ?? "px-4 py-2 text-xs"}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {label.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function CurationSolutionSlide() {
  const [i, setI] = useState(0);
  const current = STEPS[i].step;

  useEffect(() => {
    const t = window.setTimeout(
      () => setI((prev) => (prev + 1) % STEPS.length),
      STEPS[i].ms,
    );
    return () => window.clearTimeout(t);
  }, [i]);

  const leftActive =
    current === "req-system" || current === "resp-agent";
  const rightActive = current === "req-web" || current === "resp-web";
  const leftDirection: Direction = current === "resp-agent" ? "rtl" : "ltr";
  const rightDirection: Direction = current === "resp-web" ? "rtl" : "ltr";

  const leftLabel =
    current === "req-system"
      ? {
          text: "web_fetch(url)",
          cls: "border-violet-400/60 bg-violet-500/15 text-violet-100",
        }
      : current === "resp-agent"
        ? {
            text: "{ title, key_points }",
            cls: "border-emerald-400/60 bg-emerald-500/15 text-emerald-100",
          }
        : undefined;

  const rightLabel =
    current === "req-web"
      ? {
          text: "GET /page",
          cls: "border-sky-400/60 bg-sky-500/15 text-sky-100",
        }
      : current === "resp-web"
        ? {
            text: "<html> 42KB",
            cls: "border-emerald-400/60 bg-emerald-500/15 text-emerald-100",
            sizeClass: "px-4 py-2.5 text-sm font-semibold",
          }
        : undefined;

  return (
    <SlideLayout title="직관적인 해결책: 에이전트에게 정보를 골라서 주자">
      <div className="flex w-full max-w-5xl items-center justify-center gap-2 pb-12">
        <Node
          icon={<AgentIcon className="h-16 w-16" />}
          title="Agent"
          tone="violet"
        />

        <ArrowSlot
          active={leftActive}
          direction={leftDirection}
          label={leftLabel}
        />

        <Node
          icon={<SystemIcon className="h-16 w-16" />}
          title="System"
          tone="sky"
        />

        <ArrowSlot
          active={rightActive}
          direction={rightDirection}
          label={rightLabel}
        />

        <Node
          icon={<WebIcon className="h-16 w-16" />}
          title="Web Page"
          tone="emerald"
        />
      </div>
    </SlideLayout>
  );
}
