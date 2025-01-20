interface CheckMarkProps {
  checked: boolean;
}

export function CheckMark({ checked }: CheckMarkProps) {
  return (
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full ${
        checked ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {checked ? (
        <svg
          className="h-4 w-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M20 6L9 17l-5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <div className="h-4 w-4 rounded-full border-2 border-white" />
      )}
    </div>
  );
}
