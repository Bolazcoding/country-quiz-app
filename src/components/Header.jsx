function Header({ points, maxPossiblePoints, status }) {
  return (
    <header className="flex justify-between">
      <h1 className="text-text-primary font-semibold text-2xl">Country Quiz</h1>
      {status === "active" && (
        <button className="btn rounded-full px-5">
          {points} / {maxPossiblePoints} points
        </button>
      )}
    </header>
  );
}

export default Header;
