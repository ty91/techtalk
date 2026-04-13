import type { ComponentType } from 'react'
import { TitleSlide } from './TitleSlide'
import { PromptHypeSlide } from './PromptHypeSlide'
import { GuidelinesSlide } from './GuidelinesSlide'
import { TechniquesSlide } from './TechniquesSlide'
import { UserVsSystemSlide } from './UserVsSystemSlide'
import { SystemPromptRevealSlide } from './SystemPromptRevealSlide'
import { CodexSystemPromptSlide } from './CodexSystemPromptSlide'

export const slides: ComponentType[] = [
  TitleSlide,
  PromptHypeSlide,
  GuidelinesSlide,
  TechniquesSlide,
  UserVsSystemSlide,
  SystemPromptRevealSlide,
  CodexSystemPromptSlide,
]
