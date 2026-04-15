import { SlideLayout } from "./SlideLayout";
import mrcrImage from "../assets/mrcr.png";

export function MrcrSlide() {
  return (
    <SlideLayout title="1백만 토큰 컨텍스트라도 정말 끝까지 다 쓸 순 없다">
      <img
        src={mrcrImage}
        alt="MRCR benchmark"
        className="max-h-[70vh] w-auto max-w-full rounded-xl border border-white/10"
      />
    </SlideLayout>
  );
}
