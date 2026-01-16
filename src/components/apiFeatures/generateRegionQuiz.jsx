import getRandomItem from "./getRandomItem";
import shuffleArray from "./shuffleArray";

export default function generateRegionQuiz(countries) {
  const correctCountry = getRandomItem(countries);
  const correctAnswer = correctCountry.region;

  const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"];

  return {
    type: "region",
    question: `${correctCountry.name.common} is located in which region?`,
    options: shuffleArray(regions),
    answer: correctAnswer,
    points: 10,
  };
}
