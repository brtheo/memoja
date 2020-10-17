import {IWord} from '../../types'
import {words} from './'

export const findWordById = (query: string): IWord => words.find( obj => obj.id.toString() === query) as IWord

export const findWordsByHanjaStarting = (query: string): IWord[] => 
    query !== ""
        ? words.filter( obj => obj.hanja.startsWith(query))
        : []
        
export const findWordsByHanjaEnding = (query: string): IWord[] => 
    query !== ""
        ? words.filter( obj => obj.hanja.endsWith(query))
        : []

export const findWordsByHanja = (query: string): IWord[] => 
    query !== "" 
        ? words.filter( obj => obj.hanja.includes(query))
        : []

export const findWordsByHangul = (query: string): IWord[] => 
    query !== "" 
        ?  words.filter( obj => obj.hangul.startsWith(query))
        : []

export const findWordsByEnglish = (query: string): IWord[] =>
    Number.isInteger(parseInt(query))
        ?  words.filter( obj => obj.english.toLowerCase().includes(query))
        : query.length > 1 
            ? words.filter( obj => obj.english.toLowerCase().startsWith(query))
            : []

export const findRandomWord = (): IWord => findWordById(
    Math.floor(
        Math.random() * words.length-1
        ).toString()
    )

export const pickOfTheDay = (): IWord => words[ Math.floor(Date.now()/86400000) % words.length ]