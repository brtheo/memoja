import {Router} from '@vaadin/router'

import {state} from '../store'


import '../pages/home'
import '../pages/search'
import '../pages/word'
import '../pages/hanja'

const footer = document.querySelector('footer')
const outlet = document.getElementById('outlet')
const router = new Router(outlet)
router.setRoutes([
  {path: '/', component: 'home-page', action: () => {state.setPage('home'); footer.classList.remove("hidden")}},
{path: '/search', component: 'search-page',  action: () => {state.setPage('search');/* footer.classList.add("hidden") */}},
  {path: '/about', component: 'about-page',  action: () => {state.setPage('about')}},
  {path: '/word/:id', component: 'word-page',  action: () => {state.setPage('word')}},
  {path: '/hanja/:id', component: 'hanja-page',  action: () => {state.setPage('hanja')}},
])

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

  }
})