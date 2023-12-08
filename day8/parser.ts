import { Instructions, NodeMap, Path } from "./types";

export const parseMapNode = (input: string): Path => {
  const [instructionsString, mapNodeString] = input.split(/\n\s*\n/);

  const instructions = Array.from(instructionsString.trim()) as Instructions;

  const nodeMap: NodeMap = {};
  mapNodeString
    .split("\n")
    .map((line) => line.trim())
    .forEach((line) => {
      const nodeName = line.slice(0, 3);
      const leftNode = line.slice(7, 10);
      const rightNode = line.slice(12, 15);

      nodeMap[nodeName] = {
        left: leftNode,
        right: rightNode,
      };
    });

  return {
    instructions,
    map: nodeMap,
  };
};
