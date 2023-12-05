import { splitLines } from "../shared/splitLines";

export const getTotalGameScore = (input: string): number => {
  const games = splitLines(input);
  const gameNumbers = games.map((game) => game.split(":")[1]);
  let result = 0;

  gameNumbers.forEach((gameNumber) => {
    const [winningNumbers, drawnNumbers] = gameNumber
      .split("|")
      .map((numbers) => numbers.trim().split(" ").filter(Boolean).map(Number));

    const numberOfMatches = getNumberOfMatches(winningNumbers, drawnNumbers);
    if (numberOfMatches > 0) {
      result += 2 ** (numberOfMatches - 1);
    }
  });

  return result;
};

const getNumberOfMatches = (
  winningNumbers: number[],
  drawnNumbers: number[],
) => {
  let numberOfMatches = 0;
  drawnNumbers.forEach((drawnNumber) => {
    if (winningNumbers.includes(drawnNumber)) {
      numberOfMatches++;
    }
  });

  return numberOfMatches;
};

export const getTotalScratchCards = (input: string): number => {
  const games = formatGames(input);

  const numberOfMatchesByCardNumber: Record<number, number> = {};
  games.forEach((game) => {
    numberOfMatchesByCardNumber[game.number] = getNumberOfMatches(
      game.winningNumbers,
      game.drawnNumbers,
    );
  });
  console.log("number of matches by card", numberOfMatchesByCardNumber);

  const numberOfCardsWonByCard: Record<number, number> = {};
  Object.keys(numberOfMatchesByCardNumber).forEach((cardNumber) => {
    const numberOfMatches = numberOfMatchesByCardNumber[Number(cardNumber)];

    for (
      let i = Number(cardNumber) + 1;
      i <= Number(cardNumber) + numberOfMatches;
      i++
    ) {
      if (numberOfCardsWonByCard[i]) {
        numberOfCardsWonByCard[i] +=
          (numberOfCardsWonByCard[Number(cardNumber)] || 0) + 1;
      } else {
        numberOfCardsWonByCard[i] =
          (numberOfCardsWonByCard[Number(cardNumber)] || 0) + 1;
      }
    }
  });
  console.log("number of cards won by card", numberOfCardsWonByCard);

  return (
    Object.values(numberOfCardsWonByCard).reduce(
      (acc, numberOfCardsWon) => acc + numberOfCardsWon,
      0,
    ) + Object.keys(numberOfMatchesByCardNumber).length
  );
};

type Games = Array<Game>;

type Game = {
  number: number;
  winningNumbers: Array<number>;
  drawnNumbers: Array<number>;
};

const formatGames = (input: string): Games => {
  const games = splitLines(input);

  return games.map((game) => {
    const [gameNumber, numbers] = game.split(":");
    const [winningNumbers, drawnNumbers] = numbers
      .split("|")
      .map((numbers) => numbers.trim().split(" ").filter(Boolean))
      .filter(Boolean);

    return {
      number: Number(gameNumber.match(/\d+/)),
      winningNumbers: winningNumbers.map(Number),
      drawnNumbers: drawnNumbers.map(Number),
    };
  });
};
