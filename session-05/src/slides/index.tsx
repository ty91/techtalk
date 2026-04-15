import type { ComponentType } from "react";
import { TitleSlide } from "./TitleSlide";
import { ContextManagementSlide } from "./ContextManagementSlide";
import { MrcrSlide } from "./MrcrSlide";
import { ContextFillingSlide } from "./ContextFillingSlide";
import { SolutionQuestionSlide } from "./SolutionQuestionSlide";
import { CurationSolutionSlide } from "./CurationSolutionSlide";
import { WebFetchExampleSlide } from "./WebFetchExampleSlide";
import { HtmlHellSlide } from "./HtmlHellSlide";
import { WebFetchFlowSlide } from "./WebFetchFlowSlide";
import { SmarterWebFetchSlide } from "./SmarterWebFetchSlide";
import { AgenticReadSlide } from "./AgenticReadSlide";
import { ExploreDelegationSlide } from "./ExploreDelegationSlide";
import { ExploreSubagentSlide } from "./ExploreSubagentSlide";

export const slides: ComponentType[] = [
  TitleSlide,
  ContextManagementSlide,
  MrcrSlide,
  ContextFillingSlide,
  SolutionQuestionSlide,
  CurationSolutionSlide,
  WebFetchExampleSlide,
  HtmlHellSlide,
  WebFetchFlowSlide,
  SmarterWebFetchSlide,
  AgenticReadSlide,
  ExploreDelegationSlide,
  ExploreSubagentSlide,
];
