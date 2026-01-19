// import { useState } from "react";
import "./App.css";
import { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import generateRandomQuiz from "./components/apiFeatures/generateRandomQuiz";
import WelcomeScreen from "./components/WelcomeScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import TrackProgress from "./components/TrackProgress";
// import PreviousButton from "./components/PreviousButton";

const initialState = {
  questions: [],

  // 'loading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
  answerPicked: null,
  points: 0,
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
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      const isCorrect = action.payload === question.answer;
      console.log(action.payload);

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

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answerPicked, points }, dispatch] =
    useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  // console.log(answerPicked);

  useEffect(function () {
    async function fetchQuestions() {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,currencies",
      );
      const data = await res.json();
      // console.log(data);
      // setQuiz(generateRandomQuiz(data));
      const questions = generateRandomQuiz(data);

      dispatch({
        type: "dataReceived",
        payload: questions,
      });
    }
    fetchQuestions();
  }, []);

  return (
    <div className="bg-[image:var(--bg-desktop)] bg-cover h-screen w-full flex items-center justify-center flex-col">
      <Main>
        <Header
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          status={status}
        />
        <div className="bg-bg-surface py-12 px-20 mt-6 rounded-[0.6rem]">
          {status === "ready" && (
            <WelcomeScreen
              numOfQuestions={numOfQuestions}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <>
              <TrackProgress question={questions} index={index} />
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
        </div>
      </Main>
    </div>
  );
}

export default App;
