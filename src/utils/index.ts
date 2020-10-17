import {LitElementConstructor, QueryShape} from '../types'


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

export const formattedLocalCode = (lang: string) => 
  lang.includes('-')
    ? lang.split('-')[0]
    : lang

export const checkQueryShape = (query: string): QueryShape | false => {
  const [char] = query.split('') // first character of the query eg: hello각하 = en
  const routines = [
    {shape: 'ko', reg: new RegExp(/[ᄀ-\u11fe\u3130-ㆎ\ua960-\ua97e가-\ud7ae\ud7b0-\ud7fe]/)},
    {shape: 'en', reg: new RegExp(/[\u0000-~]/)},
    {shape: 'cn', reg: new RegExp(/[㐀-\u4dbe一-\u9ffe豈-\ufafe]|\ud87e[\udc00-\ude1e]/)},
    {shape: 'radical', reg: new RegExp(/[⼀-\u2fde]/)}
  ]
  const res = routines.find(routine => routine.reg.test(char))
  return res === undefined ? false : res.shape as QueryShape 
}

export const paramsId = () => globalThis.location.href.split('/').reverse()[0]

export const adaptiveFontSize = (word: string) => {
  switch(word.length) {
    case 1: return '4.5em'
    break
    case 2: return '3.5em'
    break
    case 3: return '2.5em'
    break
    case 4: return '1.5em'
    break
    default: return '1em'
    break
  }
}

export const deleteDash = (word: string) => word[word.length-1] === '-' ? word.split('-').join(''): word

export const getLang = globalThis.localStorage.getItem('lang')
export const setLang = (v) => globalThis.localStorage.setItem('lang',v)

export const toDataURL = url => fetch(url)
.then(response => response.blob())
.then(blob => new Promise<string | ArrayBuffer>((resolve, reject) => {
  const reader = new FileReader()
  reader.onloadend = () => resolve(reader.result)
  reader.onerror = reject
  reader.readAsDataURL(blob)
}))