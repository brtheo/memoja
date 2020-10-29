import {css} from 'lit-element'
export const card = css`
  :host {
    display: flex;
    flex-direction: column;
    place-content: center flex-start;
    box-shadow: var(--shadow); 
    padding: calc(var(--padding)*0.65) var(--padding);
    color: var(--color);
    background-color: var(--bgColor);
    border-radius: var(--radius);
    border-left: solid 7px var(--secondary);
  }
`
export const noSelect = css`
  .noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
`

export const ol = css`
  ol {
    padding-inline-start: 20px; 
    margin-top: 0;
  }
  li {
    text-transform: capitalize;
  }
`
export const frost = css`
@supports(backdrop-filter: blur(30px)) {
  .frost {
    backdrop-filter: blur(30px) saturate(125%);
  }
}
`
export const dropShadow = css`.drop-shadow {filter: drop-shadow(0px 0px 5px var(--secondary));}`
export const flex = css`.flex {display: flex;}`
export const rowWrap = css`.row-wrap {flex-flow: row wrap;}`
export const flexCol= css`
  .flex-col {
    display: flex;
    flex-direction: column;
  }
`
export const opacity5 = css`.opa-5 {filter: opacity(.5)}`
export const opacity8 = css`.opa-8 {filter: opacity(.8)}`

export const icSecondary = css`.ic-secondary{fill:var(--secondary)}`
export const fcSecondary = css`.fc-secondary{color:var(--secondary)}`
export const bgPrimary = css`.bg-primary{background-color:var(--primary)}`

export const contentBetween = css`.content-between{place-content: space-between}`
export const contentAround= css`.content-around{place-content: space-around}`
export const contentCenter = css`.content-center {place-content: center;}`
export const contentEnd = css`.content-end {place-content: flex-end;}`
export const contentStart = css`.content-start {place-content: flex-start;}`
export const selfCenter = css`.self-center{align-self: center}`
export const selfBase = css`.self-base{place-self:baseline}`
export const maxW = css`.max-w{width:100%}`
export const fitW = css`.fit-w{width:fit-content}`
export const fitH = css`.fit-h{height:fit-content}`
export const hanFont = css`.han-font{font-family:var(--hanFont); font-size: 1.3em}`
export const subFont = css`.sub-font{font-family:var(--subFont)}`
export const headingFont = css`.heading-font{font-family:var(--headingFont)}`

export const marginRight = css`.mr5 {margin-right: 5px}`
export const marginLeft = css`.ml5 {margin-left: 5px}`

export const animePulse = css`
  .anime-pulse {
    animation: animepulse 1s ease-in-out infinite alternate;
  }
  @keyframes animepulse {
      from {
        transform: scale(.8);
        filter: opacity(.4);
      }
      to {
        transform: scale(1.2);
        filter: opacity(.7);
      }
    }
`

export const animeSimpulse = css`
  .anime-simpulse {
    animation: simpulse 1s ease-in-out .5s infinite alternate;
  }

  @keyframes simpulse {
    from {
      transform: scale(1);
      }
    to {
      transform: scale(1.04);
      filter: saturate(110%)
    }
  }
`