import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement, query} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import { Helmet, toDataURL } from '../utils'
import { contentAround, contentCenter, flex, flexCol, maxW, opacity8 } from '../styles'

import firebase, {auth} from '../config/firebase.config'
import { state } from '../store'
import { translate } from 'lit-translate'
import { BkjField } from '../components/bkj/bkj-field'

const provider = new firebase.auth.GoogleAuthProvider()

@customElement('signin-page')
@Helmet
export class SigninPage extends MobxLitElement {
  @query("bkj-field[type='email']") $email: BkjField
  @query("bkj-field[type='password']") $password: BkjField
  async connectedCallback() {
    super.connectedCallback()  
    
  }

  private handleSignIn() {
    const email = this.$email.value
    const password = this.$password.value
    auth.createUserWithEmailAndPassword(email, password)
    .then(_ => {
      auth.signInWithEmailAndPassword(email, password)
      .then( _ => {
        auth.onAuthStateChanged(user => {
          if(user) {
            const user = auth.currentUser
            user.updateProfile({
              displayName: user.email,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/memoja-1d38e.appspot.com/o/kimchi.png?alt=media&token=20e259af-9ff4-47da-8252-c41ff82c63f5'
            }).then(function() {
              Router.go("/")
            })
          }
        })
      })
    })
  }
  static get styles() {
    return [flex, flexCol, contentCenter, maxW, opacity8, contentAround, css`
      :host {
        margin-top: var(--padding);
        display: flex
      }
      article {
        background-color: var(--bgColorContrasted);
        padding: var(--padding);
        border-radius: var(--radius);
      }
      form {
        width: 250px
      }
      form > * {
        margin: calc(var(--padding)/2) 0;
      }
      form > #action  {
        place-items: center
      }
      form > #action > * {
        margin: calc(var(--padding)/2) 0;
      }
      .info {
        font-size: .8rem;
      }
      bkj-field {
        --fieldFont: var(--regularFont);
        --labelFont: var(--headingFont);
        --labelColor: var(--color);
        --inputColor: var(--primary);
        --inputBC: var(--bgColor);
        --fieldFocusOutline: var(--secondary);
      }
      bkj-button {
        --buttonBC: var(--primary);
        --buttonFocusOutline: var(--secondary);
        --buttonHoverFC: var(--secondary);
        --buttonFC: var(--color);
      }
      bkj-button[flat] {
        --buttonFocusOutline: transparent;
        --buttonHoverFC: var(--primary);
        --buttonHoverBC: var(--secondary);
        --buttonFC: var(--color);
      }
    `]
  }

  render() {
    return html`
      <article class="flex content-center max-w">
        <form class="flex-col">
          <bkj-field type="email" label=${translate("LOGIN.EMAIL")}></bkj-field>
          <bkj-field type="password" label=${translate("LOGIN.PASSWORD")}></bkj-field>
          <section id="action" class="flex-col content-center">
            <section class='flex content-around max-w'>
              <bkj-button @click=${this.handleSignIn}>${translate("LOGIN.SIGNIN")} !</bkj-button>
            </section>
          </section>
        </form>
      </article>
    `
  }
}