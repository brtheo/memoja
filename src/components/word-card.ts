import { LitElement, property, html, css, customElement } from "lit-element"
import { IWord } from "../types"
import {card, flex, selfCenter, fitW, hanFont, subFont, ol, contentCenter, fcSecondary, icSecondary, opacity5, bgPrimary, opacity8, dropShadow} from '../styles'
import {deleteDash} from '../utils'

@customElement('word-card')
export class WordCard extends LitElement {
  @property({type: Object}) word: IWord

  private playListening() {
    const utterance = new SpeechSynthesisUtterance(this.word.hangul)
    utterance.lang = 'ko-KR'
    utterance.rate = .5
    speechSynthesis.speak(utterance)
  }
  get english(): string[] {
    return this.word.english.includes(',') || this.word.english.includes(';')
    ? this.word.english.split(/[;,]+/)
    : [this.word.english]
  }
  static get styles() {
    return [dropShadow ,icSecondary, card,flex,selfCenter, fitW, hanFont, subFont, ol, contentCenter, fcSecondary, opacity5, opacity8, bgPrimary, css`
      slot[name="title"] {
        margin: 0;
        font-size: .5em !important;
        line-height: 1.6em;
      }
      bkj-button {
        margin: 0 var(--padding);
        --buttonH: 35px;
        --buttonW: 35px;
        --buttonBC: var(--primary);
        --buttonFocusOutline: transparent;
        --buttonHoverFC: transparent;
        filter: drop-shadow(0px 0px 5px var(--primary));
      }
      .hanja {
        font-size: var(--hanjaSize, 1.5em);
        margin: var(--centerHanja, none);
      }
      .hangul {
        font-size: 1em;
        display: var(--displayHangul, block);
      }
      .english {font-size: .6em;}
      i {font-size: .8em;}
     footer {
      margin-top: auto;
      margin-bottom: var(--padding);
     }
     frequency-meter {
       --frequencyMeterColor: var(--secondary)
     }
    `]
  }
  render() {
    const {hanja, hangul, freq_deg} = this.word
    const {english} = this
    return html`
      <header class="flex">
        <slot name="title"></slot>
        <bkj-button round class="self-center" @click=${this.playListening}>
          <bkj-icon slot="icon" class="ic-secondary drop-shadow" name="volume-high" ></bkj-icon>
        </bkj-button>
        <frequency-meter class="flex self-center" value=${freq_deg} max=${5666} segments=${5} radius=${2}></frequency-meter>
      </header>
      <main>
        <section class="korean flex han-font">
          <section class="hanja">${deleteDash(hanja)}</section>
          <section class="hangul self-center opa-8">${hangul}</section>
        </section>
        <section class="english">
          <i class="sub-font fc-secondary opa-8">en</i>
          <ol>
            ${english.map(word => html`<li>${word}</li>`)}
          </ol>
        </section>
      </main>
      <footer class="flex content-start">
        <slot name="action"></slot>
      </footer>
    `
  }
}
