import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'
import { Helmet } from '../utils'
import { contentCenter, flex, headingFont } from '../styles'
import { auth } from '../config/firebase.config'
import {state} from '../store'
import { findWordById } from '../db/api/words'


@customElement('favourites-page')
@Helmet
export class FavouritesPage extends MobxLitElement {

  private get favouritesList() {
    return [...state.favourites].map(id => findWordById(id))
  }

  static get styles() {
    return [flex, headingFont ,css`
      :host {
        max-height: max-content;
        display: flex;
        overflow: hidden;
      }
      article {
        background-color: var(--bgColorContrasted);
        padding: var(--padding);
        border-radius: var(--radius);
      }
    `]
  }

  render() {
    return html`
      <words-list .items=${this.favouritesList}></words-list>
    `
  }
}