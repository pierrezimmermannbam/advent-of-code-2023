import { parseRace2, parseRaces } from "./parseRaces";
import { Race } from "./type";

export const getNumberOfWaysToBeatRecord = (input: string): number => {
  const races = parseRaces(input);
  return races
    .map(getNumberOfWaysToBeatRace)
    .reduce((acc, curr) => acc * (curr || 1), 1);
};

const getNumberOfWaysToBeatRace = (race: Race) => {
  let result = 0;
  for (
    let timeButtonPressed = 1;
    timeButtonPressed <= race.record;
    timeButtonPressed++
  ) {
    const timeToFinishRace =
      race.distance / timeButtonPressed + timeButtonPressed;
    if (timeToFinishRace < race.record) {
      result++;
    }
  }

  return result;
};

export const getNumberOfWaysToBeatRecord2 = (input: string): number => {
  const races = parseRace2(input);
  console.log("races", races);
  return races
    .map(getNumberOfWaysToBeatRace)
    .reduce((acc, curr) => acc * (curr || 1), 1);
};
