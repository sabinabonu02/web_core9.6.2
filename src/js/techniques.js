import Swiper from 'swiper'
import { A11y, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '../scss/techniques.scss'

const techniques = document.querySelector('.techniques')

if (techniques) {
  const sliderElement = techniques.querySelector('.techniques__swiper')
  const list = techniques.querySelector('.techniques__list')
  const toggleButton = techniques.querySelector('.techniques__toggle')
  const toggleText = techniques.querySelector('.techniques__toggle-text')
  const mobileScreen = window.matchMedia('(max-width: 767px)')
  const pagination = techniques.querySelector('.techniques__pagination')

  let swiper = null

  function syncSwiper() {
    if (mobileScreen.matches && !swiper && sliderElement && pagination) {
      swiper = new Swiper(sliderElement, {
        modules: [A11y, Pagination],
        slidesPerView: 'auto',
        spaceBetween: 16,
        pagination: {
          el: pagination,
          clickable: true
        },
        a11y: {
          paginationBulletMessage: 'Перейти к карточке {{index}}'
        }
      })
    } else if (!mobileScreen.matches && swiper) {
      swiper.destroy(true, true)
      swiper = null
    }
  }

  if (list && toggleButton && toggleText) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = list.classList.toggle('techniques__list--expanded')

      toggleButton.classList.toggle('techniques__toggle--expanded', isExpanded)
      toggleButton.setAttribute('aria-expanded', String(isExpanded))
      toggleText.textContent = isExpanded ? 'Скрыть' : 'Показать все'
    })
  }

  syncSwiper()
  mobileScreen.addEventListener('change', syncSwiper)
}
