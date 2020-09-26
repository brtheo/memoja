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

export const insetHanja = css`
  .inset-hanja {
    margin-right: 5px;
    box-shadow: var(--bgColor) 2px 2px 3px inset;
    --buttonH: 30px;
    --buttonW: 30px;
    --buttonRadius: var(--radius);
  }
`