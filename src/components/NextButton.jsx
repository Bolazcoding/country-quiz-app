function NextButton({ dispatch, index, answerPicked, numOfQuestions }) {
  if (answerPicked === null) return null;

  if (index < numOfQuestions - 1)
    return (
      <div className="text-right mt-5">
        <button
          className="btn px-7 py-2 rounded"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    );

  if (index === numOfQuestions - 1)
    return (
      <div className="text-right mt-5">
        <button
          className="btn px-7 py-2 rounded"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}

export default NextButton;
