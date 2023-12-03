export type Games = Array<Game>;

export type Game = { id: number; sets: Array<CubeSet> };

export type CubeSet = { nbRed: number; nbGreen: number; nbBlue: number };
