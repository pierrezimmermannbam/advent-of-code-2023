import { parseMapNode } from "./parser";
import { Instructions, Path } from "./types";

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

export const getCycle = (
  instructions: Instructions,
  map: Record<string, { left: string; right: string }>,
  startNode: keyof typeof map,
) => {
  let currentNode = startNode;
  let currentInstructionsIndex = 0;
  let numberOfSteps = 0;

  const visitedNodes: Record<
    string,
    Array<{ instructionIndex: number; numberOfSteps: number }>
  > = {};

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const instruction =
      instructions[currentInstructionsIndex % instructions.length];
    if (instruction === "L") {
      currentNode = map[currentNode].left;
    } else {
      currentNode = map[currentNode].right;
    }
    if (!visitedNodes[currentNode]) {
      visitedNodes[currentNode] = [];
    }
    if (
      visitedNodes[currentNode].find((visit) => {
        return (
          visit.instructionIndex % instructions.length ===
          currentInstructionsIndex % instructions.length
        );
      })
    ) {
      visitedNodes[currentNode].push({
        instructionIndex: currentInstructionsIndex,
        numberOfSteps: numberOfSteps,
      });
      numberOfSteps++;
      currentInstructionsIndex++;
      break;
    } else {
      visitedNodes[currentNode].push({
        instructionIndex: currentInstructionsIndex,
        numberOfSteps: numberOfSteps,
      });
      numberOfSteps++;
      currentInstructionsIndex++;
    }
  }

  return { visitedNodes, lastNode: currentNode };
};

export const getNumbersOfStepForStartNode = (
  { map, instructions }: Path,
  startNode: keyof typeof map,
) => {
  const { visitedNodes, lastNode } = getCycle(instructions, map, startNode);
  const visitsForLastNode = visitedNodes[lastNode];

  const endOfCycle = visitedNodes[lastNode][visitedNodes[lastNode].length - 1];
  const startOfCycle =
    visitsForLastNode.find((visit) => {
      return (
        visit.instructionIndex % instructions.length ===
          endOfCycle.instructionIndex % instructions.length &&
        visit.numberOfSteps !== endOfCycle.numberOfSteps
      );
    }) || endOfCycle;

  const cycleLength =
    (endOfCycle?.numberOfSteps || 0) - (startOfCycle?.numberOfSteps || 0);

  const visitsWhereWeVisitZ = Object.entries(visitedNodes).filter(([node]) => {
    return node.endsWith("Z");
  });
  const stepsWhereWeVisitZ = visitsWhereWeVisitZ.flatMap((node) => {
    const visits = node[1];
    return visits
      .filter(
        (visit) => visit.numberOfSteps >= (startOfCycle?.numberOfSteps || 0),
      )
      .map((visit) => visit.numberOfSteps + 1);
  });
  return { cycleLength: cycleLength || 1, stepsWhereWeVisitZ };
};

export const getNumberOfStepsForAllNodes = (input: string) => {
  const parsedInput = parseMapNode(input);
  const startingNodes = Object.keys(parsedInput.map).filter((node) =>
    node.endsWith("A"),
  );

  const stepsWhereWeVisitZByNode = startingNodes.map((node) => {
    return getNumbersOfStepForStartNode(parsedInput, node);
  });
  console.log("in file", stepsWhereWeVisitZByNode);
};
