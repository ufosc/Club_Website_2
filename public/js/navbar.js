const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')

let count = 1

menuBtn.onclick = () => {
  (count % 2 !== 0)
    ? menu.style = 'display:flex;'
    : menu.style = 'display:none;'

  count++
}
