import LargeGridButton from "@/components/button/LargeGridButton";
import Image from "next/image";

export default function SeesoLabsGridCell() {
  const goToSeesoLabs = () => {
    window.open("https://www.seesolabs.com");
  };
  return (
    <div className="grid-cell seesolabs-theme relative h-full w-full p-6 overflow-hidden">
      <Image
        className="absolute rotate-[-20deg] rounded-xl ring-border ring-2 top-[5%] left-0 max-w-[135%]"
        src="/labs-gaze.png"
        alt="Seeso Labs"
        width={300}
        height={400}
      />
      <div className="bottom-0 left-0 absolute p-4">
        <LargeGridButton text="Seeso Labs" onClick={goToSeesoLabs} />
      </div>
    </div>
  );
}
