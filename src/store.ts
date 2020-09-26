import {action, observable, computed} from 'mobx'

import {checkQueryShape} from './utils'


class State {
  @observable public query: string = ''
  @action public setQuery = (query: string) => this.query = query
  @computed public get queryShape() {
    return checkQueryShape(this.query)
  }

  @observable public page: string
  @action public setPage = (page: string) => this.page = page

  @observable public word: string
  @action public setWord = (word: string) => this.word = word

  @observable public filter: 'all' | 'start' | 'end' = 'start'
  @action public setFilter = (filter) => this.filter = filter

  @observable public hanjaToFilterOn: string
  @action public setHanjaToFilterOn = (hanja) => this.hanjaToFilterOn = hanja

  
  
}

export const state = new State()