import type { ComponentType } from "react";
import { TitleSlide } from "./TitleSlide";
import { BulletsSlide } from "./BulletsSlide";
import { DiagramSlide } from "./DiagramSlide";

export const slides: ComponentType[] = [
  TitleSlide,
  BulletsSlide,
  DiagramSlide,
];
