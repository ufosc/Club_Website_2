const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')

let count = 1

menuBtn.onclick = () => {
  (count % 2 !== 0)
    ? menu.style = 'display:flex;'
    : menu.style = 'display:none;'

  count++
}

let previousWidth = document.body.clientWidth

document.defaultView.addEventListener('resize', e => {
  if (document.body.clientWidth >= 601) {
    menu.style = 'display:flex;'
  } else if (previousWidth >= 601) {
    menu.style = 'display:none;'
  }
  previousWidth = document.body.clientWidth
})
