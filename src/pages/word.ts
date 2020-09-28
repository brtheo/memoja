import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement, property, internalProperty} from 'lit-element'
import  {Router} from '@vaadin/router'
import {translate} from 'lit-translate'


import {Helmet, paramsId, adaptiveFontSize} from '../utils'
import {state} from '../store'

import { IWord } from '../types'
import { findWordById, findWordsByHanja, findWordsByHanjaEnding, findWordsByHanjaStarting } from '../db/api/words'

import {flexCol, flex, rowWrap, marginRight, maxW, contentCenter, contentStart, subFont} from '../styles'


import '../components/filtering-menu'


@customElement('word-page')
@Helmet
export class WordPage extends MobxLitElement {
  private _word: string
  connectedCallback() {
    super.connectedCallback()
    this._word = paramsId()
  }
  firstUpdated() {
    this.style.setProperty('--hanjaSize', adaptiveFontSize(this.Word.hanja))
    state.setHanjaToFilterOn(this.Hanjas[0])
  }
  private handleClick(e: Event) {
    const button = (e.currentTarget as HTMLButtonElement)
    const hanja = button.firstElementChild.textContent
    Router.go(`/hanja/${hanja}`)
  }
  private get Word(): IWord {
    return findWordById(this._word)
  }

  private get Hanjas(): string[] {
    return this.Word.hanja.split('')
  }

  private get Items(): IWord[] {
    const {filter} = state
    const routines = [
      {type: 'all', searchFilter: findWordsByHanja},
      {type: 'start', searchFilter: findWordsByHanjaStarting},
      {type: 'end', searchFilter: findWordsByHanjaEnding},
    ]
    const {searchFilter} = routines.find(routine => routine.type === filter)
    return searchFilter(state.hanjaToFilterOn)
  }
  static get styles() {
    return [ css`
    :host {
        display: flex;
        flex-direction: column;
        place-content: center;
        margin-top: 10px;
      }
      word-card {
        max-width: 450px;
        background-color: var(--bgColorContrasted);
        margin-bottom: var(--padding);
        --frequencyMeterColor: var(--primary);
        --displayHangul: none;
        --centerHanja: 0 auto;
        --titleOpacity: filter(1);
      }
      .detail {
        display: flex;
        place-content: flex-start;
        flex-flow: row wrap;
        border-top: 1px solid;
      }
      .detail pre {
        font-family: var(--subFont);
        color: var(--secondary);
        font-size: .5em;
        font-weight: 600;
        width: 100%;
      }
      bkj-button > span {
        font-size: 1.5em;
      }
      .inset-hanja {
        margin-right: 5px;
        box-shadow: var(--bgColor) 2px 2px 3px inset;
        --buttonH: 30px;
        --buttonW: 30px;
        --buttonRadius: var(--radius);
      }
    `]
  }

  render() {
    const {Word, Hanjas, Items, handleClick} = this
    return html`
      <word-card cardTitle=${Word.hangul} .word=${Word} id=${Word.id}>
        <section class="detail" slot="action">
          <pre>${translate('WORD_CARD.SEE_HANJA_DETAILS')}</pre>
          ${Hanjas.map(hanja => html`<bkj-button class="inset-hanja" @click=${handleClick}><span>${hanja}</span></bkj-button>`)}
        </section>
      </word-card>
      <words-list .items=${Items}></words-list>
      <filtering-menu .hanjas=${Hanjas}></filtering-menu>
    `
  }
}