import {customElement, html, css, property, LitElement, query} from 'lit-element'
import {translate} from 'lit-translate'

import {card, contentBetween, flex,ol,subFont,hanFont,fcSecondary,icSecondary,marginRight,contentCenter, selfBase, flexCol, opacity8,contentStart} from '../styles'
import { hunum, IHanja } from '../types'

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
  private handleQuiz() {
    this.HanjaWriter.quiz()
  }

  static get styles() {
    return [card, contentBetween, flex, flexCol,ol,subFont,hanFont,fcSecondary,icSecondary,marginRight,contentCenter, opacity8, selfBase ,contentStart, selfBase, css`
      bkj-button {
        --buttonRadius: var(--radius);
        padding: calc(var(--padding)/2);
        --buttonBC: var(--bgColorContrasted);
        --buttonHoverFC: var(--secondary);
        --buttonFocusOutline: transparent;
      }
      bkj-button > span {
        font-size: .69em;
      }
      .details {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto auto;
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
        grid-area: 2 / 1 / auto / span 2;
      }
      .strokes span {
        text-align: end;
      }
      .eum {
        filter: drop-shadow(0px 0px 5px var(--secondary));
      }
      i {
        font-size: 0.8rem;
      }
     li {
       font-size: .95em;
     }
    `]
  }

  render() {
    const {handleDraw, handleQuiz} = this
    return html`
      <header class="flex content-between">
        <bkj-button icon="before" class="self-base mr5" @click=${handleDraw}>
          <bkj-icon slot="icon" class="mr5 ic-secondary" name="calligraphy" provider="local"></bkj-icon>
          <span>${translate("HANJA_CARD.PLAY_STROKE")}</span>
        </bkj-button>
        <bkj-button icon="before" class="self-base" @click=${handleQuiz}>
          <bkj-icon slot="icon" class="mr5 ic-secondary" name="calligraphy-hand" provider="local"></bkj-icon>
          <span>${translate("HANJA_CARD.WRITE_CHAR")}</span>
        </bkj-button>
      </header>
      <main>
        <section class="flex content-center" id="hanja">
          <character-guidelines id="grid"></character-guidelines>
        </section>
        <section class="details content-start">
          <section class="korean flex-col self-base">
            <i class="opa-8 fc-secondary sub-font">${translate("HANJA_CARD.MEANING_PRONUNCIATION")}</i>
            <ol>
              ${this.definition.hunum.map(o => html`
                <li>
                  <span class="han-font">
                    ${o.def} <span class="eum fc-secondary">${o.kor}</span>
                  </span>
                </li>
              `)}
            </ol>
          </section>
          <section class="strokes flex-col self-base">
          <i class="opa-8 fc-secondary sub-font">${translate("HANJA_CARD.STROKES_NUMBER")}</i>
          <span>${this.definition.strokes}</span>
          </section>
          <section class="def flex-col self-base">
            <i class="opa-8 fc-secondary sub-font">en</i>
            <ol>
              ${this.definition.def.en.map(english => html`<li>${english}</li>`)}
            </ol>
          </section>
        </section>
      </main>
    `
  }
}