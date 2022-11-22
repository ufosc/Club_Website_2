/* global ResizeObserver */
const horizontalScrollContainer = document.querySelector('.portfolio__cards__scroll')
const btnLeft = document.querySelector('.portfolio__cards__scroll__btn-left')
const btnRight = document.querySelector('.portfolio__cards__scroll__btn-right')
const scrollableWidth = horizontalScrollContainer.scrollWidth
const elementWidth = horizontalScrollContainer.clientWidth
let totalScrollableWidth = (scrollableWidth - elementWidth)

let ourScroll = 0

new ResizeObserver(function (entries) {
  const horizontalScrollContainer = document.querySelector('.portfolio__cards__scroll')
  totalScrollableWidth = (horizontalScrollContainer.scrollWidth - horizontalScrollContainer.clientWidth)

  if (ourScroll < totalScrollableWidth) {
    btnRight.style.display = 'block'
    return
  }

  btnRight.style.display = 'none'
  ourScroll = totalScrollableWidth
}).observe(document.querySelector('.portfolio__cards__scroll'))

const swipeLeft = () => {
  horizontalScrollContainer.scrollLeft -= 300
}

const swipeRight = () => {
  horizontalScrollContainer.scrollLeft += 300
}

btnLeft.onclick = () => {
  swipeLeft()
  ourScroll = (ourScroll - 300 >= 0 ? ourScroll - 300 : 0)
  btnLeft.style.display = 'none'

  if (ourScroll > 0) {
    btnLeft.style.display = 'block'
  }

  if (ourScroll < totalScrollableWidth) {
    btnRight.style.display = 'block'
  }
}

btnRight.onclick = () => {
  swipeRight()
  ourScroll += 300
  btnLeft.style.display = 'block'
  btnRight.style.display = 'block'

  if (ourScroll >= totalScrollableWidth) {
    btnRight.style.display = 'none'
  }

  if (ourScroll !== 0) {
    btnLeft.style.display = 'block'
  }
}
