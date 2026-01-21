import Options from "./Options";

function Question({ question, dispatch, answerPicked, index }) {
  return (
    <div className="mt-2">
      <h1 className="text-text-primary font-semibold flex gap-4">
        {question.question}
        {question.type === "flag" && (
          <img src={question.image} alt="countryImage" className="w-10" />
        )}
      </h1>
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
