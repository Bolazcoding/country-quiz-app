function Header({ points, maxPossiblePoints, status }) {
  return (
    <header className="flex justify-between">
      <h1 className="text-text-primary font-semibold text-[1.7rem] max-[510px]:text-2xl">
        Country Quiz
      </h1>
      {status === "active" && (
        <button className="btn rounded-full px-4 text-[1rem] font-semibold max-[510px]:text-[0.8rem] max-[510px]:px-3">
          🏅 {points} / {maxPossiblePoints} points
        </button>
      )}
    </header>
  );
}

export default Header;
