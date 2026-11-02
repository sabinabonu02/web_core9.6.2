import Swiper from 'swiper'
import { A11y, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import '../scss/prices.scss'

const prices = document.querySelector('.prices')

if (prices) {
  const sliderElement = prices.querySelector('.prices__swiper')
  const pagination = prices.querySelector('.prices__pagination')
  const mobileScreen = window.matchMedia('(max-width: 767px)')

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

  syncSwiper()
  mobileScreen.addEventListener('change', syncSwiper)
}
