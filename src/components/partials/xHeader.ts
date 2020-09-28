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
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        background-color: var(--primary);
        height: max-content;
        box-shadow: 1px -5px 20px var(--black);
        padding: var(--padding);
        border-radius: 0 0 25px 25px;
      }
      .branding {
        display: flex;
        flex-direction: column;
        place-content: flex-start;
        margin: 0 var(--padding);
        flex-grow: 1;
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
        display: flex;
        flex-direction: row;
        place-content: flex-end;
        height: fit-content;
        position: absolute;
        top: var(--padding);
        right: var(--padding);
      }
      bkj-button {
        background-color: var(--primary);
        --buttonW: 35px;
        --buttonH: 35px;
        --buttonRadius: 50%;
      }
      bkj-icon {
        fill: var(--secondary);
      }
      .switcher {
        transition: transform var(--transitionTiming);
        transform: rotate(var(--colorModeSwitcherIconRotate))
      }
      #inputcontainer {
        align-self: center;
        display: flex;
        place-content: center;
        width: 90%;
        transition: width var(--transitionTiming);
      }
      #inputcontainer.shrinked {
        width: 85%;
      } 
      search-bar {
        transform: translateY(5px);
        width: 100%;
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
          Memoja
        </h1>
        <h2>${translate('HEADER.HANJA_DICTIONNARY')}</h2>
      </section>
    `
    return html`
      ${state.page === 'home'? brandingSection: null}
      <section id="inputcontainer" class=${state.page !== 'home' ? 'shrinked' : null }>
        <search-bar></search-bar>
      </section>
      <section class="commands">
        <!-- <bkj-button>
          <bkj-icon name="account-circle-outline"></bkj-icon>
        </bkj-button> -->
        <bkj-button @click=${handleThemeSwitch} class="switcher">
          <bkj-icon name="menu" provider="local"></bkj-icon>
        </bkj-button>
      </section>
    `
  }
}