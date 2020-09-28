import {customElement, html, css, property, LitElement} from 'lit-element'
import {unsafeSVG} from 'lit-html/directives/unsafe-svg'


@customElement('character-guidelines')
export class CharacterGuidelines extends LitElement {
  @property({type: Number}) size: number = 250
  @property({type: Number}) dashed: number = 10
  @property({type: Number}) lines: number = 3
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
    // const {size, dashed, lines, color, diagonals} = this
    // let horizontal, vertical
    // for(let i = lines; i > 0; i--) {//62.5 -> 125 -> 187.5 \ y= 0/250
    //   horizontal += size%i === 0 
    //     ?`<line x1="${size-(size/i)}" x2="${size-(size/i)}" y1="0" y2="${size}" stroke-dasharray="${dashed}" stroke-linecap="round" stroke="${color}" />`
    //     :`<line x1="${size-(size/i+1)}" x2="${size-(size/i+1)}" y1="0" y2="${size}" stroke-dasharray="${dashed}" stroke-linecap="round" stroke="${color}" />`
    //   vertical += size%i === 0 
    //     ?`<line x1="0" x2="${size}" y1="${size-(size/i)}" y2="${size-(size/i)}" stroke-dasharray="${dashed}" stroke-linecap="round" stroke="${color}" />`
    //     : `<line x1="0" x2="${size}" y1="${size-(size/i+1)}" y2="${size-(size/i+1)}" stroke-dasharray="${dashed}" stroke-linecap="round" stroke="${color}" />`
    // }
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" id="grid">
        <line x1="0" y1="0" x2="250" y2="250" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="250" y1="0" x2="0" y2="250" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="125" y1="0" x2="125" y2="250" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="0" y1="125" x2="250" y2="125" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="62.5" y1="0" x2="62.5" y2="250" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="187.5" y1="0" x2="187.5" y2="250" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="0" y1="62.65" x2="250" y2="62.5" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
        <line x1="0" y1="187.5" x2="250" y2="187.5" stroke-dasharray="10" stroke-linecap="round" stroke="#69696959" />
      </svg>
      <slot></slot>
    `
  }
}