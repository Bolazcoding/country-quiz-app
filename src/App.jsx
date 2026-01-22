import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import generateRandomQuiz from "./components/apiFeatures/generateRandomQuiz";
import WelcomeScreen from "./components/WelcomeScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import TrackProgress from "./components/TrackProgress";
import FinishQuiz from "./components/FinishQuiz";
// import PreviousButton from "./components/PreviousButton";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
  answerPicked: null,
  points: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      const isCorrect = action.payload === question.answer;

      return {
        ...state,
        answerPicked: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answerPicked: null,
      };
    // case "previousQuestion":
    //   return {
    //     ...state,
    //     index: state.index - 1,
    //     // answerPicked: action.payload,
    //   };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "playAgain":
      return {
        ...state,
        status: "ready",
        index: 0,
        answerPicked: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answerPicked, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  useEffect(function () {
    async function fetchQuestions() {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,currencies",
      );
      const data = await res.json();
      const questions = generateRandomQuiz(data);

      dispatch({
        type: "dataReceived",
        payload: questions,
      });
    }
    fetchQuestions();
  }, []);

  return (
    <div className="bg-[image:var(--bg-desktop)] bg-cover h-screen w-full flex items-center justify-center max-[640px]:bg-[image:var(--bg-mobile)] max-[510px]:px-4">
      <Main>
        <Header
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          status={status}
        />
        <div
          className={`bg-bg-surface mt-6 rounded-[0.6rem] ${status === "finished" ? "py-3 px-8" : "py-12 px-14"} max-[510px]:py-7 max-[510px]:px-5`}
        >
          {status === "ready" && (
            <WelcomeScreen
              numOfQuestions={numOfQuestions}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <>
              <TrackProgress
                question={questions}
                index={index}
                answerPicked={answerPicked}
                numOfQuestions={numOfQuestions}
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answerPicked={answerPicked}
                index={index}
              />
              <NextButton
                dispatch={dispatch}
                index={index}
                answerPicked={answerPicked}
                numOfQuestions={numOfQuestions}
              />
              {/* <PreviousButton
                dispatch={dispatch}
                index={index}
                answerPicked={answerPicked}
                numOfQuestions={numOfQuestions}
              /> */}
            </>
          )}
          {status === "finished" && (
            <FinishQuiz
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              dispatch={dispatch}
            />
          )}
        </div>
      </Main>
    </div>
  );
}

export default App;
