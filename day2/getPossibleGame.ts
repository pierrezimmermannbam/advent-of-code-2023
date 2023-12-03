import { parseInput } from "./parser";
import { Game } from "./types";

export const getPossibleGames = (
  input: string,
  nbBlue: number,
  nbRed: number,
  nbGreen: number,
): number => {
  const games = parseInput(input);

  return games
    .filter((game) => isPossibleGame(game, nbBlue, nbRed, nbGreen))
    .reduce((acc, game) => acc + game.id, 0);
};

const isPossibleGame = (
  game: Game,
  nbBlue: number,
  nbRed: number,
  nbGreen: number,
): boolean => {
  return game.sets.every(
    (set) =>
      set.nbBlue <= nbBlue && set.nbRed <= nbRed && set.nbGreen <= nbGreen,
  );
};

export const getGamesPower = (input: string): number => {
  const games = parseInput(input);

  return games.reduce((acc, game) => acc + getGamePower(game), 0);
};

const getGamePower = (game: Game): number => {
  const minNbBlue = Math.max(...game.sets.map((set) => set.nbBlue));
  const minNbRed = Math.max(...game.sets.map((set) => set.nbRed));
  const minNbGreen = Math.max(...game.sets.map((set) => set.nbGreen));

  return (minNbBlue || 1) * (minNbRed || 1) * (minNbGreen || 1);
};
