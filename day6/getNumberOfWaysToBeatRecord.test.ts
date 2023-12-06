import { getNumberOfWaysToBeatRecord2 } from "./getNumberOfWaysToBeatRecord";

test("day 6 pt 1", () => {
  expect(
    getNumberOfWaysToBeatRecord2(`Time:      7  15   30
    Distance:  9  40  200`),
  ).toBe(71503);
});

console.log(
  getNumberOfWaysToBeatRecord2(`Time:        44     89     96     91
Distance:   277   1136   1890   1768`),
);
