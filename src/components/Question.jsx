import Options from "./Options";

function Question({ question, dispatch, answerPicked, index }) {
  return (
    <div>
      <h1 className="text-text-primary font-semibold">{question.question}</h1>
      {/* <p className="text-error mt-5 font-semibold">
        Building in progress... , check back later
      </p> */}
      <Options
        question={question}
        dispatch={dispatch}
        answerPicked={answerPicked}
        index={index}
      />
    </div>
  );
}

export default Question;
