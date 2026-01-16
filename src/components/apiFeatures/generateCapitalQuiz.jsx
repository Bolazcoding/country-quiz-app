import getRandomItem from "./getRandomItem";
import shuffleArray from "./shuffleArray";

export default function generateCapitalQuiz(countries) {
  const correctCountry = getRandomItem(countries);

  if (!correctCountry.capital) return generateCapitalQuiz(countries);

  const correctAnswer = correctCountry.capital[0];

  const options = new Set([correctAnswer]);

  while (options.size < 4) {
    const randomCountry = getRandomItem(countries);
    if (randomCountry.capital) {
      options.add(randomCountry.capital[0]);
    }
  }

  return {
    type: "capital",
    question: `What is the capital of ${correctCountry.name.common}?`,
    options: shuffleArray([...options]),
    answer: correctAnswer,
    points: 15,
  };
}
