import { parseInput, parseLine } from "./parser";
import { Game, Games } from "./types";

it("parses correctly a game", () => {
  expect(
    parseLine("Game 1: 30 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"),
  ).toEqual<Game>({
    id: 1,
    sets: [
      { nbRed: 4, nbGreen: 0, nbBlue: 30 },
      { nbRed: 1, nbGreen: 2, nbBlue: 6 },
      { nbRed: 0, nbGreen: 2, nbBlue: 0 },
    ],
  });
});

it("parses correctly game 2", () => {
  expect(
    parseLine(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    ),
  ).toEqual<Game>({
    id: 2,
    sets: [
      { nbRed: 0, nbGreen: 2, nbBlue: 1 },
      { nbRed: 1, nbGreen: 3, nbBlue: 4 },
      { nbRed: 0, nbGreen: 1, nbBlue: 1 },
    ],
  });
});

it("parses correctly a set of games", () => {
  expect(
    parseInput(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue`),
  ).toEqual<Games>([
    {
      id: 1,
      sets: [
        { nbRed: 4, nbGreen: 0, nbBlue: 3 },
        { nbRed: 1, nbGreen: 2, nbBlue: 6 },
        { nbRed: 0, nbGreen: 2, nbBlue: 0 },
      ],
    },
    {
      id: 2,
      sets: [
        { nbRed: 0, nbGreen: 2, nbBlue: 1 },
        { nbRed: 1, nbGreen: 3, nbBlue: 4 },
        { nbRed: 0, nbGreen: 1, nbBlue: 1 },
      ],
    },
  ]);
});
