import {html, css, customElement, query} from 'lit-element'
import {MobxLitElement} from '@adobe/lit-mobx'
import {Router} from '@vaadin/router'
import {translate} from 'lit-translate'


import {state} from '../store'

@customElement('search-bar')
export class SearchBar extends MobxLitElement {
  @query('#search') private searchInput: HTMLInputElement

  constructor() {
    super()
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)

    document.addEventListener('searchInputValue:update', (e: CustomEvent) => {})
  }

  private handleFocus() {
    if(state.page !== 'search') {
      state.setPage('search')
      Router.go(`/search`)
    } 
  }
  private handleKeyup() {
    let timeout
    globalThis.clearTimeout(timeout)
    timeout = globalThis.setTimeout(
      () => state.setQuery(this.searchInput.value.toLowerCase()),
    1000)
    
  }

  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
        place-content: center;
        transition: transform .25s ease;
      }
      input {
        outline: none;
        border: none;
        box-shadow: inset 1px 1px 15px var(--insetShadowColor);
        font-family: var(--regularFont);
        font-size: 1.2rem;
        padding: 5px 15px;
        border-radius: calc(var(--radius)*2);
        background-color: var(--bgColorContrasted);
        color: var(--color);
        width: 100%;
      }
      bkj-icon {
        justify-self: flex-end;
        align-self: center;
        display: flex;
        place-content: center;
        transform: translateX(-50%);
        right: 0;
        position: absolute;
        fill: var(--color);
        filter: opacity(0.7);
        transition: fill 0.5s, filter .5s;
      }
      input:focus + bkj-icon{
        fill: var(--secondary);
        filter: opacity(1);
      }
    `
  }
  protected render() {
    const {handleFocus, handleKeyup: handleKeyDown} = this
    return html`
      <input @focus=${handleFocus} @keyup=${handleKeyDown} id="search" type="text" autocomplete="false" placeholder=${translate('HEADER.SEARCH_PLACEHOLDER')}></input>
      <bkj-icon name="magnify" size="20px"></bkj-icon>
    `
  }
}