import './config/router.config'
import './config/firebase.config'
import './config/assets.config'

import {initDarkmode} from './lib/darkmode-switcher'
import {registerTranslateConfig, translate, use} from 'lit-translate'
import {formattedLocalCode, getLang, setLang} from './utils'
import {state} from './store'



import './components/partials/xHeader'
import './components/partials/xFooter'

 import 'hanzi-writer/dist/hanzi-writer'

const formattedUserLocal = formattedLocalCode(globalThis.navigator.language)

registerTranslateConfig({
  loader: lang => {
    switch(lang) {
      case 'en':
      case 'fr':
        return fetch(`/assets/i18n/${lang}.json`).then(res =>  res.json())
        break
      default:
        return fetch(`/assets/i18n/en.json`).then(res =>  res.json())
        break
    }
    
  }
})

if(getLang){
  use(getLang)
  state.setLang(getLang)
}
else {
  use(formattedUserLocal)
  setLang(formattedUserLocal)
  state.setLang(formattedLocalCode)
}
initDarkmode(mode => 
  mode === 'true' 
  ? state.setMode('darkmode')
  : state.setMode('lightmode')
)