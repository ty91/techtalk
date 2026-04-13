import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

export function ContextRotSlide() {
  return (
    <SlideLayout
      title="한 가지 문제 - Context Rot"
      subtitle="컨텍스트의 내용이 길어지면 LLM의 응답 정확도가 급격히 떨어져요"
    >
      <motion.img
        src="/images/context-rot.png"
        alt="Context Rot"
        className="max-h-[62vh] w-auto max-w-5xl rounded-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </SlideLayout>
  );
}
