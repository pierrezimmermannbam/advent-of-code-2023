import {
  getNumberInMatrix,
  getSumOfGearRatios,
  getSumOfPartNumbers,
} from "./getSumOfPartNumbers";
import { NumberInMatrix } from "./types";

it("returns the sum of the part numbers", () => {
  expect(
    getSumOfPartNumbers(`467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`),
  ).toBe(4361);
});

it("returns the numbers in the matrix", () => {
  expect(getNumberInMatrix(["467..114.."])).toEqual<Array<NumberInMatrix>>([
    { number: 467, start: { x: 0, y: 0 } },
    { number: 114, start: { x: 5, y: 0 } },
  ]);
});

it("returns the sum of the gear ratios", () => {
  expect(
    getSumOfGearRatios(`467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`),
  ).toBe(467835);
});
