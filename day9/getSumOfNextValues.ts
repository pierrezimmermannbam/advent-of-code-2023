import { splitLines } from "../shared/splitLines";

export const getSumOfNextValues = (input: string): number => {
  const lines = splitLines(input);
  const values = lines.map(getPredictionForLine);

  return values.reduce((acc, curr) => acc + curr, 0);
};

export const getPredictionForLine = (line: string): number => {
  let values = line
    .trim()
    .split(/\s+/)
    .map((value) => Number(value));

  let result = values[values.length - 1];

  while (values.find((value) => value !== 0)) {
    const nextValues = [];
    for (let i = 0; i < values.length - 1; i++) {
      const firstValue = values[i];
      const secondValue = values[i + 1];
      nextValues.push(secondValue - firstValue);
    }
    values = nextValues;
    result += nextValues[nextValues.length - 1];
  }

  return result;
};

export const getPreviousDataForLine = (line: string): number => {
  let values = line
    .trim()
    .split(/\s+/)
    .map((value) => Number(value));
  const firstValues = [values[0]];

  while (values.find((value) => value !== 0)) {
    const nextValues = [];
    for (let i = 0; i < values.length - 1; i++) {
      const firstValue = values[i];
      const secondValue = values[i + 1];
      nextValues.push(secondValue - firstValue);
    }
    values = nextValues;
    firstValues.push(values[0]);
  }

  firstValues.reverse();
  const newValues: number[] = [0];
  for (let i = 1; i < firstValues.length; i++) {
    newValues.push(firstValues[i] - newValues[newValues.length - 1]);
  }

  return newValues[newValues.length - 1];
};

export const getSumOfPreviousValues = (input: string): number => {
  const lines = splitLines(input);
  const values = lines.map(getPreviousDataForLine);

  return values.reduce((acc, curr) => acc + curr, 0);
};
