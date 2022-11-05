const horizontalScrollContainer = document.querySelector('.portfolio__cards__scroll')
const btnLeft = document.querySelector('.portfolio__cards__scroll__btn-left')
const btnRight = document.querySelector('.portfolio__cards__scroll__btn-right')
const scrollableWidth = horizontalScrollContainer.scrollWidth
const elementWidth = horizontalScrollContainer.clientWidth
const totalScrollableWidth = (scrollableWidth - elementWidth)

let leftScroll = totalScrollableWidth
let rightScroll = totalScrollableWidth

const swipeLeft = () => {
  horizontalScrollContainer.scrollLeft -= 300
}

const swipeRight = () => {
  horizontalScrollContainer.scrollLeft += 300
}

btnLeft.onclick = () => {
  rightScroll -= 300
  if (rightScroll < totalScrollableWidth) {
    btnLeft.style.display = 'none'
  } else {
    btnLeft.style.display = 'block'
  }
  swipeLeft()
  leftScroll += 300
  if (leftScroll < totalScrollableWidth) {
    btnRight.style.display = 'none'
  } else {
    btnRight.style.display = 'block'
  }
}

btnRight.onclick = () => {
  btnLeft.style.display = 'block'
  leftScroll -= 300
  if (leftScroll < totalScrollableWidth) {
    btnRight.style.display = 'none'
  } else {
    btnRight.style.display = 'block'
  }
  swipeRight()
  rightScroll += 300
  if (rightScroll < totalScrollableWidth) {
    btnLeft.style.display = 'none'
  } else {
    btnLeft.style.display = 'block'
  }
}
