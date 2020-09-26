import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import {translate} from 'lit-translate'
import { Router, RouterLocation } from '@vaadin/router'

import {Helmet} from '../utils'

import '../components/word-card'
import '../components/simple-card'

import {findRandomWord} from '../db/api/words'
import {state} from '../store'



@customElement('home-page')
@Helmet
export class HomePage extends MobxLitElement {
  private randoms = findRandomWord()

  private handleSeeMore() {
    Router.go(`/word/${this.randoms.id}`)
  }

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
        --frequencyMeterColor: var(--primary);
      }
      simple-card {
        max-width: 450px;
        height: 420px;
        border-left: solid 7px var(--secondary);
        background-color: var(--bgColorContrasted);
        background-image: url('/assets/images/dessert.svg');
        background-position: right -65px bottom -15px;
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: var(--padding);
      }
      simple-card:nth-child(1) {
        background-image: url('/assets/images/dessert.svg');
      }
      simple-card:nth-child(2) {
        background-image: url('/assets/images/bibimbap.svg');
      }
      simple-card:nth-child(3) {
        background-image: url('/assets/images/bulgogi.svg');
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
    const {randoms, handleSeeMore} = this
    return html`
      <word-card .title=${translate('WORD_CARD.WORD_OF_THE_DAY')} .word=${randoms}>
        <bkj-button 
          @click=${handleSeeMore} 
          slot="action"
          class="seemore">${translate('WORD_CARD.SEE_MORE')}</bkj-button>
      </word-card>
      <simple-card>
        Learning ressources
      </simple-card>
      <simple-card>
        Lorem ipsum
      </simple-card>
      <simple-card>
        Dolor sit amet
      </simple-card>
    `
  }
}