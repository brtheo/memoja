import { MobxLitElement } from '@adobe/lit-mobx'
import { Router } from '@vaadin/router'
import {customElement, html, css, property, LitElement, queryAll} from 'lit-element'
import {translate} from 'lit-translate'
import { state } from '../store'
import { flex, flexCol, contentCenter, selfCenter, contentStart, opacity5, opacity8, marginRight, icSecondary, bgPrimary, hanFont, fcSecondary } from '../styles'
import { IWord } from '../types'

@customElement('words-list')
export class WordsList extends MobxLitElement {
  @property({type: Array}) items: IWord[] = []
  @property({type: Boolean}) showTitle: boolean = false
  @queryAll('.action') $actions

  private handleExpand(e: Event) {
    e.stopPropagation
    const button = (e.currentTarget as HTMLElement)
    const icon = button.firstElementChild
    const found = Array.from<HTMLElement>(this.$actions).find(act => act.classList.contains('expanded') && act !== button.parentElement)
    if(found) {
      found.classList.remove('expanded')
      found.firstElementChild.firstElementChild.setAttribute('name', 'dots-vertical')
    }
    button.parentElement.classList.toggle('expanded')
    icon.getAttribute('name') === 'window-close'
      ? icon.setAttribute('name','dots-vertical')
      : icon.setAttribute('name', 'window-close')
  }
  private handleClick(e: Event) {
    e.stopPropagation()
    window.scrollTo({top: -50, behavior:'smooth'})
    
    const item = (e.currentTarget as HTMLElement)
    Router.go(`/word/${item.id}`)
  }

  private handleFavouritize(e: Event) {
    e.stopPropagation()
    const item = (e.currentTarget as HTMLElement)
    state.setFavourite(item.parentElement.parentElement.dataset.id)
  }

  static get styles() {
    return [flex, flexCol, contentCenter, selfCenter, contentStart, opacity5, opacity8, marginRight, icSecondary, bgPrimary, hanFont, fcSecondary, css`
      :host {
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      :host::-webkit-scrollbar {
        display: none;
      }
      h6 {
        margin: var(--padding);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        margin: var(--padding) 0;
        background-color: var(--bgColorContrasted);
        padding: 4px 8px 4px 16px;
        border-radius: calc(var(--radius) *2);
        position: relative;
        transition: transform var(--transitionTiming)
      }
      li:hover {
        /*transform: skewY(-2.5deg)*/
      }
      .item {
        margin-right: auto;
        width: 95%;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .item:hover {
        filter: opacity(.9);   
      }
      .hanja {font-size: 1em;}
      .hangul {font-size: .7em;}
      .english {
        font-size: .6em;
        text-transform: capitalize;
      }
      .action {
        position: absolute;    
        box-sizing: border-box;   
        right: 35px;
        top: 0;
        width: 35px;
        height: 100%;
        border-radius: calc(var(--radius) *2);
        transform: translateX(100%);
        transition: all var(--transitionTiming);
        z-index: 5;
      }
      .pull {
        --buttonFocusOutline: transparent;
        --buttonBC: var(--primary);
        --buttonHoverBC: transparent;
        --buttonW: 35px;
        --buttonH: 35px;
      }
      .action.expanded {
        transform: translateX(0);
        padding: calc(var(--padding) /2);
        right: 0;
        width: 100%
      }
      .commands {
        margin-left: auto;
      }
      .commands bkj-button {
        --buttonBC: var(--bgColorContrasted);
        /* --buttonW: 50px;
        --buttonH: 50px;  */
        --buttonRadius: var(--radius);
        --buttonPadding: .35rem;
        --buttonFocusOutline: var(--primary);
        --buttonHoverFC: var(--primary);
        position: relative;
      }
      .favourite {
        fill: crimson;
      }
    `]
  }
  render() {
    const {items, handleExpand, handleClick} = this
    return html`
      ${this.showTitle ? html`<h6 class="fc-secondary">${translate("WORDS_LIST.TITLE")} :</h6>`: null}
      <ul>
        ${items.map(item => 
          html`
            <li class="flex content-center" data-id=${item.id}>
              <section class="item flex-col" id=${item.id} @click=${handleClick}>
                <section class="korean flex">
                  <section class="hanja mr5 han-font">${item.hanja}</section>
                  <section class="hangul opa-8 self-center han-font">${item.hangul}</section>
                </section>
                <section class="english opa-5 self-start">${item.english}</section>
              </section>
              ${state.user ? html`
                <section class="action flex content-start bg-primary">
                  <bkj-button round flat @click=${this.handleFavouritize} class="pull self-center">
                    <bkj-icon slot="icon" class=${state.favourites.has(item.id.toString()) ? 'favourite': 'ic-secondary'} name="heart"></bkj-icon>
                  </bkj-button>
                  <!-- <section class="commands flex self-center">
                    <bkj-button icon="before" class="mr5">
                      <span>Add the word</span>
                      <bkj-icon slot="icon" class="ic-secondary" size="35px" name="playlist-edit"></bkj-icon>
                    </bkj-button>
                    <bkj-button icon="before">
                      <span>Add hanjas</span>
                      <bkj-icon slot="icon" class="ic-secondary" size="35px" name="playlist-edit"></bkj-icon>
                    </bkj-button>
                  </section> -->
                </section>
                `:''}
            </li>
        `)}
      </ul>
    `
  }
}