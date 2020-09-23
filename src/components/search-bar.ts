import {html, css, customElement} from 'lit-element'
import {MobxLitElement} from '@adobe/lit-mobx'



@customElement('search-bar')
export class SearchBar extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
      }
      input {
        outline: none;
        border: none;
        box-shadow: inset 1px 1px 15px var(--insetShadowColor);
        font-family: var(--regularFont);
        font-size: 1.2rem;
        padding: 5px 35px 5px 15px;
        border-radius: calc(var(--radius)*2);
        background-color: var(--bgColorContrasted);
        color: var(--color);
        width: 75vw;
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
  render() {
    return html`
      <input id="search" type="text"></input>
      <bkj-icon name="magnify" size="20px"></bkj-icon>
    `
  }
}