import {customElement, html, css, LitElement, property, TemplateResult, internalProperty} from 'lit-element'
import {unsafeSVG} from 'lit-html/directives/unsafe-svg'


@customElement('frequency-meter')
export class FrequencyMeter extends LitElement {
  @property({type: Number}) height: number = 10
  @property({type: Number}) width: number = 20
  @property({type: Number}) gap: number = 5
  @property({type: Number}) segments: number = 3
  @property({type: Number}) radius: number = 5

  @property() value: number
  @property({type: Number}) max: number

  protected get DEG() {
    const _ = Math.floor(((this.value*this.segments) / this.max))
    return isNaN(_)
      ? 0
      : _
  }

  static get styles() {
    return css`    
      svg {
        filter: drop-shadow(0px 0px 2px var(--primary));
      }  
      rect{
        fill: var(--primary);
        opacity: .2;
        
      }
      rect.clear {
        opacity: 1
      } 
    `
  }
  render() {
    let _: string[] = []
    const {height, width, gap, segments, radius, DEG} = this
    const wholeWidth = (width*segments) + (gap*segments)
    for(let i = 0; i < segments; i++) {
        _.push(`<rect x=${i === 0 ? 0 : (i*width)+(gap*i)} y="0" width=${width} height=${height} rx=${radius} ry=${radius} class="${i<= DEG ? 'clear': ''}" />`)
    }
    return html`
      <svg viewBox="0 0 ${wholeWidth} ${height}" width="${wholeWidth}px" height="${height}px" xmlns="http://www.w3.org/2000/svg">
        ${_.map(rect => html`${unsafeSVG(rect)}`)}
      </svg>
    `
  }
}