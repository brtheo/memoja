import {html, css ,customElement, TemplateResult} from 'lit-element'
import {MobxLitElement} from '@adobe/lit-mobx'
import {translate} from 'lit-translate'
import {switchDarkmode} from '@brtheo/darkmode-switcher'

import {state} from '../../store'



import '../bkj/bkj-icon'
import '../bkj/bkj-button'
import '../search-bar'


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
        background-color: var(--primary);
        height: max-content;
        box-shadow: 1px -5px 20px var(--black);
        padding: var(--padding);
        border-radius: 0 0 25px 25px;
      }
      .branding {
        grid-area: branding;
        display: flex;
        flex-direction: column;
        place-content: flex-start;
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
        place-content: flex-end;
      }
      bkj-button {
        background-color: var(--primary);
        margin-left: var(--padding);
        --buttonW: 35px;
        --buttonH: 35px;
        --buttonRadius: 50%;
        border: solid 1px var(--color);
      }
      bkj-icon {
        fill: var(--color);
      }
      .switcher {
        transition: transform .5s;
        transform: rotate(var(--colorModeSwitcherIconRotate))
      }
      #inputcontainer {
        grid-area: input;
        align-self: center;
        display: flex;
        place-content: center;
      }
      #inputcontainer.shrinked {
        grid-area: branding;
      } 
      search-bar {
        transform: translateY(5px);
      }
      .shrinked search-bar{
        transform: translateY(0px)
      }
    `
  }
  
  protected render() {
    const {handleThemeSwitch} = this
    const brandingSection: TemplateResult = html`
      <section class="branding">
        <h1>
          <bkj-icon name="dictionary" provider="local" size="35px"></bkj-icon>
          Memoja</h1>
        <h2>${translate('HEADER.HANJA_DICTIONNARY')}</h2>
      </section>
    `
    return html`
      ${state.page === 'home'? brandingSection: null}
      <section class="commands">
        <!-- <bkj-button size="35px" transparent rounded>
          <bkj-icon name="account-circle-outline"></bkj-icon>
        </bkj-button> -->
        <bkj-button @click=${handleThemeSwitch} class="switcher">
          <bkj-icon name="theme-light-dark"></bkj-icon>
        </bkj-button>
      </section>
      <section id="inputcontainer" class=${state.page !== 'home' ? 'shrinked' : null }>
        <search-bar></search-bar>
      </section>
    `
  }
}