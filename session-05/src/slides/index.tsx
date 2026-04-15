import type { ComponentType } from "react";
import { TitleSlide } from "./TitleSlide";
import { ContextManagementSlide } from "./ContextManagementSlide";
import { MrcrSlide } from "./MrcrSlide";
import { ContextFillingSlide } from "./ContextFillingSlide";
import { SolutionQuestionSlide } from "./SolutionQuestionSlide";
import { CurationSolutionSlide } from "./CurationSolutionSlide";

export const slides: ComponentType[] = [
  TitleSlide,
  ContextManagementSlide,
  MrcrSlide,
  ContextFillingSlide,
  SolutionQuestionSlide,
  CurationSolutionSlide,
];
