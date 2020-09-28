import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement, property, query} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import {translate} from 'lit-translate'

import {state} from '../store'
import {insetHanja} from '../styles'


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

  private handleHanjaChange(e: Event) {
    e.stopImmediatePropagation()
    state.setHanjaToFilterOn((e.currentTarget as HTMLSelectElement).value)      
  }
  private handleFilterChange(e: Event) {
    e.stopImmediatePropagation()
    state.setFilter((e.currentTarget as HTMLSelectElement).value)
  }

  static get styles() {
    return [insetHanja, css`
      :host {
        --buttonH: 50px;
        --buttonW: 50px;
        --offset: 16px;
        position: fixed;
        right: var(--offset);
        bottom: var(--offset);
        height: var(--buttonH);
        width: var(--buttonW);
        z-index: 5;
      }
      bkj-button.fab, #menu {
        filter: drop-shadow(0px 0px 5px var(--color));
        transition: all var(--transitionTiming);
      }
      bkj-button.fab, bkj-button.close {
        background-color: var(--color);
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
        right: 0;
        bottom: 0;
      }
      #menu.expanded + bkj-button.fab {
        transform: scale(0);
      }
      #menu {
        background-color: var(--color);
        color: var(--bgColorContrasted);
        height: 200px;
        width: calc(100vw - calc(var(--offset) * 2 ));
        transform: scale(0);
        transform-origin: bottom right;
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-radius: calc(var(--buttonH) / 2); /*size of fab / 2*/
        padding: calc(var(--padding) / 4)var(--padding);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        z-index: 6;
      }
      .close {
        top: 0;
        right: 0;
        position: absolute;
      }
      header {
        font-size: 1rem;
        font-family: var(--subFont);
        margin: 0;
        text-align: center;
      }
      main {
        display: flex;
        flex-direction: column;
        padding: var(--padding) 0;
      }
      main label {
        font-size: 1rem;
        margin-bottom: 5px;
      }
      select {
        display: block;
        font-size: 16px;
        font-family: var(--subFont);
        font-weight: 700;
        color: var(--color);
        line-height: 1.3;
        padding: .6em 1.4em .5em .8em;
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        border: 1px solid var(--bgColor);
        box-shadow: 0 1px 0 1px var(--bgColor);
        border-radius: .5em;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: var(--bgColorContrasted);
        background-image: url('/assets/images/bibimbap.svg');
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .9em auto, 100%;
        cursor: pointer;
      }
      select::-ms-expand {
        display: none;
      }
      select:hover {
        border-color: var(--bgColor);
      }
      select:focus {
        border-color: var(--bgColor);
        box-shadow: 0 0 1px 3px var(--bgColor);
        box-shadow: 0 0 0 3px -moz-mac-focusring;
        color: var(--color);
        outline: none;
      }
      select option {
        font-weight:normal;
      }
    `]
  }

  render() {
    const {handleExpand, hanjas, handleHanjaChange, handleFilterChange} = this
    const {hanjaToFilterOn} = state

    return html`
      <section id="menu">
        <header>${translate('FILTER_SETTINGS.TITLE')}</header>
        <main>
          <label for="hanja">Hanja</label>
          <select name="hanja" @change=${handleHanjaChange}>
            ${hanjas.map(hanja => html`<option value=${hanja}>${hanja}</option>`)}
          </select>
          <label for="position">Position</label>
          <select name="position" @change=${handleFilterChange}>
            <option ?selected=${state.filter === "start"} value="start">${translate('FILTER_SETTINGS.START')}</option>
            <option ?selected=${state.filter === "end"} value="end">${translate('FILTER_SETTINGS.END')}</option>
            <option ?selected=${state.filter === "all"} value="all">${translate('FILTER_SETTINGS.INCLUDE')}</option>
          </select>
        </main>
        <bkj-button @click=${handleExpand} class="close">
          <bkj-icon name="window-close" size="35px"></bkj-icon>
        </bkj-button>
      </section>
      <bkj-button @click=${handleExpand} class="fab">
        <bkj-icon name="filter-variant-plus" size="35px"></bkj-icon>
      </bkj-button>
    `
  }
}