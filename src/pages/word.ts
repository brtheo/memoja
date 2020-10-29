import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import  {Router} from '@vaadin/router'
import {translate} from 'lit-translate'

import { IWord } from '../types'
import { state } from '../store'
import { Helmet, paramsId, adaptiveFontSize, deleteDash } from '../utils'
import { findWordById, findWordsByHanja, findWordsByHanjaEnding, findWordsByHanjaStarting } from '../db/api/words'
import { flex, rowWrap, marginRight, maxW, contentStart, subFont, hanFont, fcSecondary, selfCenter, dropShadow} from '../styles'

@customElement('word-page')
@Helmet
export class WordPage extends MobxLitElement {
  private _word: string
  connectedCallback() {
    super.connectedCallback()
    this._word = paramsId()
  }
  firstUpdated() {
    this.style.setProperty('--hanjaSize', adaptiveFontSize(deleteDash(this.Word.hanja)))
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
    return deleteDash(this.Word.hanja).split('')
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
    return [dropShadow, flex, rowWrap, marginRight, maxW, contentStart, subFont, fcSecondary, hanFont, selfCenter, css`
    :host {
        display: flex;
        flex-direction: column;
        place-content: center;
        margin-top: 10px;
      }
      word-card {
        max-width: 450px;
        background-color: var(--bgColorContrasted);
        --frequencyMeterColor: var(--primary);
        --displayHangul: none;
        --centerHanja: 0 auto;
        --titleOpacity: filter(1);
      }
      .detail {
        border-top: 1px solid;
      }
      .detail pre {
        font-size: .5em;
        font-weight: 600;
      }
      bkj-button > span {
        font-size: 1.9em !important;
      }
      .inset-hanja {
        box-shadow: var(--bgColor) 2px 2px 3px inset;
        --buttonH: 30px;
        --buttonW: 30px;
        --buttonRadius: var(--radius);
        --buttonHoverBC: var(--color);
        --buttonFC: var(--secondary);
        --buttonFocusOutline: transparent;

      }
    `]
  }

  render() {
    const {Word, Hanjas, Items, handleClick} = this
    return html`
      <word-card .word=${Word} id=${Word.id}>
        <span slot="title" class="fit-w han-font fc-secondary self-center drop-shadow">${Word.hangul}</span>
        <section class="detail flex content-start row-wrap" slot="action">
          <pre class="sub-font max-w fc-secondary">${translate('WORD_CARD.SEE_HANJA_DETAILS')}</pre>
          ${Hanjas.map(hanja => html`<bkj-button flat class="inset-hanja mr5" @click=${handleClick}><span class="han-font">${hanja}</span></bkj-button>`)}
        </section>
      </word-card>
      <words-list .items=${Items} ?showTitle=${true}></words-list>
      <filtering-menu .hanjas=${Hanjas}></filtering-menu>
    `
  }
}