import type { ComponentType } from "react";
import { TitleSlide } from "./TitleSlide";
import { PromptHypeSlide } from "./PromptHypeSlide";
import { OutdatedQuestionSlide } from "./OutdatedQuestionSlide";
import { NotOutdatedSlide } from "./NotOutdatedSlide";
import { GuidelinesSlide } from "./GuidelinesSlide";
import { TechniquesSlide } from "./TechniquesSlide";
import { CoaxingFailSlide } from "./CoaxingFailSlide";
import { CoaxingLLMSlide } from "./CoaxingLLMSlide";
import { GrowingLLMSlide } from "./GrowingLLMSlide";
import { SystemBrainSlide } from "./SystemBrainSlide";
import { ContextEngineeringSlide } from "./ContextEngineeringSlide";
import { WhatIsContextSlide } from "./WhatIsContextSlide";
import { UserVsSystemSlide } from "./UserVsSystemSlide";
import { SystemPromptRevealSlide } from "./SystemPromptRevealSlide";
import { CodexSystemPromptSlide } from "./CodexSystemPromptSlide";
import { PromptIsContextSlide } from "./PromptIsContextSlide";
import { LLMPrincipleSlide } from "./LLMPrincipleSlide";
import { NextTokenPredictorSlide } from "./NextTokenPredictorSlide";
import { TokenGenerationSlide } from "./TokenGenerationSlide";
import { ContextEqualsInputSlide } from "./ContextEqualsInputSlide";
import { ContextWindowSlide } from "./ContextWindowSlide";
import { ContextWindowSizesSlide } from "./ContextWindowSizesSlide";
import { ContextExpansionSlide } from "./ContextExpansionSlide";
import { WiderContextSlide } from "./WiderContextSlide";
import { ContextDumpSlide } from "./ContextDumpSlide";
import { ContextRotSlide } from "./ContextRotSlide";
import { InstructionFollowingSlide } from "./InstructionFollowingSlide";
import { TokenCostSlide } from "./TokenCostSlide";
import { ContextIsEverythingSlide } from "./ContextIsEverythingSlide";

export const slides: ComponentType[] = [
  TitleSlide,
  PromptHypeSlide,
  GuidelinesSlide,
  TechniquesSlide,
  CoaxingFailSlide,
  CoaxingLLMSlide,
  GrowingLLMSlide,
  SystemBrainSlide,
  ContextEngineeringSlide,
  WhatIsContextSlide,
  LLMPrincipleSlide,
  NextTokenPredictorSlide,
  TokenGenerationSlide,
  ContextEqualsInputSlide,
  ContextWindowSlide,
  ContextWindowSizesSlide,
  ContextExpansionSlide,
  WiderContextSlide,
  ContextDumpSlide,
  ContextRotSlide,
  InstructionFollowingSlide,
  TokenCostSlide,

  // 이 아래부터는 outdated slides. 나중에 쓸 수도 있으니 일단 킵함
  PromptIsContextSlide,
  OutdatedQuestionSlide,
  NotOutdatedSlide,
  UserVsSystemSlide,
  SystemPromptRevealSlide,
  CodexSystemPromptSlide,
  ContextIsEverythingSlide,
];
