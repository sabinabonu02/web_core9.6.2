import '../scss/style.scss'
import '../scss/sidebar.scss'
import './brands.js'
import './techniques.js'
import './prices.js'

const menu = document.querySelector('#side-menu')
const openButton = document.querySelector('#menu-open')
const closeButton = document.querySelector('#menu-close')
const overlay = document.querySelector('#menu-overlay')
const desktopScreen = window.matchMedia('(min-width: 1440px)')
const menuList = menu?.querySelector('.menu-list')

if (menu && openButton && closeButton && overlay && menuList) {
  function setMenuOpen(isOpen, { focusClose = false } = {}) {
    menu.classList.toggle('is-open', isOpen)
    menu.setAttribute('aria-hidden', String(!isOpen))
    menu.inert = !isOpen
    openButton.setAttribute('aria-expanded', String(isOpen))
    overlay.hidden = !isOpen || desktopScreen.matches

    if (focusClose && isOpen) {
      closeButton.focus()
    }
  }

  function syncMenuWithScreenSize() {
    setMenuOpen(desktopScreen.matches)
  }

  menuList.addEventListener('click', (event) => {
    const target = event.target
    const link = target instanceof Element ? target.closest('a') : null

    if (!link || !menuList.contains(link)) return

    if (link.getAttribute('href') === '#') {
      event.preventDefault()
    }

    menuList.querySelectorAll('li.is-active').forEach((item) => {
      item.classList.remove('is-active')
    })
    menuList.querySelectorAll('a[aria-current="page"]').forEach((item) => {
      item.removeAttribute('aria-current')
    })

    link.closest('li')?.classList.add('is-active')
    link.setAttribute('aria-current', 'page')
  })

  openButton.addEventListener('click', () => {
    setMenuOpen(true, { focusClose: true })
  })

  closeButton.addEventListener('click', () => {
    if (desktopScreen.matches) return

    setMenuOpen(false)
    openButton.focus()
  })

  overlay.addEventListener('click', () => {
    setMenuOpen(false)
    openButton.focus()
  })

  desktopScreen.addEventListener('change', syncMenuWithScreenSize)

  document.addEventListener('keydown', (event) => {
    if (
      event.key !== 'Escape' ||
      desktopScreen.matches ||
      menu.getAttribute('aria-hidden') !== 'false'
    ) return

    setMenuOpen(false)
    openButton.focus()
  })

  syncMenuWithScreenSize()
}

const servicesContent = document.querySelector('.services_content')
const readMoreButton = document.querySelector('.services_content-readMore')
const readMoreLabel = readMoreButton?.querySelector('span')
const largeScreen = window.matchMedia('(min-width: 1120px)')

if (servicesContent && readMoreButton && readMoreLabel) {
  function setDescriptionExpanded(isExpanded) {
    servicesContent.classList.toggle('is-expanded', isExpanded)
    readMoreButton.setAttribute('aria-expanded', String(isExpanded))
    readMoreLabel.textContent = isExpanded ? 'Скрыть' : 'Читать далее'
  }

  readMoreButton.addEventListener('click', () => {
    const isExpanded = servicesContent.classList.contains('is-expanded')
    setDescriptionExpanded(!isExpanded)
  })

  largeScreen.addEventListener('change', (event) => {
    setDescriptionExpanded(event.matches)
  })

  setDescriptionExpanded(largeScreen.matches)
}
