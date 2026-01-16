import getRandomItem from "./getRandomItem";
import generateCapitalQuiz from "./generateCapitalQuiz";
import generateFlagQuiz from "./generateFlagQuiz";
import generateRegionQuiz from "./generateRegionQuiz";

export default function generateRandomQuiz(countries, total = 15) {
  const generators = [
    generateCapitalQuiz,
    generateFlagQuiz,
    generateRegionQuiz,
  ];

  const quiz = [];

  while (quiz.length < total) {
    const generator = getRandomItem(generators);
    quiz.push(generator(countries));
  }

  return quiz;

  //   return getRandomItem(generators)(countries);
}
