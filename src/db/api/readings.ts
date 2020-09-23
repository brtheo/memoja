import {IReading} from '../../types'
import {readings} from './'

export const findReadingByHanja = (hanja: string): string => 
    hanja !== ""
    ? (readings.find((obj: IReading) => obj.hanjas.includes(hanja)) as IReading).hangul 
    : ""
