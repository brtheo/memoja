import { Router } from '@vaadin/router'
import {customElement, html, css, property, LitElement} from 'lit-element'
import {translate} from 'lit-translate'
import { IWord } from '../types'

@customElement('words-list')
export class WordsList extends LitElement {
  @property({type: Array}) items: IWord[] = []

  private handleExpand(e: Event) {
    e.stopPropagation
    const button = (e.currentTarget as HTMLElement)
    const icon = button.firstElementChild
    button.parentElement.classList.toggle('expanded')
    icon.getAttribute('name') === 'window-close'
      ? icon.setAttribute('name','dots-vertical')
      : icon.setAttribute('name', 'window-close')
  }
  private handleClick(e: Event) {
    e.stopPropagation
    const item = (e.currentTarget as HTMLElement)
    Router.go(`/word/${item.id}`)
  }

  static get styles() {
    return css`
      :host {
        /* height: calc(100vh - 100px);
        max-height: calc(100vh - 100px); */
        overflow-y: scroll;
        overflow-x: hidden;
        width: 100%;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      :host::-webkit-scrollbar {
        display: none;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: flex;
        flex-direction: row;
        place-content: center;
        margin: var(--padding) 0;
        background-color: var(--bgColorContrasted);
        padding: 4px 8px 4px 16px;
        border-radius: calc(var(--radius) *2);
        position: relative;
        box-shadow: var(--shadow);
      }
      .item {
        display: flex;
        flex-direction: column;
        margin-right: auto;
        width: 95%;
        cursor: pointer;
      }
      .item:hover {
        filter: opacity(.9)
      }
      .korean {
        display: flex;
        flex-direction: row;
      }
      .hanja {
        font-size: 1em;
      }
      .hangul {
        font-size: .7em;
        align-self: center;
        filter: opacity(.5);
      }
      .english {
        font-size: .6em;
        filter: opacity(.5);
      }
      .action {
        display: flex;
        place-content: start;
        position: absolute;    
        box-sizing: border-box;   
        right: 35px;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: calc(var(--radius) *2);
        background-color: var(--primary);
        transform: translateX(100%);
        transition: transform var(--transitionTiming), right var(--transitionTiming);
      }
      .action.expanded {
        transform: translateX(0);
        padding: calc(var(--padding) /2);
        right: 0;
      }
      bkj-button.pull {
        align-self: center;
      }
      bkj-icon {
        fill: var(--secondary);
      }
      .commands {
        align-self: center;
        margin-left: auto;
        display: flex;
      }
      .commands bkj-button {
        background-color: var(--bgColorContrasted);
        padding: .5rem;
        margin-right: 10px;
        --buttonRadius: 50%;
      }
    `
  }
  render() {
    const {items, handleExpand, handleClick} = this
    return html`
      <ul>
        ${items.map(item => 
          html`
            <li>
              <section class="item" id=${item.id} @click=${handleClick}>
                <section class="korean">
                  <section class="hanja">${item.hanja}</section>
                  <section class="hangul">${item.hangul}</section>
                </section>
                <section class="english">${item.english}</section>
              </section>
              <section class="action">
                <bkj-button @click=${handleExpand} class="pull">
                  <bkj-icon size="35px" name="dots-vertical"></bkj-icon>
                </bkj-button>
                <section class="commands">
                  <bkj-button>
                    <bkj-icon size="35px" name="playlist-edit"></bkj-icon>
                  </bkj-button>
                  <bkj-button>
                    <bkj-icon size="35px" name="playlist-edit"></bkj-icon>
                  </bkj-button>
                </section>
              </section>
            </li>
        `)}
      </ul
    `
  }
}