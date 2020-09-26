import {customElement, html, css, property, LitElement, query} from 'lit-element'
import {card} from '../styles'
import { IHanja } from '../types'


@customElement('hanja-card')
export class HanjaCard extends LitElement {
  @query('#hanja') private $hanja
  @property({type: Object}) definition: IHanja
  private HanjaWriter

  firstUpdated() {
    this.HanjaWriter = HanziWriter.create(this.$hanja, this.definition.hanja, {
      charDataLoader: async (char, onComplete) => {
        const res = await fetch(`/assets/data/${char}.json`)
        return await res.json()  
      },
      width: 250,
      height: 250,
      padding: 5,
    })
  }

  private handleDraw() {
    this.HanjaWriter.animateCharacter()
  }

  static get styles() {
    return [card, css`
      section {
        display: flex;
        place-content: center;
      }
      bkj-button {
        --buttonW: 40px;
        --buttonH: 40px;
        --buttonRadius: 50%;
        background-color: var(--primary);
      }
      bkj-icon {
        fill: var(--secondary);
      }
    `]
  }

  render() {
    const {handleDraw} = this
    return html`
      <header>
        <section id="hanja"></section>
        <bkj-button @click=${handleDraw}>
          <bkj-icon name="play-button" provider="local" size="20px"></bkj-icon>
        </bkj-button>
      </header>
    `
  }
}