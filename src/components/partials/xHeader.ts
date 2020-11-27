import {html, css ,customElement, TemplateResult, query} from 'lit-element'
import {ifDefined} from 'lit-html/directives/if-defined'

import {MobxLitElement} from '@adobe/lit-mobx'
import {translate, use} from 'lit-translate'
import {switchDarkmode} from '../../lib/darkmode-switcher'
import { Router } from '@vaadin/router'

import firebase, {auth} from '../../config/firebase.config'
import {state} from '../../store'
import {setLang, getLang} from '../../utils'
import { frost, contentCenter, contentStart, flexCol, flex, icSecondary, selfCenter, maxW, fitH, contentEnd, subFont, headingFont, animePulse, animeSimpulse, dropShadow, contentAround } from '../../styles'
import { User } from '@firebase/auth-types'


@customElement('x-header')
export class xHeader extends MobxLitElement {

    async connectedCallback() {
    super.connectedCallback()

    await auth.onAuthStateChanged(user => {
      if(user) state.setUser(user)
    })
      
  }

  private handleThemeSwitch(e: CustomEvent) {
    e.preventDefault()
    switchDarkmode(mode => 
      mode === 'true' 
      ? state.setMode('darkmode')
      : state.setMode('lightmode')
    )
  }
  private handleChangeLang(e: CustomEvent) {
    e.stopImmediatePropagation()
    use(e.detail.value)
    setLang(e.detail.value)
    state.setLang(e.detail.value)
  }

  private handleLogout() {
    state.killUser()
    globalThis.localStorage.removeItem('usr_avatar')
    auth.signOut()
  }

