import {customElement, html, css, property, LitElement} from 'lit-element'

@customElement('list-view')
export class ListView extends LitElement {
  @property({type: Boolean}) private ordered: boolean = false
  @property({type: Array}) private items: any[] = []

  static get styles() {
    return css`
      :host {}
        
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    `
  }
  render() {
    return !this.ordered 
      ? html`
        <ul>
          <slot></slot>
        </ul> `
      : html`
        <ol>
          ${this.items.length !== 0
            ? this.items.map(item => html`<list-item>${item}</list-item>`)
            : html`<slot></slot>`}
        </ol>`
  }
}