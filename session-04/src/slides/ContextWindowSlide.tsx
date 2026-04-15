import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

const HEADER_TOKENS = [
  "USER:",
  "LLM의",
  "원리에",
  "대해",
  "설명해줘",
  "ASSISTANT:",
];

const AGENT_TEXT =
  "LLM은 지금까지 주어진 토큰 시퀀스를 바탕으로, 다음에 올 토큰의 확률 분포를 계산합니다. 그 분포에서 토큰을 하나 뽑고, 뽑힌 토큰을 다시 입력에 이어 붙여 또 다음 토큰을 예측하는 과정을 반복하죠. 즉, 주어진 컨텍스트 위에 가장 그럴듯한 다음 토큰을 계속 이어 붙이는 기계라고 할 수 있습니다...";

const ALL_TOKENS = [...HEADER_TOKENS, ...AGENT_TEXT.split(" ")];

const WINDOW_SIZE = 6;

const INITIAL_HOLD_MS = 750;
const SETTLE_MS = 880;
const ARROW_MS = 520;
const OUTPUT_MS = 480;

type Phase = "settle" | "arrow" | "output";

function tokenColor(token: string) {
  if (token === "USER:") return "text-sky-300";
  if (token === "ASSISTANT:") return "text-violet-300";
  return "text-neutral-100";
}

export function ContextWindowSlide() {
  const [cursor, setCursor] = useState(WINDOW_SIZE - 1);
  const [phase, setPhase] = useState<Phase>("settle");

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) =>
      new Promise<void>((r) => window.setTimeout(r, ms));

    const run = async () => {
      let c = WINDOW_SIZE - 1;
      await delay(INITIAL_HOLD_MS);
      while (!cancelled && c < ALL_TOKENS.length - 1) {
        setPhase("arrow");
        await delay(ARROW_MS);
        if (cancelled) return;
        setPhase("output");
        await delay(OUTPUT_MS);
        if (cancelled) return;
        c += 1;
        setCursor(c);
        setPhase("settle");
        await delay(SETTLE_MS);
        if (cancelled) return;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const start = cursor - WINDOW_SIZE + 1;
  const windowIndices = Array.from(
    { length: WINDOW_SIZE },
    (_, i) => start + i,
  );
  const outputIndex = cursor + 1;
  const showArrow = phase !== "settle";
  const showOutput = phase === "output" && outputIndex < ALL_TOKENS.length;

  return (
    <SlideLayout
      title={"그럼 컨텍스트 '윈도우'는 뭐죠?"}
      subtitle={
        "LLM은 입력받을 수 있는 토큰의 양이 정해져있어요.\n입력이 너무 길면, 정해진 개수만큼만 토큰을 슬라이딩 윈도우 방식으로 받을 수 있습니다."
      }
    >
      <div className="flex w-full max-w-6xl items-center justify-center gap-6">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="relative rounded-2xl border-2 border-teal-400/60 bg-teal-500/5 px-5 py-4"
        >
          <div className="absolute -top-3 left-4 bg-neutral-950 px-2 text-xs font-semibold tracking-wider text-teal-300">
            컨텍스트 윈도우 (6 토큰)
          </div>
          <div className="flex items-center gap-3 text-xl">
            <AnimatePresence mode="popLayout" initial={false}>
              {windowIndices.map((idx) => (
                <motion.span
                  key={idx}
                  layoutId={`tok-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -28, filter: "blur(3px)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={`whitespace-pre ${tokenColor(ALL_TOKENS[idx])}`}
                >
                  {ALL_TOKENS[idx]}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: showArrow ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ArrowRight className="h-6 w-12 text-sky-400" />
        </motion.div>

        <div className="flex min-w-[140px] items-center justify-start text-xl">
          {showOutput && (
            <motion.span
              key={outputIndex}
              layoutId={`tok-${outputIndex}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={`whitespace-pre ${tokenColor(ALL_TOKENS[outputIndex])}`}
            >
              {ALL_TOKENS[outputIndex]}
            </motion.span>
          )}
        </div>
      </div>
    </SlideLayout>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 20" className={className}>
      <line
        x1={2}
        y1={10}
        x2={40}
        y2={10}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <polygon points="46,10 36,5 36,15" fill="currentColor" />
    </svg>
  );
}
