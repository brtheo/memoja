import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import {translate} from 'lit-translate'

import {Helmet} from '../utils'

import {findWordsByEnglish, findWordsByHangul, findWordsByHanja} from '../db/api/words'
import {findHanjasByRadical} from '../db/api/radicals'

import { Router } from '@vaadin/router'
import { state } from '../store'


@customElement('search-page')
@Helmet
export class SearchPage extends MobxLitElement {

  private get queryResults() {
    const {queryShape: shape, query} = state
    const routines = [
      {shape: 'en', searchFilter: findWordsByEnglish},
      {shape: 'ko', searchFilter: findWordsByHangul},
      {shape: 'cn', searchFilter: findWordsByHanja},
      // {shape: 'radical', searchFilter: findHanjasByRadical}
    ]
    if(shape !== false) {
      const res = routines.find(routine => routine.shape === shape)
      return res.searchFilter(query)
    }
    else return []
  }

  static get styles() {
    return css`
      :host {
        max-height: max-content;
        display: flex;
        overflow: hidden;
      }
    `
  }
  render() {
    const {queryResults} = this
    return html`
      <words-list .items=${queryResults}>
      </words-list>
    `
  }
}