export type Hand = [CardValue, CardValue, CardValue, CardValue, CardValue];

export const cardValues = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
] as const;

export type CardValue = (typeof cardValues)[number];

export type Figure =
  | {
      name: "five";
      card: CardValue;
    }
  | {
      name: "four";
      card: CardValue;
    }
  | {
      name: "house";
      triple: CardValue;
      pair: CardValue;
    }
  | {
      name: "triple";
      card: CardValue;
    }
  | {
      name: "pair";
      card: CardValue;
    }
  | {
      name: "highCard";
      highCard: CardValue;
    }
  | {
      name: "doublePair";
      pair1: CardValue;
      pair2: CardValue;
    };
