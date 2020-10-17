import { User } from '@firebase/auth-types'
import {action, observable, computed} from 'mobx'

import {checkQueryShape} from './utils'


class State {
  @observable public query: string = ''
  @action public setQuery = (query: string) => this.query = query
  @computed public get queryShape() {
    return checkQueryShape(this.query)
  }

  @observable public page: string
  @action public setPage = page => this.page = page

  @observable public word: string
  @action public setWord = word => this.word = word

  @observable public filter: 'all' | 'start' | 'end' = 'start'
  @action public setFilter = filter => this.filter = filter

  @observable public hanjaToFilterOn: string
  @action public setHanjaToFilterOn = hanja => this.hanjaToFilterOn = hanja

  @observable public lang: string
  @action public setLang = lang => this.lang = lang

  @observable public mode: 'darkmode' | 'lightmode' = 'lightmode'
  @action public setMode = mode => this.mode = mode

  @observable public user: User 
  @action public setUser = (user: User) => this.user = user
  @action public killUser = () => this.user = undefined

  @observable public favourites: Set<string> = new Set()
  @action public setFavourite = id => this.favourites.has(id) ? this.unsetFavourite(id) : this.favourites.add(id)
  @action public unsetFavourite = id => this.favourites.delete(id)
}

export const state = new State()