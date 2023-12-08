import { splitLines } from "../shared/splitLines";
import { CardValue, Figure, Hand, cardValues } from "./types";

export const getTotalForHands = (input: string): number => {
  const lines = splitLines(input);
  const handsWithValues = lines.map((line) => line.trim().split(/\s+/));
  const parsedGame: Array<{ hand: Hand; bid: number }> = handsWithValues.map(
    (hands) => {
      const [hand, bid] = hands;
      return {
        hand: [
          hand[0] as CardValue,
          hand[1] as CardValue,
          hand[2] as CardValue,
          hand[3] as CardValue,
          hand[4] as CardValue,
        ],
        bid: Number(bid),
      };
    },
  );

  const sortedHands = parsedGame.sort((hand1, hand2) => {
    return compareHands(hand1.hand, hand2.hand);
  });

  return sortedHands.reduce((total, hand, index) => {
    return total + hand.bid * (index + 1);
  }, 0);
};

export const compareHands = (hand1: Hand, hand2: Hand): number => {
  const figure1 = computeFigureForHand(hand1);
  const figure2 = computeFigureForHand(hand2);

  const rank1 = getRankOfFigure(figure1);
  const rank2 = getRankOfFigure(figure2);

  if (rank1 !== rank2) {
    return rank1 - rank2;
  }

  let result = 1;
  for (let i = 0; i < 5; i++) {
    if (hand1[i] !== hand2[i]) {
      result = cardValues.indexOf(hand2[i]) - cardValues.indexOf(hand1[i]);
      break;
    }
  }

  return result;
};

export const getBestHandByReplacingJokers = (hand: Hand): Hand => {
  const valuesWithCount = computeNumberOfValuesForHand(hand);

  if (!hand.includes("J")) {
    return hand;
  }

  const entries = Object.entries(valuesWithCount);
  let bestCard: CardValue = "2";
  entries.forEach(([card, count]) => {
    if (card === "J") {
      return;
    }

    if (count > (valuesWithCount[bestCard] || 0)) {
      bestCard = card as CardValue;
    }

    if (
      count === valuesWithCount[bestCard] &&
      cardValues.indexOf(card as CardValue) < cardValues.indexOf(bestCard)
    ) {
      bestCard = card as CardValue;
    }
  });

  const improvedHand = hand.map((card) => {
    if (card === "J") {
      return bestCard;
    }

    return card;
  }) as Hand;

  return improvedHand;
};

const computeFigureForHand = (hand: Hand): Figure => {
  const valuesWithCount = computeNumberOfValuesForHand(
    getBestHandByReplacingJokers(hand),
  );
  const values = Object.values(valuesWithCount);
  if (values.includes(5)) {
    return {
      name: "five",
      card: hand[0],
    };
  }

  const carre = cardValues.find((value) => valuesWithCount[value] === 4);

  if (carre) {
    return {
      name: "four",
      card: carre,
    };
  }

  const triple = cardValues.find((value) => valuesWithCount[value] === 3);
  const pairs = cardValues.filter((value) => valuesWithCount[value] === 2);

  if (triple && pairs.length > 0) {
    return {
      name: "house",
      triple,
      pair: pairs[0],
    };
  }

  if (triple) {
    return {
      name: "triple",
      card: triple,
    };
  }

  if (pairs.length === 2) {
    return {
      name: "doublePair",
      pair1: pairs[0],
      pair2: pairs[1],
    };
  }

  if (pairs.length > 0) {
    return {
      name: "pair",
      card: pairs[0],
    };
  }

  const sortedHand = [...hand].sort((a, b) => {
    return cardValues.indexOf(a) - cardValues.indexOf(b);
  });

  return { highCard: sortedHand[4], name: "highCard" };
};

const computeNumberOfValuesForHand = (
  hand: Hand,
): Record<CardValue, number> => {
  const result: Record<CardValue, number> = {
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    T: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0,
  };

  for (const card of hand) {
    result[card] += 1;
  }

  return result;
};

const getRankOfFigure = (figure: Figure): number => {
  switch (figure.name) {
    case "five":
      return 5;
    case "four":
      return 4;
    case "house":
      return 3;
    case "triple":
      return 2;
    case "doublePair":
      return 1.5;
    case "pair":
      return 1;
    case "highCard":
      return 0;
  }
};
