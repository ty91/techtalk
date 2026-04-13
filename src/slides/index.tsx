import type { ComponentType } from 'react'
import { TitleSlide } from './TitleSlide'
import { PromptHypeSlide } from './PromptHypeSlide'
import { GuidelinesSlide } from './GuidelinesSlide'
import { TechniquesSlide } from './TechniquesSlide'
import { UserVsSystemSlide } from './UserVsSystemSlide'

export const slides: ComponentType[] = [
  TitleSlide,
  PromptHypeSlide,
  GuidelinesSlide,
  TechniquesSlide,
  UserVsSystemSlide,
]
