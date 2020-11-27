import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import {translate} from 'lit-translate'
import { Router, RouterLocation } from '@vaadin/router'

import {Helmet} from '../utils'
import {fcSecondary, headingFont, selfCenter, frost} from '../styles'
import {pickOfTheDay} from '../db/api/words'
import {pickOfTheDay as hanjaPickOfTheDay} from '../db/api/hanjas'

@customElement('home-page')
@Helmet
export class HomePage extends MobxLitElement {
  private todayWord = pickOfTheDay()
  private todayHanja = hanjaPickOfTheDay()

  private handleSeeMore() {
    Router.go(`/word/${this.todayWord.id}`)
  }

  static get styles() {
    return [selfCenter, fcSecondary, headingFont, frost, css`
      :host {
        display: flex;
        flex-direction: column;
        place-content: center;
        margin-top: 30px;
      }
      word-card {
        background-image: url('/assets/images/fan.svg');
        background-position: right -75px bottom -100px;
        background-repeat: no-repeat;
        background-size: contain;
        --frequencyMeterColor: var(--primary);
      }
      hanja-card, word-card {
        max-width: 100vw;
        border-left: solid 7px var(--secondary);
        margin-bottom: var(--padding);
        background-color: var(--bgColorContrasted);
      }
     
      
      .seemore {
        --buttonPadding: 5px var(--padding);
        --buttonBorderStyle: solid 2px;
        --buttonFocusOutline: var(--secondary);
        --buttonRadius: var(--radius);
        --buttonBC: var(--primary);
        --buttonFC: var(--color);
        margin-left: auto;
      }
    `]
  }
  render() {
    const {todayWord: randoms, todayHanja: randomHanja, handleSeeMore} = this
    return html`
      <word-card class="frost" .word=${randoms}>
        <span slot="title" class="self-center fc-secondary heading-font">${translate('WORD_CARD.WORD_OF_THE_DAY')}</span>
        <bkj-button 
          @click=${handleSeeMore} 
          slot="action"
          class="seemore">${translate('WORD_CARD.SEE_MORE')}</bkj-button>
      </word-card>
      <hanja-card class="frost" .definition=${randomHanja} home></hanja-card>
    `
  }
}