import {customElement, html, css, property, LitElement} from 'lit-element'

@customElement('search-history')
export class SearchHistory extends LitElement {
  @property({type: Array}) history: string[] = []
  static get styles() {
    return css`
      
    `
  }

  render() {
    return html`
      
    `
  }
}