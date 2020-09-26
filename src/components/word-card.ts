import { LitElement, property, html, css, customElement } from "lit-element"
import { IWord } from "../types"
import {card} from '../styles'


import './frequency-meter'

@customElement('word-card')
export class WordCard extends LitElement {
  @property() word: IWord
  @property() title: string

  private playListening() {
    const utterance = new SpeechSynthesisUtterance(this.word.hangul)
    utterance.lang = 'ko-KR'
    utterance.rate = .3
    speechSynthesis.speak(utterance)
  }
  get english(): string[] {
    return this.word.english.includes(',') || this.word.english.includes(';')
    ? this.word.english.split(/[;,]+/)
    : [this.word.english]
  }
  static get styles() {
    return [card, css`
      header {
        display: flex;
        flex-direction: row;
      }
      pre {
        margin: 0;
        font-size: .6em;
        font-family: var(--subFont);
        border-bottom: 1px solid var(--secondary);
        width: fit-content;
        line-height: 1.6em;
        filter: var(--titleOpacity, opacity(0.7));
      }
      bkj-button {
        margin: 0 var(--padding);
        align-self: center;
        /* background-color: var(--primary); */
      }
      bkj-icon {
        fill: var(--secondary)
      }
      frequency-meter {
        display: flex;
        align-self: center;
      }

      .korean {
        display: flex;
        flex-direction: row;
      }
      .hanja {
        font-size: var(--hanjaSize, 1.7em);
        margin: var(--centerHanja, none);
      }
      .hangul {
        font-size: 1.1em;
        filter: opacity(.5);
        align-self: center;
        display: var(--displayHangul, block);
      }
      .english {
        font-size: .6em;
        margin: 5px 0 auto 0;
      }
      i {
        filter: opacity(.5);
        font-size: 0.8em;
        font-family: var(--subFont);
      }
      ol {
        padding-inline-start: 20px; 
        margin-top: 0;
     }
     li {
       text-transform: capitalize;
     }

     footer {
      display: flex;
      place-content: flex-start;
      margin-top: auto;
      margin-bottom: var(--padding);
     }
    `]
  }
  render() {
    const {hanja, hangul, freq_deg} = this.word
    const {english} = this
    return html`
      <header>
        <pre>${this.title}</pre>
        <bkj-button @click=${this.playListening}>
          <bkj-icon name="volume-high" ></bkj-icon>
          <bkj-icon></bkj-icon>
        </bkj-button>
        <frequency-meter value=${freq_deg} max=${5666} segments=${5} radius=${2}></frequency-meter>
      </header>
      <main>
        <section class="korean">
          <section class="hanja">${hanja}</section>
          <section class="hangul">${hangul}</section>
        </section>
        <section class="english">
          <i>en</i>
          <ol>
            ${english.map(word => html`<li>${word}</li>`)}
          </ol>
        </section>
      </main>
      <footer>
        <slot name="action"></slot>
      </footer>
    `
  }
}
