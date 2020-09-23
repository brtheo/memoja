import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import {translate} from 'lit-translate'

import {Helmet} from '../utils'

import '../components/word-card'

import {findRandomWord} from '../db/api/words'
import { Router } from '@vaadin/router'


@customElement('home-page')
@Helmet
export class HomePage extends MobxLitElement {
  randoms = findRandomWord()
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        place-content: center;
        margin-top: 30px;
      }
      word-card {
        max-width: 450px;
        border-left: solid 7px var(--secondary);
        background-color: var(--bgColorContrasted);
        background-image: url('/assets/images/fan.svg');
        background-position: right -75px bottom -100px;
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: var(--padding);
      }
      .seemore {
        height: fit-content;
        width: fit-content;
        padding: 5px var(--padding);
        border: solid 2px var(--secondary);
        border-radius: 5px;
        background-color: var(--primary);
        margin-left: auto;
      }
    `
  }
  render() {
    const {randoms} = this
    return html`
      <word-card .title=${translate('WORD_CARD.WORD_OF_THE_DAY')} .word=${randoms}>
        <bkj-button 
          color="secondary"
          @click=${() => Router.go(`/word/${randoms.id}`)} 
          slot="action"
          class="seemore">${translate('WORD_CARD.SEE_MORE')}</bkj-button>
      </word-card>
      <word-card .title=${translate('WORD_CARD.WORD_OF_THE_DAY')} .word=${randoms}>
        <bkj-button 
          color="secondary"
          @click=${() => Router.go(`/word/${randoms.id}`)} 
          slot="action"
          class="seemore">${translate('WORD_CARD.SEE_MORE')}</bkj-button>
      </word-card>
    `
  }
}