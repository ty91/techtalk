import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

export function TokenCostSlide() {
  return (
    <SlideLayout
      title="💸 문제도 있어요"
      subtitle="컨텍스트=입력. 컨텍스트가 커지면 입력 토큰 비용이 그만큼 커져요."
    >
      <motion.img
        src="/images/claude-token-pricing.png"
        alt="Claude Token Pricing"
        className="max-h-[62vh] w-auto max-w-5xl rounded-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </SlideLayout>
  );
}
