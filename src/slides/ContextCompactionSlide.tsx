import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Turn = { user: string; agent: string };

const TURNS: Turn[] = [
  {
    user: "4월 17일 제주도 펜션 예약 취소하고 싶어",
    agent:
      "네, 4월 17일 제주 ABCD 펜션 예약을 확인했어요. 환불 정책을 안내드릴까요?",
  },
  {
    user: "응, 환불은 얼마나 돼?",
    agent:
      "예약일 3일 전이라 80% 환불 가능해요. 총 320,000원 중 256,000원이 환불됩니다.",
  },
  {
    user: "위약금이나 다른 수수료도 있어?",
    agent:
      "예약 당시 안내된 20% 위약금 외에 별도 수수료는 없어요.",
  },
  {
    user: "카드로 결제했는데 언제 들어와?",
    agent: "카드 환불은 영업일 기준 3~5일이 소요됩니다.",
  },
  {
    user: "영수증도 받을 수 있어?",
    agent: "네, 환불 완료 후 이메일로 영수증을 발송해드릴게요.",
  },
  {
    user: "좋아, 그럼 취소 진행해줘",
    agent:
      "취소 처리를 시작할게요. 환불 접수 완료 메일이 곧 발송될 예정입니다.",
  },
  {
    user: "오케이 고마워",
    agent: "도움이 더 필요하시면 언제든 말씀해주세요. 좋은 하루 보내세요!",
  },
];

const SUMMARY =
  "제주 ABCD 펜션(4/17) 예약 취소 요청. 환불 80% / 256,000원(원금 320,000원), 예약 당시 고지된 20% 위약금 외 별도 수수료 없음. 카드 환불은 영업일 기준 3~5일 소요 안내 완료.";

const TIMELINE = [
  700, //   1: u0
  1500, //  2: a0
  2300, //  3: u1
  3100, //  4: a1
  3900, //  5: u2
  4700, //  6: a2
  5500, //  7: u3
  6300, //  8: a3
  7400, //  9: u4 (영수증도? — compaction trigger)
  8700, // 10: compacting banner on
  10000, // 11: compaction — all prior bubbles exit, summary enters (banner stays)
  11200, // 12: banner exits (summary alone)
  12600, // 13: u4 re-reveals (1.4s after summary settles)
  13800, // 14: a4 (new agent reply)
  14900, // 15: u5 (follow-up 1)
  15900, // 16: a5
  17000, // 17: u6 (follow-up 2)
  18000, // 18: a6
];

type BubbleProps = { role: "user" | "agent"; text: string };

function Bubble({ role, text }: BubbleProps) {
  const isUser = role === "user";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[82%] px-3.5 py-2 shadow-sm ${
          isUser
            ? "rounded-2xl rounded-bl-sm border border-rose-400/50 bg-rose-500/15"
            : "rounded-2xl rounded-br-sm border border-neutral-500/40 bg-neutral-700/30"
        }`}
      >
        <div
          className={`mb-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
            isUser ? "text-rose-300" : "text-neutral-400"
          }`}
        >
          {isUser ? "USER" : "AGENT"}
        </div>
        <div
          className={`text-[14px] leading-snug ${
            isUser ? "text-rose-50" : "text-neutral-100"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function SummaryCard() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-xl border-2 border-yellow-400/60 bg-yellow-500/10 px-3.5 py-2.5 shadow-sm"
    >
      <div className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-yellow-300">
        HISTORY (요약)
      </div>
      <div className="text-[14px] leading-snug text-yellow-50">{SUMMARY}</div>
    </motion.div>
  );
}

function CompactingBanner() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-2 rounded-lg border border-violet-400/50 bg-violet-500/15 py-2"
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block h-3 w-3 rounded-full border-2 border-violet-300 border-t-transparent"
      />
      <span className="font-mono text-[12px] font-semibold uppercase tracking-wider text-violet-200">
        Compacting history...
      </span>
    </motion.div>
  );
}

export function ContextCompactionSlide() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = TIMELINE.map((ms, i) =>
      window.setTimeout(() => setStep(i + 1), ms),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const oldTurnsVisible = step >= 1 && step <= 10;
  const t4uVisible = step >= 7 && step <= 10;
  const t4aVisible = step >= 8 && step <= 10;
  const t5uVisible = (step >= 9 && step <= 10) || step >= 13;
  const bannerVisible = step >= 10 && step <= 11;
  const summaryVisible = step >= 11;
  const t5aVisible = step >= 14;
  const t6uVisible = step >= 15;
  const t6aVisible = step >= 16;
  const t7uVisible = step >= 17;
  const t7aVisible = step >= 18;

  return (
    <SlideLayout
      title="압축"
      subtitle="대화가 너무 길어지면 핵심만 요약해서 남기는 것도 필요해요"
    >
      <div
        className="relative rounded-3xl border border-neutral-500/40 bg-neutral-400/5 px-6 py-6"
        style={{ width: 640 }}
      >
        <div className="absolute -top-3 left-5 rounded-full bg-neutral-950 px-3 font-mono text-xs font-medium tracking-wide text-neutral-300">
          CONTEXT
        </div>

        <motion.div layout className="flex flex-col gap-2">
          <AnimatePresence>
            {oldTurnsVisible && step >= 1 && (
              <Bubble key="u0" role="user" text={TURNS[0].user} />
            )}
            {oldTurnsVisible && step >= 2 && (
              <Bubble key="a0" role="agent" text={TURNS[0].agent} />
            )}
            {oldTurnsVisible && step >= 3 && (
              <Bubble key="u1" role="user" text={TURNS[1].user} />
            )}
            {oldTurnsVisible && step >= 4 && (
              <Bubble key="a1" role="agent" text={TURNS[1].agent} />
            )}
            {oldTurnsVisible && step >= 5 && (
              <Bubble key="u2" role="user" text={TURNS[2].user} />
            )}
            {oldTurnsVisible && step >= 6 && (
              <Bubble key="a2" role="agent" text={TURNS[2].agent} />
            )}
            {summaryVisible && <SummaryCard key="summary" />}
            {t4uVisible && <Bubble key="u3" role="user" text={TURNS[3].user} />}
            {t4aVisible && (
              <Bubble key="a3" role="agent" text={TURNS[3].agent} />
            )}
            {t5uVisible && <Bubble key="u4" role="user" text={TURNS[4].user} />}
            {bannerVisible && <CompactingBanner key="compacting" />}
            {t5aVisible && (
              <Bubble key="a4" role="agent" text={TURNS[4].agent} />
            )}
            {t6uVisible && <Bubble key="u5" role="user" text={TURNS[5].user} />}
            {t6aVisible && (
              <Bubble key="a5" role="agent" text={TURNS[5].agent} />
            )}
            {t7uVisible && <Bubble key="u6" role="user" text={TURNS[6].user} />}
            {t7aVisible && (
              <Bubble key="a6" role="agent" text={TURNS[6].agent} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
