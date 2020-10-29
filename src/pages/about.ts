import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import { contentCenter, flex, headingFont } from '../styles'
import { translate, translateUnsafeHTML } from 'lit-translate'
import { Helmet } from '../utils'

@customElement('about-page')
@Helmet
export class AboutPage extends MobxLitElement {
  static get styles() {
    return [flex, headingFont ,css`
      :host {
        margin-top: var(--padding);
        display: flex
      }
      h2 {
        margin: 0;
        margin-bottom: 15px;  
      }
      article {
        background-color: var(--bgColorContrasted);
        padding: var(--padding);
        border-radius: var(--radius);
      }
      section p {
        font-size: 1rem;
      }
      section a {
        text-decoration: none;
        color: var(--secondary)
      }
    `]
  }

  render() {
    return html`
      <article class="flex">
        <section>
          <h2 class="heading-font">${translate('ABOUT.SECTION1.TITLE')}</h2>
          <p>${translate('ABOUT.SECTION1.CONTENT.P1')}</p>
          <p>${translateUnsafeHTML('ABOUT.SECTION1.CONTENT.P2_')}${translate('ABOUT.SECTION1.CONTENT._P2')}</p>
          <p>${translateUnsafeHTML('ABOUT.SECTION1.CONTENT.P3')}</p>
        </section>
      </article>
    `
  }
}