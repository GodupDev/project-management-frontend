const IconHome = ({ className = "w-5 h-5" }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75A1.5 1.5 0 006 21.75h3a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5c0 .414.336.75.75.75h3a1.5 1.5 0 001.5-1.5V10.5"
      />
    </svg>
  );
};

export default IconHome;
