import { parseMapNode } from "./parser";

export const getNumberOfSteps = (input: string): number => {
  const { instructions, map } = parseMapNode(input);

  let currentNode = "AAA";
  let instructionsIndex = 0;
  let numberOfSteps = 0;

  while (currentNode !== "ZZZ") {
    const instruction = instructions[instructionsIndex % instructions.length];
    if (instruction === "L") {
      currentNode = map[currentNode].left;
    } else {
      currentNode = map[currentNode].right;
    }
    numberOfSteps++;
    instructionsIndex++;
  }

  return numberOfSteps;
};
