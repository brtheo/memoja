import './config/router.config'
import './config/firebase.config'
import './config/assets.config'

import {initDarkmode} from '@brtheo/darkmode-switcher'
import {registerTranslateConfig, translate, use} from 'lit-translate'
import {formattedLocalCode} from './utils'


import './components/partials/xHeader'
import './components/partials/xFooter'

 import './lib/hanzi-writer.js'

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

if(globalThis.localStorage.getItem('lang'))
  use(globalThis.localStorage.getItem('lang'))
else {
  use(formattedUserLocal)
  globalThis.localStorage.setItem('lang',formattedUserLocal)
}
initDarkmode()