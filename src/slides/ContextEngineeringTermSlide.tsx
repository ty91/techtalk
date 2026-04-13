import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

type Tweet = {
  name: string;
  handle: string;
  role: string;
  lines: (string | { type: "ellipsis" })[];
};

const tweets: Tweet[] = [
  {
    name: "Tobi Lutke",
    handle: "@tobi",
    role: "Shopify CEO",
    lines: [
      "저는 'prompt engineering'보다 'context engineering'이라는 용어가 훨씬 마음에 들어요.",
      "핵심 역량을 더 잘 설명해주거든요: LLM이 주어진 작업을 그럴듯하게 풀 수 있도록 필요한 모든 컨텍스트를 제공하는 기술이죠.",
    ],
  },
  {
    name: "Andrej Karpathy",
    handle: "@karpathy",
    role: "OpenAI 창립 멤버, 전 Tesla AI 디렉터",
    lines: [
      "'prompt engineering'보다 'context engineering'에 +1.",
      { type: "ellipsis" },
      "실제 산업 수준의 LLM 앱에서 컨텍스트 엔지니어링이란, 다음 단계에 딱 맞는 정보로 컨텍스트 윈도우를 채우는 섬세한 예술이자 과학이죠.",
      { type: "ellipsis" },
    ],
  },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ContextEngineeringTermSlide() {
  return (
    <SlideLayout
      title="컨텍스트 엔지니어링이라는 용어의 등장"
      subtitle="2025년 6월 즈음, 업계에서 컨텍스트를 엔지니어링해야 한다는 개념이 수면 위로 올라오기 시작했어요."
    >
      <div className="grid w-full max-w-6xl grid-cols-2 gap-6">
        {tweets.map((tweet, i) => (
          <motion.article
            key={tweet.handle}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-7 py-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + i * 0.2, ease: "easeOut" }}
          >
            <header className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 text-neutral-100">
                <XIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-neutral-50">
                    {tweet.name}
                  </span>
                  <span className="text-sm text-neutral-500">
                    {tweet.handle}
                  </span>
                </div>
                <span className="text-sm text-neutral-400">{tweet.role}</span>
              </div>
            </header>
            <div className="mt-5 space-y-3 text-lg leading-relaxed text-neutral-100">
              {tweet.lines.map((line, j) =>
                typeof line === "string" ? (
                  <p key={j}>{line}</p>
                ) : (
                  <p key={j} className="text-neutral-500">
                    ...
                  </p>
                )
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </SlideLayout>
  );
}
