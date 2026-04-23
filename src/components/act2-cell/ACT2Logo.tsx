type Props = { size?: number };

export default function ACT2Logo({ size = 52 }: Props) {
  return (
    <div
      className="whitespace-nowrap font-extrabold leading-none tracking-tight"
      style={{ fontSize: `${size}px` }}
    >
      <span className="text-white">ACT-</span>
      <span style={{ color: "#4ade80" }}>2</span>
    </div>
  );
}
