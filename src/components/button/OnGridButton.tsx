import ArrowLogo from "./ArrowIcon";

type PropsType = { text: string; onClick: () => void; invert?: boolean };

export default function OnGridButton({ text, onClick }: PropsType) {
  return (
    <button
      className="group relative h-8 w-8 rounded-full border-2 border-border transition-all duration-300 hover:w-24"
      onClick={onClick}
    >
      <p className="left-2px absolute left-3 -translate-y-1/2 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 group-hover:delay-300">
        {text}
      </p>
      <div className="absolute right-[2px] top-[50%] -translate-y-1/2">
        <ArrowLogo width={24} height={24} color="#ffffff" />
      </div>
    </button>
  );
}
