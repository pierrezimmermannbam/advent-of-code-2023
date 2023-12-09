import {
  getPredictionForLine,
  getPreviousDataForLine,
  getSumOfNextValues,
} from "./getSumOfNextValues";

test("day 9 pt 1", () => {
  expect(
    getSumOfNextValues(`0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45`),
  ).toBe(114);
});

test("predictions for lines", () => {
  expect(getPredictionForLine(`0 3 6 9 12 15`)).toBe(18);
  expect(getPredictionForLine(`1 3 6 10 15 21`)).toBe(28);
  expect(getPredictionForLine(`10 13 16 21 30 45`)).toBe(68);
});

test("previous data for line", () => {
  expect(getPreviousDataForLine(`0 3 6 9 12 15`)).toBe(-3);
  expect(getPreviousDataForLine(`1 3 6 10 15 21`)).toBe(0);
  expect(getPreviousDataForLine(`10 13 16 21 30 45`)).toBe(5);
});
