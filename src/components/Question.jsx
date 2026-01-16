function Question({ question }) {
  return (
    <div>
      <h1 className="text-text-primary font-semibold">{question.question}</h1>
      <p className="text-error mt-5 font-semibold">
        Building in progress... , check back later
      </p>
    </div>
  );
}

export default Question;
