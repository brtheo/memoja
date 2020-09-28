import {css} from 'lit-element'
export const card = css`
  :host {
    display: flex;
    flex-direction: column;
    place-content: center flex-start;
    box-shadow: var(--shadow); 
    padding: var(--padding);
    color: var(--color);
    background-color: var(--bgColor);
    border-radius: var(--radius);
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
export const flex = css`.flex {display: flex;}`
export const rowWrap = css`.rowWrap {flex-flow: row wrap;}`
export const flexCol= css`
  .flex-col {
    display: flex;
    flex-direction: column;
  }
`
export const contentCenter = css`.content-center {place-content: center;}`
export const contentStart = css`.content-start {place-content: flex-start;}`

export const maxW = css`.max-w{width:100%}`

export const hanFont = css`.han-font{font-family:var(--hanFont)}`
export const subFont = css`.sub-font{font-family:var(--subFont)}`
export const headingFont = css`.han-font{font-family:var(--headingFont)}`

export const marginRight = css`.mr5 {margin-right: 5px}`
export const marginLeft = css`.ml5 {margin-left: 5px}`