import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import {state} from '../store'

import {auth} from '../config/firebase.config'
import { translate } from 'lit-translate'
import { flex, headingFont, icSecondary, marginLeft, maxW } from '../styles'


@customElement('search-history')
export class SearchHistory extends MobxLitElement {

  async connectedCallback() {
    super.connectedCallback()
    auth.onAuthStateChanged(async user => {
      if(user) {
        await state.populateHistory()
      }
    })
  }

  private handleDeleteHistoryEntry({currentTarget}: {currentTarget: HTMLElement}) {
    const div = currentTarget.parentElement.firstElementChild
    const word = (div as HTMLElement).dataset.word
    state.unsetHistory(word)
  }
  private handleSetQuery({currentTarget}: {currentTarget: HTMLElement}) {
    const word = currentTarget.dataset.word
    state.setQuery(word)
  }

  static get styles() {
    return [flex, maxW, headingFont,marginLeft, icSecondary, css`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
      .history-word {
        background-color: var(--primary);
        margin: var(--padding);
        padding: calc(var(--padding) /2);
        border-radius: var(--radius);
        font-size: 1rem;
      }
      bkj-button {
        --buttonBC: var(--bgColorContrasted);
        --buttonHoverFC: var(--secondary);
        --buttonFocusOutline: transparent;
        --buttonH: 24px;
        --buttonW: 24px;
      }
    `]
  }

  render() {
    return html`
    <h4 class='max-w heading-font'>${translate('HISTORY.TITLE')}</h4>
      ${[...state.history].map(word => html`
      <section class='history-word flex'>
        <div data-word=${word} @click=${this.handleSetQuery}>${word}</div>
        <bkj-button @click=${this.handleDeleteHistoryEntry} round class='ml5'>
          <bkj-icon slot='icon' name='window-close' class='ic-secondary'></bkj-icon>
        </bkj-button>
      </section>`)}
    `
  }
}