import type { ComponentType } from 'react'
import { TitleSlide } from './TitleSlide'
import { PromptHypeSlide } from './PromptHypeSlide'
import { OutdatedQuestionSlide } from './OutdatedQuestionSlide'
import { NotOutdatedSlide } from './NotOutdatedSlide'
import { GuidelinesSlide } from './GuidelinesSlide'
import { TechniquesSlide } from './TechniquesSlide'
import { UserVsSystemSlide } from './UserVsSystemSlide'
import { SystemPromptRevealSlide } from './SystemPromptRevealSlide'
import { CodexSystemPromptSlide } from './CodexSystemPromptSlide'
import { PromptIsContextSlide } from './PromptIsContextSlide'
import { LLMPrincipleSlide } from './LLMPrincipleSlide'
import { NextTokenPredictorSlide } from './NextTokenPredictorSlide'

export const slides: ComponentType[] = [
  TitleSlide,
  PromptHypeSlide,
  GuidelinesSlide,
  TechniquesSlide,
  UserVsSystemSlide,
  SystemPromptRevealSlide,
  CodexSystemPromptSlide,
  OutdatedQuestionSlide,
  NotOutdatedSlide,
  PromptIsContextSlide,
  LLMPrincipleSlide,
  NextTokenPredictorSlide,
]
