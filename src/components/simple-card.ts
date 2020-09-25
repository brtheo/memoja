import { LitElement, property, html, css, customElement } from "lit-element"
import {card} from '../styles'

@customElement('simple-card')
export class SimpleCard extends LitElement {
  static get styles() {
    return [card, css`
      :host {

      }
    `]
  }
  protected render() {
    return html`
      <slot></slot>
    `
  }
}