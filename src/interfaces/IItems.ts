import { IStateItems } from "./IStateItems"

export interface IItems {
  sol: IStateItems,
  bsc: IStateItems,
  eth: IStateItems,
  lastUpdate: string
}

export interface ItemsOnChain {
gems: {
    [eff: string]: GemLevels,
    comf: GemLevels,
    res: GemLevels,
    luck: GemLevels
  },
  scrolls: {
    [com: string]: Array<number>,
    unc: Array<number>,
    rare: Array<number>,
    epic: Array<number>,
    leg: Array<number>,
  }
}

export interface GemLevels {
  [lvl1: string]: Array<number>,
  lvl2: Array<number>,
  lvl3: Array<number>,
  lvl4: Array<number>,
}