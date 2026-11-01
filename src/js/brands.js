import Swiper from 'swiper'
import { A11y, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '../scss/brands.scss'

const brands = document.querySelector('.brands')

if (brands) {
  const sliderElement = brands.querySelector('.brands__swiper')
  const list = brands.querySelector('.brands__list')
  const toggleButton = brands.querySelector('.brands__toggle')
  const toggleText = brands.querySelector('.brands__toggle-text')
  const mobileScreen = window.matchMedia('(max-width: 767px)')

  let swiper = null

  function syncSwiper() {
    if (mobileScreen.matches && swiper === null) {
      swiper = new Swiper(sliderElement, {
        modules: [A11y, Pagination],
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: brands.querySelector('.brands__pagination'),
          clickable: true
        },
        a11y: {
          paginationBulletMessage: 'Перейти к карточке {{index}}'
        }
      })
    } else if (!mobileScreen.matches && swiper !== null) {
      swiper.destroy(true, true)
      swiper = null
    }
  }

  toggleButton.addEventListener('click', () => {
    const isExpanded = list.classList.toggle('brands__list--expanded')

    toggleButton.classList.toggle('brands__toggle--expanded', isExpanded)
    toggleButton.setAttribute('aria-expanded', String(isExpanded))
    toggleText.textContent = isExpanded ? 'Скрыть' : 'Показать все'
  })

  syncSwiper()
  mobileScreen.addEventListener('change', syncSwiper)
}
