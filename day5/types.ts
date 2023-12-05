export type Map = {
  seedsNeeded: Array<number>;
  seedToSoilMap: Array<Range>;
  soilToFertilizerMap: Array<Range>;
  fertilizerToWaterMap: Array<Range>;
  waterToLightMap: Array<Range>;
  lightToTemperatureMap: Array<Range>;
  temperatureToHumidityMap: Array<Range>;
  humidityToLocationMap: Array<Range>;
};

export type Range = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};
