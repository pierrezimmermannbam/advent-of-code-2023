import { Map } from "./types";

export const parseMap = (input: string): Map => {
  const sections = input.split(/\n\s*\n/);
  const seeds = sections[0].split(":")[1].trim().split(" ").map(Number);
  console.log(sections.length);

  return {
    seedsNeeded: seeds,
    seedToSoilMap: parseMapping(sections[1]),
    soilToFertilizerMap: parseMapping(sections[2]),
    fertilizerToWaterMap: parseMapping(sections[3]),
    waterToLightMap: parseMapping(sections[4]),
    lightToTemperatureMap: parseMapping(sections[5]),
    temperatureToHumidityMap: parseMapping(sections[6]),
    humidityToLocationMap: parseMapping(sections[7]),
  };
};

const parseMapping = (input: string) => {
  const lines = input.split("\n").slice(1);

  return lines.map((line) => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line
      .trim()
      .split(" ")
      .map(Number);

    return {
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    };
  });
};
