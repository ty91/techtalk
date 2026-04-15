import { motion } from "motion/react";

export function SolutionQuestionSlide() {
  return (
    <div className="flex h-full w-full items-center justify-center px-12 text-center">
      <motion.h2
        className="text-6xl font-semibold leading-tight tracking-tight text-neutral-50"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        이런 작업들을 안 할 수는 없다면,{" "}
        <span className="text-emerald-300">해결책은?</span>
      </motion.h2>
    </div>
  );
}
