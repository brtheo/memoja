import { User } from '@firebase/auth-types'
import {action, observable, computed} from 'mobx'

import {checkQueryShape} from './utils'
import firebase, {auth, db} from './config/firebase.config'

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
  @action public async populateFavourites() {
    let favouritesRef = db.collection('favourites').doc(auth.currentUser.uid)
    const doc = await favouritesRef.get()
    this.favourites = doc.exists ? new Set(doc.data().wordID) : new Set([])
  }
  @action public setFavourite = id => {
    let favouritesRef = db.collection('favourites').doc(auth.currentUser.uid)
    if(this.favourites.has(id)) {
      this.unsetFavourite(id)
      favouritesRef.update({
        wordID: firebase.firestore.FieldValue.arrayRemove(id)
      })
    } else {
      this.favourites.add(id)
      favouritesRef.set({wordID: firebase.firestore.FieldValue.arrayUnion(id)}, {merge:true})
    }
  }
  @action public unsetFavourite = id => this.favourites.delete(id)

  @observable public history: Set<string> = new Set()
  @action public async populateHistory() {
    let historyRef = db.collection('history').doc(auth.currentUser.uid)
    const doc = await historyRef.get()
    this.history = doc.exists ? new Set(doc.data().words) : new Set([])
  }
  @action public setHistory = word => {
    let historyRef = db.collection('history').doc(auth.currentUser.uid)
    this.history.add(word)
    historyRef.set({words: firebase.firestore.FieldValue.arrayUnion(word)}, {merge:true})
    
  }
  @action public unsetHistory = word => {
    let historyRef = db.collection('history').doc(auth.currentUser.uid)
    historyRef.update({
      words: firebase.firestore.FieldValue.arrayRemove(word)
    })
    this.history.delete(word)
  }
}

export const state = new State()