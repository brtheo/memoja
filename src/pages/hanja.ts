import {MobxLitElement} from '@adobe/lit-mobx'
import {html, css, customElement, query} from 'lit-element'
import { Router, RouterLocation } from '@vaadin/router'

import { findHanjaDefinitionByHanja } from '../db/api/hanjas'
import { findWordsByHanja, findWordsByHanjaStarting, findWordsByHanjaEnding } from '../db/api/words'
import { IHanja, IWord } from '../types'
import {paramsId, Helmet} from '../utils'
import {state} from '../store'

@customElement('hanja-page')
@Helmet
export class HanjaPage extends MobxLitElement {
  @query('#hanja') private $hanja
  private _hanja: string 
  connectedCallback() {
    super.connectedCallback()
    this._hanja = decodeURI(paramsId())
  }
  firstUpdated() {
    state.setHanjaToFilterOn(this.HanjaDefinition.hanja)
  }

  private get HanjaDefinition(): IHanja {
    return findHanjaDefinitionByHanja(this._hanja)
  }

  private get Hanjas(): string[] {
    return [this.HanjaDefinition.hanja]
  }

  private get Items(): IWord[] {
    const {filter} = state
    const routines = [
      {type: 'all', searchFilter: findWordsByHanja},
      {type: 'start', searchFilter: findWordsByHanjaStarting},
      {type: 'end', searchFilter: findWordsByHanjaEnding},
    ]
    const {searchFilter} = routines.find(routine => routine.type === filter)
    return searchFilter(state.hanjaToFilterOn)
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        place-content: center;
        margin-top: 10px;
      }
      hanja-card {
        min-height: 200px;
        background-color: var(--bgColorContrasted);
      }
    `
  }

  render() {
    const {HanjaDefinition, Items, Hanjas} = this
    return html`
      <hanja-card .definition=${HanjaDefinition}></hanja-card>
      <words-list .items=${Items} ?showTitle=${true}></words-list>
      <filtering-menu .hanjas=${Hanjas}></filtering-menu>
    `
  }
}