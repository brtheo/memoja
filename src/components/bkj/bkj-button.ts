import { customElement, LitElement, property, html, css} from "lit-element"
import {noSelect} from '../../styles'


@customElement('bkj-button')
export class BkjButton extends LitElement {
  static get styles() {
    return [noSelect, css`
      button {
        display: flex;
        place-content: center;
        align-items: center;
        outline: unset;
        border: 0px;
        cursor: pointer;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: .05rem;
        color: var(--color);
        font-family: var(--regularFont);
        padding: 0;
        background-color: transparent;
        width: var(--buttonW);
        height: var(--buttonH);
        border-radius: var(--buttonRadius);
      }
      :host {
        transition: filter .5s;
        display: flex;
        width: max-content;
        height: max-content;
        border-radius: var(--buttonRadius);
      }
      :host(:hover) {
        filter: hue-rotate(55deg);
      }
    `]
  }
  render() {
    return html`
      <button class="noSelect">
        <slot></slot>
      </button>
    `
  }
}