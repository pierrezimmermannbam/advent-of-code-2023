import { splitLines } from "../shared/splitLines";
import { NumberInMatrix } from "./types";

export const getSumOfPartNumbers = (input: string): number => {
  const lines = splitLines(input).map((line) => line.replace(/\s+/g, ""));
  const numbers = getNumberInMatrix(lines);
  const symbolPositions = getSymbolPositions(lines);

  let result = 0;
  numbers.forEach((number) => {
    if (getNumberHasAdjacentSymbol(number, symbolPositions)) {
      result += number.number;
    }
  });

  return result;
};

export const getNumberInMatrix = (
  lines: Array<string>,
): Array<NumberInMatrix> => {
  const result: Array<NumberInMatrix> = [];

  lines.forEach((line, y) => {
    let number = "";
    let xStart = 0;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char.match(/\d/)) {
        number += char;
        if (number.length === 1) {
          xStart = i;
        }
      } else {
        if (number !== "") {
          result.push({
            number: Number(number),
            start: { x: xStart, y },
          });
          number = "";
        }
      }
    }
  });

  return result;
};

export const getSumOfGearRatios = (input: string): number => {
  const lines = splitLines(input).map((line) => line.replace(/\s+/g, ""));
  const numbers = getNumberInMatrix(lines);

  let result = 0;

  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const char = line[x];
      if (char === "*") {
        const adjacentNumbers = findAdjacentPartNumbers(numbers, x, y);

        if (adjacentNumbers.length === 2) {
          result += adjacentNumbers[0].number * adjacentNumbers[1].number;
        }
      }
    }
  });

  return result;
};

const findAdjacentPartNumbers = (
  numbersInMatrix: Array<NumberInMatrix>,
  x: number,
  y: number,
): Array<NumberInMatrix> => {
  const result: Array<NumberInMatrix> = [];

  numbersInMatrix.forEach((number) => {
    const numberLength = number.number.toString().length;
    if (
      x >= number.start.x - 1 &&
      x <= number.start.x + numberLength &&
      y >= number.start.y - 1 &&
      y <= number.start.y + 1
    ) {
      result.push(number);
    }
  });

  return result;
};

export const getSymbolPositions = (
  lines: Array<string>,
): Array<{ x: number; y: number }> => {
  const result: Array<{ x: number; y: number }> = [];

  lines.forEach((line, y) => {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (!char.match(/\d/) && char !== ".") {
        result.push({ x: i, y });
      }
    }
  });

  return result;
};

export const getNumberHasAdjacentSymbol = (
  number: NumberInMatrix,
  symbolPositions: Array<{ x: number; y: number }>,
): boolean => {
  const { x, y } = number.start;
  const numberLength = number.number.toString().length;

  let result = false;
  for (let xNumber = x; xNumber < x + numberLength; xNumber++) {
    if (
      symbolPositions.find(
        (symbol) =>
          symbol.x <= xNumber + 1 &&
          symbol.x >= xNumber - 1 &&
          symbol.y <= y + 1 &&
          symbol.y >= y - 1,
      )
    ) {
      result = true;
    }
  }

  return result;
};
