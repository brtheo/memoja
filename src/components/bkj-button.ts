type Color = "primary" | "secondary"
export class BkjButton extends HTMLElement {
  constructor(){
    super()
    this.attachShadow({mode:'open'})
    this.render()
  }
  get rounded(): boolean {
    return this.hasAttribute('rounded')
  }
  get size(): string | boolean {
    return this.hasAttribute('size') 
      ? this.getAttribute('size')
      : false
  }
  get color(): Color {
    return this.hasAttribute('color')
      ? (this.getAttribute('color') as Color)
      : 'primary'
  }
  get transparent(): boolean {
    return this.hasAttribute('transparent')
  }

  protected setSize() {
    return this.size
     ? `width: ${this.size};height: ${this.size};`
     : ''
  }

  protected setBackgroundColor() {
    return this.transparent
      ? `background-color: transparent`
      : `background-color: var(--${this.color})`
  }

  render() {
    this.shadowRoot.innerHTML =  /*html*/`
      <style>
        button {
          display: flex;
          place-content: center;
          align-items: center;
          outline: unset;
          border: 0px;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .05rem;
          color: var(--color);
          transition: filter .5s;
          font-family: var(--regularFont);
          ${this.setSize()}
          ${this.setBackgroundColor()}
        }
        button:hover {
          ${this.rounded ? '': 'filter: drop-shadow(0px 0px 5px var(--yellow))'}
        }
        :host {
          display: block;
          transition: filter .5s;
          ${this.rounded ? `border-radius: 50%;`: ''}
          ${this.setSize()}
        }
        :host(:hover) {
          filter: sepia(1);
        }
      </style>
      <button>
        <slot></slot>
      </button>
    `
  }
}
customElements.define('bkj-button', BkjButton)