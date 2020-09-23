import './config/router.config'
import './config/firebase.config'
import './config/assets.config'

import './components/xHeader'

import {initDarkmode} from '@brtheo/darkmode-switcher'
import {registerTranslateConfig, use} from 'lit-translate'
registerTranslateConfig({
  loader: lang => fetch(`/assets/i18n/${lang}.json`).then(res => res.json())
})
if(globalThis.localStorage.getItem('lang'))
  use(globalThis.localStorage.getItem('lang'))
else use(globalThis.navigator.language)
initDarkmode()

