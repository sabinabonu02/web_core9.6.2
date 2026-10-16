import '../scss/style.scss'
import '../scss/sidebar.scss'

const menu = document.querySelector('#side-menu')
const openButton = document.querySelector('#menu-open')
const closeButton = document.querySelector('#menu-close')
const overlay = document.querySelector('#menu-overlay')

function openMenu() {
  menu.classList.add('is-open')
  menu.setAttribute('aria-hidden', 'false')
  menu.inert = false
  overlay.hidden = false
  openButton.setAttribute('aria-expanded', 'true')
  closeButton.focus()
}

function closeMenu() {
  menu.classList.remove('is-open')
  menu.setAttribute('aria-hidden', 'true')
  menu.inert = true
  overlay.hidden = true
  openButton.setAttribute('aria-expanded', 'false')
  openButton.focus()
}

openButton.addEventListener('click', openMenu)
closeButton.addEventListener('click', closeMenu)
overlay.addEventListener('click', closeMenu)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    closeMenu()
  }
})
