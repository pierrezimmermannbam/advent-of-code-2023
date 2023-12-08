export type Instructions = Array<Direction>;
type Direction = "L" | "R";

export type Node = {
  right: string;
  left: string;
};

export type NodeMap = Record<string, Node>;

export type Path = {
  instructions: Instructions;
  map: NodeMap;
};
