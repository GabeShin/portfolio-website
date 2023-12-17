type Props = {
  width: number;
  height: number;
  color: string;
};

export default function SpinnerIcon({ width, height, color }: Props) {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M8,1V2.8A5.2,5.2,0,1,1,2.8,8H1A7,7,0,1,0,8,1Z" />
      </g>
    </svg>
  );
}