  static get styles() {
    return [dropShadow ,flexCol, flex, contentStart, contentCenter, selfCenter, icSecondary, maxW, fitH, contentEnd, subFont, headingFont, animePulse, animeSimpulse, contentAround css`
      :host{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        background-color: var(--primary);
        height: max-content;
        box-shadow: 1px -5px 20px var(--black);
        padding: var(--padding);
        border-radius: 0 0 25px 25px;
        backdrop-filter: blur(30px) saturate(125%);
      }
      .branding {
        margin: 0 var(--padding);
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
      }
      .commands {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      bkj-button {
        background-color: var(--primary);
        --buttonW: 35px;
        --buttonH: 35px;
        --buttonRadius: 50%;
      }
      .switcher {
        transition: transform var(--transitionTiming);
        transform: rotate(var(--colorModeSwitcherIconRotate))
      }
      #inputcontainer {
        width: 90%;
        transition: width var(--transitionTiming);
      }
      #inputcontainer.shrinked {
        width: 85%;
      } 
      search-bar {
        transform: translateY(5px);
      }
      .shrinked search-bar{
        transform: translateY(0px)
      }
      bkj-rich-menu[open] #toggle {
        background-color: var(--bgColor)
      }
      bkj-rich-menu {
        width: max-content;
        font-family: var(--regularFont);
        color: var(--color);
        --bkj-menu-rad: 0;
        --bkj-menu-backcolor: var(--bgColor);
      }
      bkj-rich-menu span {
        padding: 10px;
      }
      bkj-rich-menu bkj-button {
        --buttonBC: var(--primary);
        --buttonFC: var(--primary);
        --buttonHoverFC: var(--primary);
        --buttonFocusOutline: transparent;
      }
      bkj-rich-menu bkj-icon {
         fill: var(--secondary);
      }
      .bkj-list {
        margin-top: 40px;
      }
      bkj-rich-menu li {
        display: flex;
        place-content: start;
        align-items: center;
        font-family: var(--regularFont);
        color: var(--color);
        padding: calc(var(--padding)*.8) calc(var(--padding)/2);
        border-radius: calc(var(--radius)*2);
        background-color: var(--bgColorContrasted);
        margin: calc(var(--padding) / 2) 0;
        transition: filter var(--transitionTiming);
      }
      bkj-rich-menu li:not(#userbox):hover {
        filter: brightness(110%)
      }
      bkj-rich-menu li > bkj-button, bkj-switch {
        margin-right: 10px;
      }
      #userbox {
        place-content: center;
      }
      #userbox.logged bkj-button.navbtn{
        margin: 0px auto 0 20px;
      }
      #userbox bkj-button.navbtn {
        background-color: var(--bgColorContrasted);  
        margin: 0px auto;
        --buttonBorderStyle : 2px solid;
        --buttonFocusOutline: var(--color);
        --buttonPadding: 50px;
        --buttonW: 80px;
        --buttonH: 80px;
        --buttonRadius: 50%;
        --buttonBC: var(--bgColorContrasted);
      }
      #userbox img {
        height: var(--buttonH);
        border-radius: 50%;
        z-index:2;
      }
      #userbox .bubble {
        height: var(--buttonH);
        width: var(--buttonW);
        border-radius: 50%;
        background-color: var(--secondary);
        position: absolute;
        z-index:0;
      } 
      #userbox .bubble:nth-child(2) {
        --offset: 5px;
        height: calc(var(--buttonH) + var(--offset));
        width: calc(var(--buttonW) + var(--offset));
        background-color: var(--primary);
        z-index: 1;
        animation-delay: .1s;
      }
      #userbox .greeting {
        margin-bottom: 10px;
        font-style: italic;
        filter: opacity(0.8);
      }
      .submenu {
        margin-right: 20px
      }
      .submenu bkj-icon {
        fill: var(--primary)
      }
      .submenu bkj-button {
        background-color: var(--bgColor);
        --buttonW: fit-content;
        --buttonH: 35px;
        --buttonRadius: var(--radius);
        margin-bottom: 5px;
        --buttonBC: var(--secondary);
        --buttonFC: var(--primary);
      }
 
      #toggle {
        --buttonFocusOutline: transparent;
        --buttonHoverBC: transparent;
      }
      

      #changelang{
        background-color: transparent;
        padding: 0;
        font-size: .5em;
        
        --selectDropOffset: 45px;
        --selectRadius: calc(var(--radius)*2);
        --selectOpenedRadius: calc(var(--radius)*2) calc(var(--radius)*2) 0 0;
        --firstRadioRadius: 0;
        --selectBC: var(--bgColorContrasted);
        --selectPadding: calc(var(--padding)*0.8) calc(var(--padding)/2);
      }
      bkj-select {
        font-size: 1rem;color: var(--color);
      }
      bkj-radio-group {
        --radiosBg: var(--bgColorContrasted);
      }

      bkj-switch {
        --switchOffset: 5px;
        --switchSize: 30px;
        --switchBaseBC: var(--primary);
        --switchBC: var(--secondary);
        --switchBorder: var(--bgColor);
      }

      li.leave {
        margin-top: auto;
      }
      li.leave bkj-icon {
        fill: crimson;
      }
    `]
  }
  
