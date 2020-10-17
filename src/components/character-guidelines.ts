import {customElement, html, css, property, LitElement} from 'lit-element'
import {unsafeSVG} from 'lit-html/directives/unsafe-svg'


@customElement('character-guidelines')
export class CharacterGuidelines extends LitElement {
  @property({type: Number}) size: number = 250
  @property({type: Number}) dashed: number = 10
  @property({type: Number}) sections: number = 4
  @property({type: String}) color: string = "#69696959"
  @property({type: Boolean}) diagonals: boolean = false

  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
      }
      ::slotted(svg) {
        position: absolute;
      }
    `
  }

  render() {
    const {size, dashed, sections, color, diagonals} = this
    let horizontal, vertical
    const cellSize = size/(sections+1)
    for(let i = sections; i > 0; i--) {//62.5 -> 125 -> 187.5 \ y= 0/250
      horizontal+= /*html*/`<line x1="${cellSize*i}" x2="${cellSize*i}" y1="0" y2="${size}" stroke-dasharray="${dashed}" stroke-linecap="round" stroke="#69696959" />`
      vertical+= /*html*/`<line y1="${cellSize*i}" y2="${cellSize*i}" x1="0" x2="${size}" stroke-dasharray="${dashed}" stroke-linecap="round" stroke="#69696959" />`
    }
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" id="grid">
        ${unsafeSVG(horizontal+vertical)}
      </svg>
      <slot></slot>
    `
  }
}