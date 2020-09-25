import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import {translate} from 'lit-translate'

import {Helmet} from '../utils'

import '../components/words-list'

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
      {shape: 'en', searchMethod: findWordsByEnglish},
      {shape: 'ko', searchMethod: findWordsByHangul},
      {shape: 'cn', searchMethod: findWordsByHanja},
      {shape: 'radical', searchMethod: findHanjasByRadical}
    ]
    if(shape !== false) {
      const res = routines.find(routine => routine.shape === shape)
      return res.searchMethod(query)
    }
    else return []
    /*return shape === 'en'
      ? findWordsByEnglish(query)
      : shape === 'ko'
        ? findWordsByHangul(query)
        : */
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