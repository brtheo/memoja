import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement, property, query} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import {translate} from 'lit-translate'


import {state} from '../store'

import {insetHanja} from '../styles'
import { BkjButton } from './bkj/bkj-button'



@customElement('filtering-menu')
export class FilteringMenu extends MobxLitElement {
  @property({type: Array}) hanjas: string[]
  @query('#menu') private $menu: HTMLElement

  connectedCallback() {
    super.connectedCallback()
  }

  private handleExpand() {
    this.$menu.classList.toggle('expanded')
  }
  private handleClick(e: Event) {
    const button = (e.currentTarget as HTMLButtonElement)
    const hanja = button.firstElementChild.textContent
    state.setHanjaToFilterOn(hanja)
  }

  private handleChange(e: Event) {
    const radio = (e.currentTarget as HTMLInputElement)
    state.setFilter(radio.value)
    console.log(radio.value)
  }

  static get styles() {
    return [insetHanja, css`
      :host {
        --buttonH: 50px;
        --buttonW: 50px;
        position: fixed;
        right: 20px;
        bottom: 20px;
        height: var(--buttonH);
        width: var(--buttonW);
        z-index: 5;
      }
      bkj-button:nth-child(1) {
        filter: drop-shadow(0px 0px 5px var(--color));
        background-color: var(--color);
        transition: transform var(--transitionTiming);
      }
      bkj-button {
        --buttonRadius: 50%;
        background-color: var(--primary);
      }
      bkj-icon {
        fill: var(--bgColorContrasted)
      }
      #menu.expanded {
        transform: scale(1);
        bottom: -20px;
        right: -20px;
        border-radius: calc(var(--radius) * 2);
      }
      #menu.expanded + bkj-button:nth-child(1) {
        transform: scale(5)
      }
      #menu {
        background-color: var(--bgColorContrasted);
        height: 200px;
        width: 100vw;
        transform: scale(0);
        transition: all var(--transitionTiming);
        transform-origin: bottom right;
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        padding: var(--padding);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        z-index: 6;
      }
      .close {
        bottom: 20px;
        right: 20px;
        position: absolute;
      }
      pre {
        font-size: 1rem;
        font-family: var(--subFont);
        border-bottom: solid 1px var(--secondary);
        width: min-content;
        margin: 0;
      }
      main {
        display: flex;
        flex-direction: row;
        padding: var(--padding) 0;
      }
      .inset-hanja {
        --buttonH: 50px;
        --buttonW: 50px;
      }
      .selected {
        border: 2px dashed var(--secondary);
      }
      main span {
        font-size: 2rem;
      }
      fieldset {
        font-size: .8rem;
        display: flex;
      }
      fieldset:nth-child(2) {
        display: flex;
        flex-direction: column;
      }
    `]
  }

  render() {
    const {handleExpand, hanjas, handleClick, handleChange} = this
    const {hanjaToFilterOn} = state

    const filters = html`
      <section>
        <input type="radio" id="start" value="start" name="filters" @change=${handleChange} checked/>
        <label for="start">${translate('FILTER_SETTINGS.START')}</label>
      </section>
      <section>
        <input type="radio" id="end" value="end" name="filters" @change=${handleChange} />
        <label for="end">${translate('FILTER_SETTINGS.END')}</label>
      </section>
      <section>
        <input type="radio" id="all" value="all" name="filters" @change=${handleChange} />
        <label for="all">${translate('FILTER_SETTINGS.INCLUDE')}</label>
      </section>
    `

    return html`
      <bkj-button @click=${handleExpand}>
        <bkj-icon name="filter-variant-plus" size="35px"></bkj-icon>
      </bkj-button>
      <section id="menu">
        <pre>${translate('FILTER_SETTINGS.TITLE')}</pre>
        <main>
          <fieldset>
            <legend>Hanja</legend>
            ${
              hanjas.map(hanja => html`
                <bkj-button 
                  class=${
                    hanja === hanjaToFilterOn 
                      ? 'inset-hanja selected'
                      : 'inset-hanja'
                  } 
                  @click=${handleClick}>
                  <span>${hanja}</span>
              </bkj-button>
              `)
            }
          </fieldset>
          <fieldset>
            <legend>Position</legend>
            ${filters}
          </fieldset>
        </main>
        <bkj-button @click=${handleExpand} class="close">
          <bkj-icon name="window-close" size="35px"></bkj-icon>
        </bkj-button>
      </section>
    `
  }
}