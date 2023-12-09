interface PropTypes {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SendButton({ onClick }: PropTypes) {
  return (
    <button
      onClick={onClick}
      className="
        ml-2 
        p-2
        rounded-full
        transition-colors 
        duration-300 
        ease-in-out
        bg-blue-500
        text-white
        hover:bg-blue-600 
        active:bg-blue-400 
      "
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current text-white -rotate-45 -translate-y-0.5 translate-x-0.5"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
      </svg>
    </button>
  );
}
