import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement, property, query} from 'lit-element'
import {translate} from 'lit-translate'

import {state} from '../store'
import { flexCol, hanFont, subFont } from '../styles'

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

  private handleHanjaChange(e: CustomEvent) {
    e.stopImmediatePropagation()
    state.setHanjaToFilterOn(e.detail.value)     
  }
  private handleFilterChange(e: CustomEvent) {
    e.stopImmediatePropagation()
    state.setFilter(e.detail.value)
  }

  static get styles() {
    return [flexCol, hanFont, subFont, css`
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
        -webkit-tap-highlight-color: transparent;
      }
      .fab {filter: drop-shadow(0px 0px 5px var(--color));}
      bkj-button.fab, #menu {
        transition: all var(--transitionTiming);
        --buttonBC: var(--color);
      }
      bkj-button.close {
       --buttonFocusOutline: transparent;
       -webkit-tap-highlight-color: transparent;
      }
      .close, .fab {
        --buttonFC: var(--color);
        --buttonHoverFC: var(--color);
        
      }
      bkj-icon {
        fill: var(--bgColorContrasted);
      }
      #menu.expanded {
        background-color: var(--color);
        transform: scale(1);
        right: 0;
        bottom: 0;
      }
      #menu.expanded + bkj-button.fab {
        transform: scale(0);
      }
      #menu {
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
        z-index: 6;
      }
      @media screen and (min-width: 860px) {
        #menu {
          width: 360px;
        }
      }
      .close {
        top: 0;
        right: 0;
        position: absolute;
      }
      header {
        font-size: 1rem;
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
      bkj-select {
        --selectBC: var(--bgColorContrasted);
        font-family: var(--regularFont);
        color: var(--color);
        font-size: 1rem;
        margin: var(--padding) 0;
        --lastRadioRadius: 0;
        --selectOpenedRadius: 0 0 calc(var(--radius)*2) calc(var(--radius)*2);
        --selectDropOffset: -100%;
        --selectRadius: calc(var(--radius)*2)
      }
      bkj-radio-group {
        --radiosBg: var(--bgColorContrasted);
      } 
      bkj-select:first-child > bkj-radio-group {
        font-size: 1.8rem;
      }
    `]
  }

  render() {
    const {handleExpand, hanjas, handleHanjaChange, handleFilterChange} = this

    return html`
      <section id="menu" class="flex-col">
        <header class="sub-font">${translate('FILTER_SETTINGS.TITLE')}</header>
        <main>
        <bkj-select placeholder="Hanja">
          <bkj-radio-group @bkjRadio:changed=${handleHanjaChange} class="han-font">
            ${hanjas.map(hanja => html`<bkj-radio ?checked=${state.hanjaToFilterOn === hanja} value=${hanja}>${hanja}</bkj-radio>`)}
          </bkj-radio-group>
        </bkj-select>
        <bkj-select placeholder="Position">
          <bkj-radio-group @bkjRadio:changed=${handleFilterChange} >
            <bkj-radio ?checked=${state.filter === "start"} value="start">${translate('FILTER_SETTINGS.START')}</bkj-radio>
            <bkj-radio ?checked=${state.filter === "end"} value="end">${translate('FILTER_SETTINGS.END')}</bkj-radio>
            <bkj-radio ?checked=${state.filter === "all"} value="all">${translate('FILTER_SETTINGS.INCLUDE')}</bkj-radio>
          </bkj-radio-group>
        </bkj-select>
        </main>
        <bkj-button round @click=${handleExpand} class="close">
          <bkj-icon slot="icon" name="window-close" size="35px"></bkj-icon>
        </bkj-button>
      </section>
      <bkj-button round @click=${handleExpand} class="fab">
        <bkj-icon slot="icon" name="filter-variant-plus" size="35px"></bkj-icon>
      </bkj-button>
    `
  }
}