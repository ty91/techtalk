import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Highlight = "A" | "B";

type Segment = { text: string; highlight?: Highlight };

const SHARED_PREFIX =
  '친구가 어제 새 차를 샀다고 자랑했다. 나는 "축하해"라고 말했다. ';
const SHARED_SUFFIX = " 내 마음은";

const ROW_A: Segment[] = [
  { text: SHARED_PREFIX },
  { text: "사실", highlight: "A" },
  { text: SHARED_SUFFIX },
];
const OUTPUT_A = "조금 부러웠고, 한편으로는 씁쓸했다.";

const ROW_B: Segment[] = [
  { text: SHARED_PREFIX },
  { text: "진심으로", highlight: "B" },
  { text: SHARED_SUFFIX },
];
const OUTPUT_B = "따뜻하게 벅차올랐다.";

const HIGHLIGHT_STYLE: Record<Highlight, string> = {
  A: "rounded bg-amber-500/25 px-1.5 font-semibold text-amber-200",
  B: "rounded bg-sky-500/25 px-1.5 font-semibold text-sky-200",
};

function Arrow({ delay }: { delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 48 20"
      className="h-5 w-12 shrink-0 text-violet-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
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
    </motion.svg>
  );
}

const ARROW_DELAY_S = 0.55;
const OUTPUT_DELAY_S = 0.9;

function ContextRow({
  segments,
  output,
  startDelay,
}: {
  segments: Segment[];
  output: string;
  startDelay: number;
}) {
  return (
    <div className="flex items-center gap-5">
      <motion.div
        className="relative max-w-2xl flex-1 rounded-2xl border border-emerald-400/40 bg-emerald-400/5 px-6 py-5 pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: startDelay }}
      >
        <span className="absolute -top-3 left-4 bg-neutral-950 px-2 font-mono text-xs font-medium tracking-wide text-emerald-300">
          CONTEXT
        </span>
        <p className="text-lg leading-relaxed text-neutral-100">
          {segments.map((s, i) =>
            s.highlight ? (
              <span key={i} className={HIGHLIGHT_STYLE[s.highlight]}>
                {s.text}
              </span>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </p>
      </motion.div>

      <Arrow delay={startDelay + ARROW_DELAY_S} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: startDelay + OUTPUT_DELAY_S }}
        className="max-w-xs rounded-xl border border-violet-400/50 bg-violet-500/15 px-4 py-3 text-base leading-relaxed text-violet-100"
      >
        {output}
      </motion.div>
    </div>
  );
}

export function ContextIsEverythingSlide() {
  return (
    <SlideLayout
      title="LLM에겐 컨텍스트가 전부입니다"
      subtitle={
        "LLM은 다음 토큰 예측 기계니까, 컨텍스트가 매우 중요합니다.\n왜냐하면, 앞 토큰의 배치가 다음 출력을 오롯이 결정하기 때문이죠."
      }
    >
      <div className="flex w-full max-w-5xl flex-col gap-8">
        <ContextRow segments={ROW_A} output={OUTPUT_A} startDelay={0.4} />
        <ContextRow segments={ROW_B} output={OUTPUT_B} startDelay={2.0} />
      </div>
    </SlideLayout>
  );
}
