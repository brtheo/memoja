import {customElement, html, css, property, LitElement} from 'lit-element'

@customElement('list-item')
export class ListItem extends LitElement {
  static get styles() {
    return css`
      li {
        display: flex;
        flex-direction: row;
        place-content: center;
        margin: 5px 0;
        background-color: var(--bgColorContrasted);
        padding: 4px 8px 4px 16px;
        border-radius: calc(var(--radius) *2);
        position: relative;
      }
    `
  }
  render() {
    return html`
      <li>
        <slot></slot>  
      </li>
    `
  }
}