import { splitLines } from "../shared/splitLines";
import { CubeSet, Game, Games } from "./types";

export const parseInput = (input: string): Games => {
    const lines = splitLines(input);

    return lines.map(parseLine);

}

export const parseLine = (line: string): Game => {
    const [game, set] = line.split(':');
    const gameId = game.match(/\d+/);
    const sets = set.split(';');

    return {
        id: Number(gameId),
        sets: sets.map(parseSet)
    }

}

const parseSet = (set: string): CubeSet => {
    const nbBlue = set.match(/\d+ blue/);
    const nbRed = set.match(/\d+ red/);
    const nbGreen = set.match(/\d+ green/);

    return {
        nbBlue: nbBlue ? Number(nbBlue[0].match(/\d+/)): 0,
        nbRed: nbRed ? Number(nbRed[0].match(/\d+/)): 0,
        nbGreen: nbGreen ? Number(nbGreen[0].match(/\d+/)): 0
    }
}