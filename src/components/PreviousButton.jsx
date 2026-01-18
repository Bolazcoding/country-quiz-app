function PreviousButton({ dispatch, index }) {
  if (index === null) return null;

  return (
    <div className="text-left mt-5">
      <button
        className="btn px-7 py-2 rounded"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Previous
      </button>
      <p className="text-error mt-4">
        Building in progress... Check back later
      </p>
    </div>
  );
}

export default PreviousButton;
