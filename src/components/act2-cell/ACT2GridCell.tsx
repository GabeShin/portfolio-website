"use client";

import ACT2Logo from "./ACT2Logo";
import OnGridButton from "@/components/button/OnGridButton";

export default function ACT2GridCell() {
  const goToACT2 = () => {
    window.open("https://act-2.enhans.ai/ko");
  };

  return (
    <div className="act2-theme grid-cell relative h-full w-full overflow-hidden">
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2">
        <ACT2Logo size={36} />
      </div>
      <div className="absolute bottom-2 left-2">
        <OnGridButton text={"Try ACT-2"} onClick={goToACT2} />
      </div>
    </div>
  );
}
