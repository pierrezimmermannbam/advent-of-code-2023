import { getNumberOfSteps } from "./getNumberOfSteps";
import { parseMapNode } from "./parser";

test("day 8 pt 1 first example", () => {
  expect(
    getNumberOfSteps(`RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`),
  ).toBe(2);
});

test("day 8 pt 1 second example", () => {
  expect(
    getNumberOfSteps(`LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`),
  ).toBe(6);
});

test("parser", () => {
  expect(
    parseMapNode(`RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`),
  ).toMatchInlineSnapshot(`
    {
      "instructions": [
        "R",
        "L",
      ],
      "map": {
        "AAA": {
          "left": "BBB",
          "right": "CCC",
        },
        "BBB": {
          "left": "DDD",
          "right": "EEE",
        },
        "CCC": {
          "left": "ZZZ",
          "right": "GGG",
        },
        "DDD": {
          "left": "DDD",
          "right": "DDD",
        },
        "EEE": {
          "left": "EEE",
          "right": "EEE",
        },
        "GGG": {
          "left": "GGG",
          "right": "GGG",
        },
        "ZZZ": {
          "left": "ZZZ",
          "right": "ZZZ",
        },
      },
    }
  `);
});
