import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

const steps = [
  {
    text: "현재 에이전트는 더 오랫동안 동작하며, 더 많은 툴을 사용하도록 발전하고 있다.",
  },
  {
    text: "그러면 컨텍스트가 길어질 수밖에 없는데, 앞의 여러 이유로 LLM은 긴 컨텍스트에 취약하다.",
  },
  {
    text: "그래서 컨텍스트를 효과적으로 제어하는 것이 좋은 성능의 에이전트를 만드는 데에 아주 중요하다.",
    emphasize: true,
  },
];

const STEP_DELAY = 0.35;
const ARROW_DELAY = 0.25;

function DownTriangle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      aria-hidden
    >
      <svg width="28" height="22" viewBox="0 0 28 22">
        <polygon points="14,22 0,0 28,0" fill="#a78bfa" opacity="0.85" />
      </svg>
    </motion.div>
  );
}

export function ContextMattersSlide() {
  return (
    <SlideLayout title="그래서 컨텍스트를 잘 구성하는게 중요합니다">
      <div className="flex w-full max-w-5xl flex-col gap-3">
        {steps.map((step, i) => {
          const cardDelay = 0.2 + i * (STEP_DELAY + ARROW_DELAY);
          const arrowDelay = cardDelay + STEP_DELAY;
          return (
            <div key={step.text}>
              <motion.div
                className={
                  step.emphasize
                    ? "rounded-2xl border border-violet-400/60 bg-violet-500/10 px-8 py-6 shadow-[0_0_40px_-12px_rgba(167,139,250,0.6)]"
                    : "rounded-2xl border border-white/10 bg-white/5 px-8 py-6"
                }
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: cardDelay,
                  ease: "easeOut",
                }}
              >
                <p
                  className={
                    step.emphasize
                      ? "text-center text-2xl font-medium leading-snug text-neutral-50"
                      : "text-center text-2xl leading-snug text-neutral-200"
                  }
                >
                  {step.text}
                </p>
              </motion.div>
              {i < steps.length - 1 && <DownTriangle delay={arrowDelay} />}
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
}
