import {customElement, html, css, property, LitElement} from 'lit-element'


@customElement('bkj-select')
export class BkjSelect extends LitElement {
  @property({type: String}) placeholder: string = "Select..."
  @property({type: Boolean, reflect: true}) open: boolean = false

  private handleToggle({currentTarget}:{currentTarget: HTMLDetailsElement}) {
    currentTarget.open ? this.open = true : this.open = false
  }
  connectedCallback() {
    super.connectedCallback() 
    this.addEventListener('bkjRadio:clicked', (e: CustomEvent) => {
      e.stopImmediatePropagation()
      this.open = false
    })
  }
  static get styles() {
    return css`
      :host {
        width: 100%;
        color:  teal;
        font-family: var(--regularFont, 'Arial Round MT');
        font-size: 1.5rem;
      }
      :host * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent; 
        cursor: pointer;
      }
      :host :focus {
        outline: none;
      }
      :host summary::-webkit-details-marker {
        display: none;
      }
      details {
        max-width: 100%;
      }
      details:not([open]) > summary:hover {
        filter: brightness(120%);
      }
      details[open] > summary {
        border-radius: var(--selectOpenedRadius, 10px 10px 0 0 )
      }
      summary {
        display: flex;
        place-content: space-between;
        position: relative;
        background-color: var(--selectBC, #fafafa);
        padding: var(--selectPadding, 8px);
        max-width: 100%;
        transition: filter var(--transitionTiming), border-radius var(--transitionTiming);
        border-radius: var(--selectRadius, 10px);
        z-index: 5;
      }
      summary > * {
        align-self: center;
        fill: currentColor;
      }
      nav {
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        transform: scaleY(0);
        transform-origin: top center;
        filter: opacity(0);
        transition: transform var(--transitionTiming), filter var(--transitionTiming);
        z-index: 1;
      }
      details[open] summary > nav {
        transform: scaleY(1) translateY(var(--selectDropOffset, 0));
        filter: opacity(1);
      }
    `
  }
  render() {
    return html`
      <details ?open=${this.open} @toggle=${this.handleToggle}>
        <summary>
          <span>${this.placeholder}</span>
          <bkj-icon name="unfold-less-horizontal" size="20px"></bkj-icon>
          <nav>
            <slot></slot>
          </nav>
        </summary>
      </details>
    `
  }
}