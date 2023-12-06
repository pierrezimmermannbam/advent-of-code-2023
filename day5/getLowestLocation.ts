import { parseMap, secondParser } from "./parser";
import { Map, Range } from "./types";

export const getLowestLocation = (input: string): number => {
  const map = parseMap(input);
  console.log("parsed map");
  const locationSeeds = map.seedsNeeded.map((seed) =>
    getLocationSeed(seed, map),
  );

  return Math.min(...locationSeeds);
};

export const getSecondLowestLocation = (input: string): number => {
  let lowestLocation = Infinity;
  const secondMap = secondParser(input);
  secondMap.seedsNeeded.forEach((seedRange) => {
    console.log("new seed range", seedRange);
    for (let i = 0; i < seedRange.rangeLength; i++) {
      const seed = seedRange.destinationRangeStart + i;
      const location = getLocationSeed(seed, secondMap);
      if (location < lowestLocation) {
        lowestLocation = location;
      }
    }
  });

  return lowestLocation;
};

const getLocationSeed = (seed: number, map: Omit<Map, "seedsNeeded">) => {
  const soil = getMappingFromRangeArrayAndSource(seed, map.seedToSoilMap);
  const fertilizer = getMappingFromRangeArrayAndSource(
    soil,
    map.soilToFertilizerMap,
  );
  const water = getMappingFromRangeArrayAndSource(
    fertilizer,
    map.fertilizerToWaterMap,
  );
  const light = getMappingFromRangeArrayAndSource(water, map.waterToLightMap);
  const temperature = getMappingFromRangeArrayAndSource(
    light,
    map.lightToTemperatureMap,
  );
  const humidity = getMappingFromRangeArrayAndSource(
    temperature,
    map.temperatureToHumidityMap,
  );
  const location = getMappingFromRangeArrayAndSource(
    humidity,
    map.humidityToLocationMap,
  );

  return location;
};

const getMappingFromRangeArrayAndSource = (
  source: number,
  rangeArray: Range[],
) => {
  const range = rangeArray.find((range) => {
    const { sourceRangeStart, rangeLength } = range;
    return (
      source >= sourceRangeStart && source < sourceRangeStart + rangeLength
    );
  });

  if (!range) {
    return source;
  }

  return getMappingForSeedAndRange(source, range);
};

const getMappingForSeedAndRange = (seed: number, range: Range) => {
  const { destinationRangeStart, sourceRangeStart, rangeLength } = range;
  if (seed >= sourceRangeStart && seed < sourceRangeStart + rangeLength) {
    return seed - sourceRangeStart + destinationRangeStart;
  }

  return seed;
};
