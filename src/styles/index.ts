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