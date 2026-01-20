function FinishQuiz({ points, maxPossiblePoints, dispatch }) {
  //   const percentage = (points / maxPossiblePoints) * 100;

  return (
    <div className=" flex flex-col items-center justify-center text-center mb-6">
      <img src="/images/congrats.png" alt="successImage" className="w-58" />
      <h3 className="text-text-primary text-2xl font-semibold mt-2">
        Congrats! You completed the quiz.
      </h3>
      <p className="text-text-primary text-[1.1rem] mt-2">
        You scored <strong>{points}</strong> out of{" "}
        <strong>{maxPossiblePoints}</strong> points correctly
      </p>
      <div className="text-center mt-5">
        <button
          className="btn px-10 py-2 rounded"
          onClick={() => dispatch({ type: "playAgain" })}
        >
          Play again
        </button>
      </div>
    </div>
  );
}

export default FinishQuiz;
