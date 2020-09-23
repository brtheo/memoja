import DEFS from '../definitions.json'
import READINGS from '../readings.json'
import WORDS from '../words.json'
import RADICALS from '../radicals.json'

export const GetDatabase = (name: string) => 
    JSON.parse(globalThis.localStorage.getItem(name) as string)

export const UpdateDatabase = (name: string, data: any) => 
    globalThis.localStorage.setItem(name, JSON.stringify(data))

export const defs = DEFS
export const readings = READINGS
export const  words = WORDS
export const radicals = RADICALS