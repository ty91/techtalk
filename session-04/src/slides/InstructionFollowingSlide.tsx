import { motion } from "motion/react";
import { SlideLayout } from "./SlideLayout";

export function InstructionFollowingSlide() {
  return (
    <SlideLayout
      title="문제 하나 더 - 지침 준수율 감소"
      subtitle="지침이 너무 많으면 지침 준수율이 떨어져요"
    >
      <motion.img
        src="/images/instructionfollowing.png"
        alt="Instruction Following"
        className="max-h-[62vh] w-auto max-w-5xl rounded-xl"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </SlideLayout>
  );
}
