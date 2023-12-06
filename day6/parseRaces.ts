import { Race } from "./type";

export const parseRaces = (input: string): Array<Race> => {
  const [timesString, distancesString] = input.split("\n");
  const times = timesString.split(":")[1].trim().split(/\s+/).map(Number);
  const distances = distancesString
    .split(":")[1]
    .trim()
    .split(/\s+/)
    .map(Number);

  return times.map((time, index) => ({
    record: time,
    distance: distances[index],
  }));
};

export const parseRace2 = (input: string): [Race] => {
  const [timesString, distancesString] = input.split("\n");
  const time = Number(timesString.split(":")[1].trim().replace(/\s+/g, ""));
  const distance = Number(
    distancesString.split(":")[1].trim().replace(/\s+/g, ""),
  );

  return [{ record: time, distance }];
};
