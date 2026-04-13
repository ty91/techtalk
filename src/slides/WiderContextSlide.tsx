import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-1.5 rounded-full bg-white/25"
          style={{ width: w }}
        />
      ))}
    </div>
  );
}

type Role = "SYSTEM" | "USER" | "ASSISTANT";

type Block = {
  role: Role;
  align: "start" | "end";
  width: string;
  body: ReactNode;
};

const ASSISTANT_TEXT =
  "LLM은 지금까지 주어진 토큰 시퀀스를 바탕으로, 다음에 올 토큰의 확률 분포를 계산합니다. 그 분포에서 토큰을 하나 뽑고, 뽑힌 토큰을 다시 입력에 이어 붙여 또 다음 토큰을 예측하는 과정을 반복하죠. 즉, 주어진 컨텍스트 위에 가장 그럴듯한 다음 토큰을 계속 이어 붙이는 기계라고 할 수 있습니다.";

const FOLLOWUP_USER = "그 '확률 분포'는 어떻게 정해져?";

const FOLLOWUP_ASSISTANT =
  "사전 학습 단계에서 방대한 텍스트로부터 만들어진 모델 가중치가 다음 토큰의 분포를 결정합니다. 같은 컨텍스트를 주더라도 모델이 다르면 분포는 다르게 나오죠.";

const blocks: Block[] = [
  {
    role: "SYSTEM",
    align: "start",
    width: "58%",
    body: <Lines widths={["100%", "92%", "78%"]} />,
  },
  {
    role: "USER",
    align: "start",
    width: "60%",
    body: "LLM의 원리에 대해 설명해줘",
  },
  {
    role: "ASSISTANT",
    align: "end",
    width: "72%",
    body: ASSISTANT_TEXT,
  },
  {
    role: "USER",
    align: "start",
    width: "60%",
    body: FOLLOWUP_USER,
  },
  {
    role: "ASSISTANT",
    align: "end",
    width: "72%",
    body: FOLLOWUP_ASSISTANT,
  },
];

const ROLE_COLOR: Record<Role, string> = {
  SYSTEM: "text-amber-300",
  USER: "text-sky-300",
  ASSISTANT: "text-violet-300",
};

const INITIAL_HOLD_MS = 200;
const STEP_DELAY_MS = 1100;
const ASSISTANT_DELAY_MS = 1800;

export function WiderContextSlide() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step >= blocks.length) return;
    const nextRole = blocks[step].role;
    const base = nextRole === "ASSISTANT" ? ASSISTANT_DELAY_MS : STEP_DELAY_MS;
    const delay = step === 1 ? INITIAL_HOLD_MS + base : base;
    const t = window.setTimeout(() => setStep((s) => s + 1), delay);
    return () => window.clearTimeout(t);
  }, [step]);

  return (
    <SlideLayout
      title="'컨텍스트'의 의미를 넓혀봅시다"
      subtitle={"컨텍스트는, LLM이 답을 생성하기 위해 입력받은 모든 정보"}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="relative w-full max-w-4xl rounded-3xl border border-emerald-400/40 bg-emerald-400/5 p-8 pt-10"
      >
        <div className="absolute -top-3 left-6 rounded-full bg-neutral-950 px-3 font-mono text-sm font-medium tracking-wide text-emerald-300">
          CONTEXT
        </div>

        <motion.div layout className="flex flex-col gap-4">
          {blocks.slice(0, step).map((b, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border border-white/15 bg-white/5 p-4 ${
                b.align === "start" ? "self-start" : "self-end"
              }`}
              style={{ width: b.width }}
            >
              <div
                className={`mb-2 font-mono text-sm font-medium tracking-wide ${ROLE_COLOR[b.role]}`}
              >
                {b.role}:
              </div>
              {typeof b.body === "string" ? (
                <p className="text-base leading-relaxed text-neutral-100">
                  {b.body}
                </p>
              ) : (
                b.body
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SlideLayout>
  );
}
