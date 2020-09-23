import { LitElement } from "lit-element"

type LitElementConstructor = new (...args: any[]) => LitElement

export function Helmet<T extends LitElementConstructor>(
  constructor: T
): T {
  return class extends constructor {
    public connectedCallback(): void {
      super.connectedCallback()
      const [title] = this.constructor.name.split('Page')
      dispatchEvent(new CustomEvent('helmet', {detail: title}))
    }
  }
}
