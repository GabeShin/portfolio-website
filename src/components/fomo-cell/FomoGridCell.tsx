import LargeGridButton from "../button/LargeGridButton";
import Image from "next/image";

export default function FomoGridCell() {
  const goToFomo = () => {
    window.open("https://www.fomoapp.co.kr");
  };
  return (
    <div className="grid-cell fomo-theme relative h-full w-full overflow-hidden p-6">
      <Image
        className="rotate-[20deg] rounded-xl ring-border ring-2 top-[20%] left-[10%] absolute max-w-[200%]"
        src="/fomo-screenshot.png"
        width={400}
        height={400}
        alt="Seeso SDK"
      />
      <div className="bottom-0 left-0 absolute p-4">
        <LargeGridButton text="FOMO App" onClick={goToFomo} />
      </div>
    </div>
  );
}
