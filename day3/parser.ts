import { splitLines } from "../shared/splitLines";

export const parseInput = (input: string): Array<string> => {
  return splitLines(input).map((line) => line.replace(/\s+/g, ""));
};
