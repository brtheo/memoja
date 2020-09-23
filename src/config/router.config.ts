import {Router} from '@vaadin/router'
import '../pages/home'

const outlet = document.getElementById('outlet')
const router = new Router(outlet)
router.setRoutes([
  {path: '/', component: 'home-page'},
  {path: '/about', component: 'about-page'},
  {path: '/word/:id', component: 'word-page'},
  {path: '/hanja/:id', component: 'hanja-page'},
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
    case 'About': putOnYourHelmet('About') 
    break
    case 'Word': putOnYourHelmet('Word') 
    break
    case 'Hanja': putOnYourHelmet('Hanja') 
    break

  }
})