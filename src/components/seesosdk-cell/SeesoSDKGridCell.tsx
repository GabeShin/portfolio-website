import LargeGridButton from "@/components/button/LargeGridButton";
import Image from "next/image";

export default function SeesoSDKGridCell() {
  const goToSeesoLabs = () => {
    window.open("https://www.seeso.io");
  };
  return (
    <div className="grid-cell seeso-sdk-theme relative h-full w-full p-6 overflow-hidden">
      <Image
        className="rotate-[-20deg] rounded-xl ring-border ring-2 absolute top-[20%] max-w-[200%]"
        src="/seeso-sdk-web.jpeg"
        width={400}
        height={400}
        alt="Seeso SDK"
      />
      <div className="bottom-0 left-0 absolute p-4">
        <LargeGridButton text="Seeso SDK" onClick={goToSeesoLabs} />
      </div>
    </div>
  );
}
