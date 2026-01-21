function Options({ question, dispatch, answerPicked }) {
  const hasAnswered = answerPicked !== null;

  function handleAnswer(OptionSelected) {
    dispatch({ type: "newAnswer", payload: OptionSelected });
  }

  return (
    <div className="grid grid-cols-2 gap-4 mt-5 max-[510px]:grid-cols-1">
      {question.options.map((option) => (
        <button
          className={`btnOption ${
            hasAnswered &&
            option === answerPicked &&
            answerPicked !== question.answer &&
            `bg-accent-tertiary`
          }`}
          key={option}
          onClick={() => handleAnswer(option)}
          disabled={answerPicked !== null}
        >
          <span>{option}</span>
          {hasAnswered && option === question.answer && (
            <img src="/images/Check_round_fill.svg" alt="correctAnswer" />
          )}

          {hasAnswered &&
            option === answerPicked &&
            answerPicked !== question.answer && (
              <img src="/images/Close_round_fill.svg" alt="wrongAnswer" />
            )}
        </button>
      ))}
      {/* <p className="text-error">Building in progress , check back later...</p> */}
    </div>
  );
}

export default Options;
