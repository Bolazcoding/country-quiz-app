import getRandomItem from "./getRandomItem";
import shuffleArray from "./shuffleArray";

export default function generateFlagQuiz(countries) {
  const correctCountry = getRandomItem(countries);
  const correctAnswer = correctCountry.name.common;

  const options = new Set([correctAnswer]);

  while (options.size < 4) {
    options.add(getRandomItem(countries).name.common);
  }

  return {
    type: "flag",
    question: "Which country does this flag belong to?",
    image: correctCountry.flags.png,
    options: shuffleArray([...options]),
    answer: correctAnswer,
    points: 15,
  };
}
