import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import { Helmet, toDataURL } from '../utils'
import { contentBetween, contentCenter, flex, flexCol, maxW } from '../styles'

import firebase, {auth} from '../config/firebase.config'
import { state } from '../store'

const provider = new firebase.auth.GoogleAuthProvider()

@customElement('login-page')
@Helmet
export class LoginPage extends MobxLitElement {

  async connectedCallback() {
    super.connectedCallback()  
    await auth.onAuthStateChanged( async (user) => {
      if(user) {
        state.setUser(user)
        const photoURL = await toDataURL(user.photoURL)
        if(!globalThis.localStorage.getItem('usr_avatar')) globalThis.localStorage.setItem('usr_avatar', photoURL.toString()) 
        Router.go('/')
      }
    })
  }

  private handleGoogleLogin() {
    auth.signInWithPopup(provider)
  }
  static get styles() {
    return [flex, flexCol, contentCenter, maxW, contentBetween, css`
      :host {
        margin-top: var(--padding);
        display: flex
      }
      article {
        background-color: var(--bgColorContrasted);
        padding: var(--padding);
        border-radius: var(--radius);
      }
      form > * {
        margin: var(--padding) 0;
      }
    `]
  }

  render() {
    return html`
      <article class="flex content-center max-w">
        <form class="flex-col">
          <input type="text" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <section class="flex content-between">
            <bkj-button>Connexion</bkj-button>
            <bkj-button @click=${this.handleGoogleLogin}><bkj-icon slot="icon" provider="local" name="google"></bkj-icon></bkj-button>
          </section>
        </form>
      </article>
    `
  }
}