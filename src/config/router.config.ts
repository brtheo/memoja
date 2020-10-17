import {Router} from '@vaadin/router'

import {state} from '../store'

import '../components/bkj/bkj-button'
import '../components/bkj/bkj-icon'
import '../components/bkj/bkj-rich-menu'
// import '../components/bkj/bkj-menu'
import '../components/bkj/bkj-radio-group'
import '../components/bkj/bkj-radio'
import '../components/bkj/bkj-select'
import '../components/bkj/bkj-switch'
import '../components/partials/xHeader'
import '../components/partials/xFooter'
import '../components/character-guidelines'
import '../components/filtering-menu'
import '../components/hanja-card'
import '../components/word-card'
import '../components/frequency-meter'
import '../components/words-list'
import '../components/simple-card'
import '../components/search-history'
import '../components/search-bar'

import '../pages/home'
import '../pages/search'
import '../pages/word'
import '../pages/hanja'
import '../pages/about'
import '../pages/login'


const footer = document.querySelector('footer')
const outlet = document.getElementById('outlet')
const router = new Router(outlet)
router.setRoutes([{
  path: '/',
  children: [
    {path: '', component: 'home-page', action: () => {state.setPage('home'); footer.classList.remove("hidden")}},
  {path: '/search', component: 'search-page',  action: () => {state.setPage('search');/* footer.classList.add("hidden") */}},
  {path: '/about', component: 'about-page',  action: () => {state.setPage('about')}},
  {path: '/word/:id', component: 'word-page',  action: () => {state.setPage('word')}},
  {path: '/hanja/:id', component: 'hanja-page',  action: () => {state.setPage('hanja')}},
  {path: '/login', component: 'login-page',  action: () => {state.setPage('login')}},
  ]
}])

function putOnYourHelmet(name) {
  const base = "📗 Memoja |"
  document.title = `${base} ${name}`
}

addEventListener('helmet', (e: CustomEvent) => {
  e.stopImmediatePropagation()
  switch(e.detail) {
    case 'Home': putOnYourHelmet('Home') 
    break
    case 'Search': putOnYourHelmet('Search')
    break
    case 'About': putOnYourHelmet('About') 
    break
    case 'Word': putOnYourHelmet('Word') 
    break
    case 'Hanja': putOnYourHelmet('Hanja') 
    break
    case 'Login': putOnYourHelmet('Login') 
    break

  }
})