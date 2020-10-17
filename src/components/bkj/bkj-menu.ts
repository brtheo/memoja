import {customElement, html, css, property, LitElement, query} from 'lit-element'

@customElement('bkj-menu')
export class BkjMenu extends LitElement {
  @property({type: Boolean, reflect: true}) openned: boolean = false 
  @query('slot[name="pop"]') $pop: HTMLSlotElement
  private handleShow() {
    this.$pop.classList.toggle('active')
    if(this.openned) {
      this.openned = false
    } else {
      this.openned = true
    }
  }

  static get styles() {
    return css`
      slot[name="pop"] {
        display: none;
      }
      .active {
        display: content;
      }
    `
  }

  render() {
    return html`
      <slot @click=${this.handleShow} ></slot>
      <slot name="pop"></slot>
    `
  }
}