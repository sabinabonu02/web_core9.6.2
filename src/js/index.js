import '../scss/style.scss'
import '../scss/sidebar.scss'

const menu = document.querySelector('#side-menu')
const openButton = document.querySelector('#menu-open')
const closeButton = document.querySelector('#menu-close')
const overlay = document.querySelector('#menu-overlay')
const desktopScreen = window.matchMedia('(min-width: 1440px)')

const menuList = menu.querySelector('.menu-list')

menuList.addEventListener('click', (event) => {
  const target = event.target
  const link = target instanceof Element ? target.closest('a') : null

  if (!link || !menuList.contains(link)) return

  // Пока ссылки-заглушки ведут на #, не прокручиваем страницу наверх.
  if (link.getAttribute('href') === '#') {
    event.preventDefault()
  }

  menuList.querySelectorAll('li.is-active').forEach((item) => {
    item.classList.remove('is-active')
  })
  menuList.querySelectorAll('a[aria-current="page"]').forEach((item) => {
    item.removeAttribute('aria-current')
  })

  link.closest('li').classList.add('is-active')
  link.setAttribute('aria-current', 'page')
})

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
