const IconSearch = ({
  className = "w-5 h-5 text-[var(--color-text-secondary)]",
}) => {
  // Không cần khai báo color hay strokeWidth trong JS nữa
  return (
    <svg
      className={className}
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor" // stroke lấy màu hiện tại của text
      strokeWidth={2} // strokeWidth cố định
    >
      <path d="M11.3416 19.2502C16.1511 19.2502 20.05 15.3513 20.05 10.5418C20.05 5.73235 16.1511 1.8335 11.3416 1.8335C6.53215 1.8335 2.6333 5.73235 2.6333 10.5418C2.6333 15.3513 6.53215 19.2502 11.3416 19.2502Z" />
      <path d="M20.9666 20.1668L19.1333 18.3335" />
    </svg>
  );
};

export default IconSearch;
