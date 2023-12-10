import LargeGridButton from "../button/LargeGridButton";
import { useRouter } from "next/navigation";

export default function AboutMeGridCell() {
  const router = useRouter();
  const goToAboutMe = () => {
    router.push("/about");
  };

  return (
    <div className="grid-cell relative h-full w-full p-6">
      <h1>About Me</h1>
      <p> Read and learn more about me.</p>
      <div className="bottom-0 left-0 absolute p-4">
        <LargeGridButton text="Read More" onClick={goToAboutMe} />
      </div>
      <p className="bottom-0 right-0 text-sm text-subtext absolute m-4 p-2">
        December 10th, 2023
      </p>
    </div>
  );
}
