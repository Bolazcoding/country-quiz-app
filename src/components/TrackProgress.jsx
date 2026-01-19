function TrackProgress({ question, index }) {
  const currentIndex = index;
  //   console.log(currentIndex);
  return (
    <div className="flex gap-3 mb-4">
      {question.map((_, index) => (
        <span
          className={`bg-bg-surface-alt text-text-primary text-[0.8rem] rounded-full flex items-center justify-center w-5 h-5 p-3.5 wrap-break-word ${index === currentIndex ? `bg-accent-tertiary` : ""} `}
        >
          {index + 1}
        </span>
      ))}
    </div>
  );
}

export default TrackProgress;
