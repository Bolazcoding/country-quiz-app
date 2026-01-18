function Options({ question, dispatch, answerPicked }) {
  const hasAnswered = answerPicked !== null;

  // const answerPick = question.answer[question.index] ?? null;

  // console.log(hasAnswered);

  function handleAnswer(OptionSelected) {
    dispatch({ type: "newAnswer", payload: OptionSelected });
    console.log(OptionSelected);
  }

  // console.log(answerPicked);
  return (
    <div className="grid grid-cols-2 gap-4 mt-5">
      {question.options.map((option, index) => (
        <button
          className="btnOption"
          onClick={() => handleAnswer(option)}
          disabled={answerPicked !== null}
        >
          <span>{option}</span>
          {/* {question.answer === answerPicked ? (
            <img src="/images/Check_round_fill.svg" alt="correctAnswer" />
          ) : (
            ""
          )} */}
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
    </div>
  );
}

export default Options;
