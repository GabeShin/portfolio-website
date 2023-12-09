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
        rounded-lg
        transition-colors 
        duration-300 
        ease-in-out 
        hover:bg-gray-200 
        hover:text-white 
        active:bg-gray-400 
        active:text-white
      "
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current text-gray-500"
      >
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
      </svg>
    </button>
  );
}
