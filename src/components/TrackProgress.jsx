function TrackProgress({ numOfQuestions, index, answerPicked }) {
  // const currentIndex = index;
  const progress =
    ((index + Number(answerPicked !== null)) / numOfQuestions) * 100;

  return (
    <div className="flex flex-col gap-3 items-center justify-center ">
      {/* <progress
        className="w-full bg-bg-surface-alt"
        max={numOfQuestions}
        value={index + Number(answerPicked !== null)}
      /> */}
      <div className="w-full h-3 bg-bg-surface-alt rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-tertiary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-text-primary">
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      {/* {question.map((_, i) => {
        const isCurrent = i === currentIndex;
        const isAnswered = answerPicked && answerPicked[i] !== undefined;
        //   console.log(currentIndex);

        let bgClass = "bg-bg-surface-alt";

        if (isAnswered) bgClass = "bg-accent-secondary";
        if (isCurrent) bgClass = "bg-accent-tertiary";

        <span
          className={`${bgClass} text-text-primary text-[0.8rem] rounded-full flex items-center justify-center w-5 h-5 p-3.5 wrap-break-word`}
        >
          {i + 1}
        </span>;
      })} */}
    </div>
  );
}

export default TrackProgress;
