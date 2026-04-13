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
import { WiderContextSlide } from "./WiderContextSlide";
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
  WiderContextSlide,
  PromptIsContextSlide,
  OutdatedQuestionSlide,
  NotOutdatedSlide,
  UserVsSystemSlide,
  SystemPromptRevealSlide,
  CodexSystemPromptSlide,
  ContextIsEverythingSlide,
];
