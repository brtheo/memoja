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

  @observable public currentWord: string
  
  
}

export const state = new State()