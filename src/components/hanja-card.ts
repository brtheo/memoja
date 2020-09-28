import {customElement, html, css, property, LitElement, query} from 'lit-element'
import {translate} from 'lit-translate'

import {card} from '../styles'
import { hunum, IHanja } from '../types'

import '../components/character-guidelines'

@customElement('hanja-card')
export class HanjaCard extends LitElement {
  @query('#grid') private $hanja
  @property({type: Object}) definition: IHanja
  private HanjaWriter

  firstUpdated() {
    const docStyle = getComputedStyle(document.documentElement),
          color = docStyle.getPropertyValue('--color')
    this.HanjaWriter = HanziWriter.create(this.$hanja, this.definition.hanja, {
      charDataLoader: async (char, onComplete) => {
        const res = await fetch(`/assets/data/${char}.json`)
        return await res.json()  
      },
      width: 250,
      height: 250,
      padding: 5,
      strokeColor: color,

    })
  }

  private handleDraw() {
    this.HanjaWriter.animateCharacter()
  }

  static get styles() {
    return [card, css`
    header {
      display: flex;
      flex-direction: row;
    }
    header pre {
        margin: 0;
        font-size: .6em;
        font-family: var(--subFont);
        width: fit-content;
        line-height: 1.6em;
        filter: var(--titleOpacity, opacity(0.7));
        color: var(--secondary);
      }
      section {
        display: flex;
        place-content: center;
      }
      bkj-button {
        place-self: baseline;
        --buttonRadius: var(--radius);
        margin-right: 5px;
        padding: calc(var(--padding)/2);
        background-color: var(--bgColorContrasted)
      }
      bkj-button > span {
        font-size: .69em;
      }
      bkj-icon {
        fill: var(--secondary);
        margin-right: 5px
      }
      .details {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto auto;
        place-content: flex-start;
        margin-top: 35px;
        font-size: .6em;
      }
      .korean {
        grid-area: 1 / 1 / auto / auto;
      }
      .strokes {
       grid-area: 1 / 2 / auto / auto;
       margin-left: auto;
      }
      .def {
        grid-area: 2 / 1 / auto / auto;
      }
      .korean, .strokes, .def {
        display: flex;
        flex-direction: column;
        place-self: baseline;
      }
      .strokes span {
        text-align: end;
      }
      .eum {
        color: var(--secondary);
        filter: drop-shadow(0px 0px 5px var(--secondary));
      }
      i {
        filter: opacity(.8);
        font-size: 0.8rem;
        font-family: var(--subFont);
        color: var(--secondary);
      }
      ol {
        padding-inline-start: 20px; 
        margin-top: 0;
     }
     li {
       text-transform: capitalize;
       font-size: .95em;
     }
    `]
  }

  render() {
    const {handleDraw} = this
    return html`
      <header>
        <bkj-button @click=${handleDraw}>
          <bkj-icon name="calligraphy" provider="local"></bkj-icon>
          <span>voir le tracé</span>
        </bkj-button>
        <bkj-button @click=${handleDraw}>
          <bkj-icon name="calligraphy-hand" provider="local"></bkj-icon>
          <span>tracer le caractère</span>
        </bkj-button>
      </header>
      <main>
        <section id="hanja">
          <character-guidelines id="grid"></character-guidelines>
        </section>
        <section class="details">
          <section class="korean">
            <i>${translate("HANJA_CARD.MEANING_PRONUNCIATION")}</i>
            <ol>
              ${this.definition.hunum.map(o => html`<li>${o.def} <span class="eum">${o.kor}</span></li>`)}
            </ol>
          </section>
          <section class="strokes">
          <i>${translate("HANJA_CARD.STROKES_NUMBER")}</i>
          <span>${this.definition.strokes}</span>
          </section>
          <section class="def">
            <i>en</i>
            <ol>
              ${this.definition.def.en.map(english => html`<li>${english}</li>`)}
            </ol>
          </section>
        </section>
      </main>
    `
  }
}