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
        border: solid 2px var(--blue);
        font-family: var(--regularFont);
        font-size: 1.2rem;
        padding: 5px 35px 5px 15px;
        border-radius: var(--radius);
        background-color: var(--white);
        color: var(--black);
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
        fill: var(--black);
        filter: opacity(0.7);
        transition: fill 0.5s, filter .5s;
      }
      input:focus + bkj-icon{
        fill: var(--blue);
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