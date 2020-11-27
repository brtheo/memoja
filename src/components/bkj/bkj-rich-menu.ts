class MenuHistory extends Array {
    constructor(...args) {
        super(...args)
    }
    get pathBackward(): Array<string> {
        return this.length > 1 ? this[this.length-2].split('/') : null
    }
    reset() {
        this.length = 0
    }
}
export class BkjRichMenu extends HTMLElement{
    history: MenuHistory = new MenuHistory()
    menuViews: Map<string, HTMLUListElement>
    constructor() {
        super()
        this.createOuterStyle()
        this.attachShadow({mode:'open'}).innerHTML = /*html*/`
            <style>${this.styles}</style>
            <details>
                <summary>
                    <slot name="heading"></slot>
                    <slot name="action"></slot>
                    <nav>
                        <slot id="root"></slot>
                        <slot name="parts" id="parts"></slot>    
                    </nav>
                </summary>
            </details>
        `
    }

    /**
     * Definition of the  DOM elements needed for all the manipulations.
     * Merging of all the UL in one Map object.
     * Hides all the necessary elements to be hidden
     */
    connectedCallback() {
        const $details = this.shadowRoot.querySelector('details')
        const $root = this.shadowRoot.querySelector<HTMLSlotElement>('#root')
        const $parts = this.shadowRoot.querySelector<HTMLSlotElement>('#parts')
        this.menuViews = new Map( $root.assignedElements()
                                    .concat($parts.assignedElements())
                                    .map((ul: HTMLUListElement ) => [ul.dataset.path.split('/')[1], ul])
        )
        
        this.menuViews.forEach((ul: HTMLUListElement) => {
                ul.classList.add('bkj-list')        
            })
        
        this.updateMenu()

        $details.addEventListener('toggle', e =>{ 
            if($details.open){
                this.setAttribute('open','')
                this.menuViews.forEach(ul => ul.style.animation = "")
            }
            else this.removeAttribute('open')
        })
    }   

    /**
     * Render loop, re-update the menu when the sole attribute "path", changed.
     */
    attributeChangedCallback(name, old, path) {
        if(name === 'path') {
            const [from, to] = this.path.split('/')
            this.updateMenu(to)
        }
    }

    static get observedAttributes() {
        return ['path', 'open']
    }
    
    get path() {
        return this.hasAttribute('path')
            ? this.getAttribute('path')
            : 'root'
    }

    set path(v) {
        this.setAttribute('path',v)
    }

    /**
     * Get the menu partial to be displayed from the map object holding all the views
     * @param part Name of the menu partial to diplay at the moment
     */
    private updateMenu(part: string = 'root') {
        Array.from(this.menuViews.get(part).children)
            .filter((li: HTMLElement) => li.hasAttribute('data-path') && li.dataset.path.includes('/'))
            .forEach((li: HTMLElement) => { 
                li.addEventListener('click', (e: Event) => {         
                    e.preventDefault()
                    e.stopImmediatePropagation()
                    this.path = (e.currentTarget as HTMLElement).dataset.path
                    this.history.push(this.path)
                    const [from, to] = this.path.split('/')
                    const [fromBack, toBack] = this.history.pathBackward !== null ? this.history.pathBackward : [null,null]
                    const duration = 3
                    if(to === 'root' || to === fromBack ) {
                        this.menuViews.get(from).style.animation = `menu-slide-to-right .${duration}s forwards`
                        this.menuViews.get(to).style.animation = `menu-slide-from-left .${duration}s forwards`
                    } else{
                        this.menuViews.get(from).style.animation = `menu-slide-to-left .${duration}s forwards`
                        this.menuViews.get(to).style.animation = `menu-slide-from-right .${duration}s forwards`
                    }
                    if(to === 'root') this.history.reset()
                })
            })
    }

    /**
     * Create a global style tag in head holding animations related code
     */
    private createOuterStyle(): void {
        const outerStyles = document.createElement('style')
        outerStyles.innerHTML = this.outerStyles
        this.parentElement.insertAdjacentElement('beforeend',outerStyles)
    }
    get styles(): string {
        return `
            :host {
                --bkj-menu-heading-backcolor: rgba(var(--md-grey-600));
                --bkj-menu-heading-size: 35px;
                --bkj-menu-heading-rad: var(--bkj-menu-heading-size);

                --bkj-menu-backcolor: rgba(var(--md-grey-900), 79);
                --bkj-menu-color: rgb(0,0,0);
                --bkj-menu-width: max-content;
                --bkj-menu-height: auto;
                --bkj-menu-rad: 0px;
                
                width: 100%;
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
            :host details {
                max-width: 100%;
                z-index: 0;
            }
            :host summary{
                height: var(--bkj-menu-heading-size);
                width: var(--bkj-menu-heading-size);
                background-color: var(--bkj-menu-heading-backcolor);
                border-radius: var(--bkj-menu-heading-rad);
                display:flex;
                justify-content: center;
                align-items: center; 
                outline: none;
                position: relative;
                max-width: 100%;
                z-index: 30;
            }
            :host summary::-webkit-details-marker {
                display: none;
            }
            summary > ::slotted(bkj-button) {
                z-index: 60
            }
            summary > nav {
                transition: transform var(--transitionTiming);
                transform: scale(0);
                position: fixed;
                box-sizing: border-box;
                background: var(--bkj-menu-backcolor);
                color: var(--bkj-menu-color);
                border-radius: var(--bkj-menu-rad);
                width: 100vw;
                height: 100vh;
                padding: 10px;
                font-size: 1.2rem;
                overflow: hidden;
                transform-origin: top right;
                top: 0;
                right: 0;
                z-index: 50;
            }
            @media screen and (min-width: 860px) {
                summary > nav{
                    width: 400px;
                    filter: drop-shadow(-2px 0 4px black)
                }
            }
            :host details[open] summary > nav {
                transform: scale(1)
            }
        `
    }
    get outerStyles() {
        return /*css*/`
        ul.bkj-list[slot="parts"] {                
            visibility: hidden;
            position: absolute;
            opacity: 0;
        }
            ul.bkj-list {
                list-style:none;
                padding: 0;
                visibility: visible;
                transform: translateX(0px);
                opacity: 1;
                position: unset;
                place-content: flex-start;
                height: calc(100% - 40px); /* 40px = margin top*/
                display: flex;
                flex-direction: column;
            }
            @-webkit-keyframes menu-slide-from-right{
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    display:none;
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @keyframes menu-slide-from-right{
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    display:none;
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @-webkit-keyframes menu-slide-to-right {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    display:none;
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
            }
            @keyframes menu-slide-to-right {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    display: none;
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
            }
            @-webkit-keyframes menu-slide-from-left {
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    display: none;
                    -webkit-transform: translateX(-100%);
                    
                            transform: translateX(-100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @keyframes menu-slide-from-left {
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    display: none;
                    -webkit-transform: translateX(-100%);
                    
                            transform: translateX(-100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @-webkit-keyframes menu-slide-to-left {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;   
                    display: none;
                    -webkit-transform: translateX(-100%);   
                            transform: translateX(-100%);
                }
            }
            @keyframes menu-slide-to-left {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;   
                    display: none;
                    -webkit-transform: translateX(-100%);   
                            transform: translateX(-100%);
                }
            }
        `
    }
}
customElements.define('bkj-rich-menu',BkjRichMenu)