  protected render() {
    const local = {
      "en":"English",
      "fr":"Français",
      "ko":"한국어",
      "ja":"日本語"
    }
    const {handleThemeSwitch} = this
    const brandingSection: TemplateResult = html`
      <section class="branding flex-col content-start">
        <h1 class="heading-font">
          <bkj-icon name="dictionary" provider="local" size="35px"></bkj-icon>
          Memoja
        </h1>
        <h2 class="sub-font">${translate('HEADER.HANJA_DICTIONNARY')}</h2>
      </section>
    `
    return html`
      ${state.page === 'home'? brandingSection: null}
      <section id="inputcontainer" class=${state.page !== 'home' ? 'flex self-center content-center shrinked' : 'flex self-center content-center' }>
        <search-bar class="max-w"></search-bar>
      </section>
      <section class="commands flex fit-h content-end">

        <bkj-rich-menu>
            <bkj-button id="toggle" round flat slot="heading">
              <bkj-icon slot="icon" class="ic-secondary" name="menu" provider="local"></bkj-icon>
            </bkj-button>
           <ul data-path="/root">
                ${state.user
                  ? html`
                    <li id="userbox" class="flex-col logged">
                      <div class="sub-font greeting">${translate('MENU.GREETING', {name: () => state.user.displayName})}</div>
                      <section class="flex content-around max-w">
                        <bkj-button class="navbtn" round>
                          <div class="bubble anime-pulse"></div>
                          <div class="bubble anime-pulse"></div>
                          <img class="anime-simpulse" slot="icon" src=${globalThis.localStorage.getItem('usr_avatar')} />
                        </bkj-button>
                        <section class="flex-col submenu">
                          <bkj-button icon="after"  @click=${() => Router.go("/favourites")}>
                              <span>${translate('MENU.FAVOURITES')}</span>
                              <bkj-icon slot="icon" class="drop-shadow"  name="view-list-outline"></bkj-icon>
                          </bkj-button>
                          <bkj-button icon="after" disabled>
                              <span>${translate('MENU.PROFILE')} soon...</span>
                              <bkj-icon slot="icon" class="drop-shadow"  name="account-outline"></bkj-icon>
                          </bkj-button>
                        </section>
                      </section>
                    </li>
                  `
                  : html`
                    <li id="userbox" class="flex-col" @click=${() => Router.go('/login')}>
                      <div class="self-center heading-font fit-w greeting">${translate('MENU.LOGIN')}</div>
                      <bkj-button class="navbtn">
                          <bkj-icon slot="icon" class="drop-shadow" size="80px" name="account-outline"></bkj-icon>
                      </bkj-button>
                      
                    </li>
                  `
                }
                <li @click=${() => Router.go('/')}>
                    <bkj-button round  class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="home"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.HOME')}</div>
                </li>
                <li @click=${() => Router.go('/about')}>
                    <bkj-button round  class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="information-variant"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.ABOUT')}</div>
                </li>
                <li data-path="root/options">
                    <bkj-button round class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="cog"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.SETTINGS')}</div>
                </li>
                ${
                  state.user && html`
                    <li class="leave" @click=${this.handleLogout}>
                      <bkj-button round class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="logout"></bkj-icon>
                      </bkj-button>
                      <div>${translate('MENU.LOGOUT')}</div>
                    </li> 
                  `
                }
            </ul>


            <ul slot="parts" data-path="root/options">
                <li data-path="options/root">
                    <bkj-button round class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="chevron-left"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.BACK')}</div>
                </li>
                <li data-path="options/language">
                    <bkj-button round class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="translate"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.LANGUAGE')}</div>
                </li>
                <li data-path="options/theme">
                    <bkj-button class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="palette"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.THEME')}</div>
                </li>
            </ul>
            
            <ul slot="parts" data-path="options/language">
                <li data-path="language/options">
                    <bkj-button round class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="chevron-left"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.SETTINGS')}</div>
                </li>
                <li id="changelang">
                  <bkj-select placeholder=${local[state.lang]}>
                    <bkj-radio-group @bkjRadio:changed=${this.handleChangeLang}>
                      <bkj-radio ?checked=${getLang === 'en'} value="en">${local["en"]}</bkj-radio>
                      <bkj-radio ?checked=${getLang === 'fr'} value="fr">${local["fr"]}</bkj-radio>
                      <bkj-radio ?checked=${getLang === 'ko'} value="ko">${local["ko"]}</bkj-radio>
                      <bkj-radio ?checked=${getLang === 'ja'} value="ja">${local["ja"]}</bkj-radio>
                    </bkj-radio-group>
                  </bkj-select>
                </li>
            </ul>

            <ul slot="parts" data-path="options/theme">
                <li data-path="theme/options">
                    <bkj-button round class="navbtn">
                        <bkj-icon slot="icon" class="drop-shadow" name="chevron-left"></bkj-icon>
                    </bkj-button>
                    <div>${translate('MENU.SETTINGS')}</div>
                </li>
                <li @click=${handleThemeSwitch}>
                    <bkj-switch  ?pressed=${state.mode === "lightmode"}>
                      <bkj-icon slot="on" name="weather-sunny"></bkj-icon>
                      <bkj-icon slot="off" name="weather-night"></bkj-icon>
                    </bkj-switch>
                    <div>${state.mode === 'darkmode' ? translate('MENU.MODE_DARK') : translate('MENU.MODE_LIGHT')}</div>
                </li>
            </ul>

        </bkj-rich-menu>
      </section>
    `
  }
}