import '../scss/style.scss'
import '../scss/sidebar.scss'

const menu = document.querySelector('#side-menu')
const openButton = document.querySelector('#menu-open')
const closeButton = document.querySelector('#menu-close')
const overlay = document.querySelector('#menu-overlay')
const desktopScreen = window.matchMedia('(min-width: 1440px)')

function showMenu(isDesktop = false) {
  menu.classList.add('is-open')
  menu.setAttribute('aria-hidden', 'false')
  menu.inert = false
  overlay.hidden = true
  openButton.setAttribute('aria-expanded', 'true')

  if (!isDesktop) {
    closeButton.focus()
  }
}

function hideMenu() {
  if (desktopScreen.matches) return

  menu.classList.remove('is-open')
  menu.setAttribute('aria-hidden', 'true')
  menu.inert = true
  overlay.hidden = true
  openButton.setAttribute('aria-expanded', 'false')
  openButton.focus()
}

function syncMenuWithScreenSize() {
  if (desktopScreen.matches) {
    showMenu(true)
  } else {
    menu.classList.remove('is-open')
    menu.setAttribute('aria-hidden', 'true')
    menu.inert = true
    overlay.hidden = true
    openButton.setAttribute('aria-expanded', 'false')
  }
}

openButton.addEventListener('click', () => {
  menu.classList.add('is-open')
  menu.setAttribute('aria-hidden', 'false')
  menu.inert = false
  overlay.hidden = false
  openButton.setAttribute('aria-expanded', 'true')
  closeButton.focus()
})

closeButton.addEventListener('click', hideMenu)
overlay.addEventListener('click', hideMenu)
desktopScreen.addEventListener('change', syncMenuWithScreenSize)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !desktopScreen.matches) {
    hideMenu()
  }
})

syncMenuWithScreenSize()
