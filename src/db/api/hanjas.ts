import {IHanja} from '../../types'
import { defs } from './'

export const findHanjaDefinitionByHanja = (query: string): IHanja =>
    query !== ""
        ? defs.find(obj => obj.hanja === query) as IHanja
        : {} as IHanja

export const pickOfTheDay = (): IHanja => defs[ Math.floor(Date.now()/86400000) % defs.length ] as IHanja