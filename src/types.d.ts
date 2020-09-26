import { LitElement } from "lit-element"

export interface IWord {
  english: string;
  hangul: string;
  hanja: string;
  id: number;
  freq_deg?: number;
}
export interface IReading {
  hanjas: string[];
  hangul: string;
}
export interface IRadical {
  radical: string;
  hanjas: string[];
}
export interface IHanja {
  id: number;
  hanja: string;
  strokes: string;
  def: {
      en?: string[];
      kr: string[];
  };
  hunum?: hunum[]
}
export type hunum = {
  kor: string,
  def: string
}

export type QueryShape = 'en' | 'ko' | 'cn' | 'radical'
export type LitElementConstructor = new (...args: any[]) => LitElement