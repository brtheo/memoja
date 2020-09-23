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
}