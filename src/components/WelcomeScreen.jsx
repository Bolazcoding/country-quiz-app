function WelcomeScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="text-center">
      <h1 className="text-text-primary text-[1.4rem] font-semibold max-[428px]:text-[1.3rem]">
        Welcome to the Country Quiz
      </h1>
      <p className="text-text-primary text-[1.3rem] mt-2 max-[428px]:text-[1.1rem]">
        You have {numOfQuestions} questions to test your knowledge
      </p>
      <button
        className="btn mt-5 rounded-[0.6rem] px-8 py-2"
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default WelcomeScreen;
