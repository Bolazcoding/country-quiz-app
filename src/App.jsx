// import { useState } from "react";
import "./App.css";
import { useReducer, useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import generateRandomQuiz from "./components/apiFeatures/generateRandomQuiz";
import WelcomeScreen from "./components/WelcomeScreen";
import Question from "./components/Question";

const initialState = {
  questions: [],

  // 'loading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
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
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  // const [Quiz, setQuiz] = useState("");
  const numOfQuestions = questions.length;
  console.log(questions);

  useEffect(function () {
    // fetch(
    //   "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,currencies"
    // )
    //   .then((res) => res.json())
    //   .then((data) => dispatch({ type: "dataReceived", payload: data }))
    //   .catch((err) => dispatchEvent({ type: "dataFailed" }));
    async function fetchQuestions() {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,capital,flags,region,currencies",
      );
      const data = await res.json();
      console.log(data);
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
        <Header />
        <div className="bg-bg-surface py-12 px-20 mt-6 rounded-[0.6rem]">
          {status === "ready" && (
            <WelcomeScreen
              numOfQuestions={numOfQuestions}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <Question question={questions[index]} dispatch={dispatch} />
          )}
        </div>
      </Main>
    </div>
  );
}

export default App;
