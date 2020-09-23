import {IRadical} from '../../types'
import {radicals} from './'

export const findRadicalsByHanja = (query: string): string[] => 
    query !== ""
        ? radicals
            .filter( obj => obj.hanjas.includes(query))
                .map( obj => obj.radical)
        : []

export const findHanjasByRadical = (query: string): string[] =>
    query !== ''
        ?  (radicals.find( obj => obj.radical === query) as IRadical).hanjas
        : []