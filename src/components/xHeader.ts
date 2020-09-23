import {html, css ,customElement} from 'lit-element'
import {MobxLitElement} from '@adobe/lit-mobx'
import {translate} from 'lit-translate'


import {switchDarkmode} from '@brtheo/darkmode-switcher'


import './bkj-icon'
import './bkj-button'
import './search-bar'


@customElement('x-header')
export class xHeader extends MobxLitElement {

  private handleThemeSwitch() {
    switchDarkmode()
  }

  static get styles() {
    return css`
      :host{
        display: grid;
        grid-template-areas: 
        "branding commands"
        "input input";
        background-color: var(--yellow);
        height: 120px;
        box-shadow: 1px -5px 20px var(--black);
        padding: var(--padding)
      }
      .branding {
        grid-area: branding;
        display: flex;
        flex-direction: column;
        place-content: flex-start;
        color: var(--blue);
        margin: 0 var(--padding)
      }
      .branding h1, .branding h2 {
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0;
        margin-inline-end: 0;
      }
      .branding h1 {
        font-size: 1.6rem;
      }
      .branding h2 {
        font-size: 1.3rem;
        font-family: var(--subFont);
      }
      .commands {
        grid-area: commands;
        display: flex;
        flex-direction: row;
        place-content: center flex-end;
      }
      bkj-button {
        background-color: var(--yellow);
        margin-left: var(--padding)
      }
      bkj-icon {
        fill: var(--blue);
      }
      .inputcontainer {
        grid-area: input;
        align-self: center;
        display: flex;
        place-content: center;
      }
    `
  }
  protected render() {
    const {handleThemeSwitch} = this
    return html`
      <section class="branding">
        <h1>📗 Memoja</h1>
        <h2>${translate('HEADER.HANJA_DICTIONNARY')}</h2>
      </section>
      <section class="commands">
        <bkj-button size="35px" transparent rounded>
          <bkj-icon name="account-circle-outline"></bkj-icon>
        </bkj-button>
        <bkj-button @click=${handleThemeSwitch} size="35px" transparent rounded>
          <bkj-icon name="theme-light-dark"></bkj-icon>
        </bkj-button>
      </section>
      <section class="inputcontainer">
        <search-bar></search-bar>
      </section>
    `
  }
}