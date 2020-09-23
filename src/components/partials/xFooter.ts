import {customElement, html, css} from 'lit-element'
import {MobxLitElement} from '@adobe/lit-mobx'
import {translate} from 'lit-translate'

@customElement('x-footer')
export class xFooter extends MobxLitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        place-content: center;
        background-color: var(--secondary);
        height: 100px;
        font-size: 1rem;
        font-family: var(--subFont);
        text-align: center;
      }
    `
  }
  protected render() {
    return html`
      Currently v0.0.0. Released under the MIT License.<br/>
      Copyright © 2020 Memoja
    `
  }
}