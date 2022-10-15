const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('.menu')

let count = 1

menuBtn.onclick = () => {
  (count % 2 !== 0)
    ? menu.style = 'opacity:1;'
    : menu.style = 'opacity:0;'

  count++
}
