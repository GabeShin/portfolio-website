import LargeGridButton from "@/components/button/LargeGridButton";
import { useRouter } from "next/navigation";

export default function AboutMeGridCell() {
  const router = useRouter();

  return (
    <div className="grid-cell relative h-full w-full p-6">
      <h1>About / CV</h1>
      <p>Read about me, or view the formal CV & resume.</p>
      <div className="bottom-0 left-0 absolute p-4 flex gap-2">
        <LargeGridButton text="About" onClick={() => router.push("/about")} />
        <LargeGridButton text="CV" onClick={() => router.push("/cv")} />
      </div>
    </div>
  );
}
