import { parseMap } from "./parser";
import { Map, Range } from "./types";

export const getLowestLocation = (input: string): number => {
  const map = parseMap(input);
  console.log("parsed map");
  const locationSeeds = map.seedsNeeded.map((seed) =>
    getLocationSeed(seed, map),
  );

  return Math.min(...locationSeeds);
};

const getLocationSeed = (seed: number, map: Map) => {
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
