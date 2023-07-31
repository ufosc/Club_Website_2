/* global ResizeObserver, XMLHttpRequest, alert, turnstile */
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

  if (ourScroll < totalScrollableWidth + 300) {
    btnRight.style.display = 'block'
  }
}

btnRight.onclick = () => {
  swipeRight()
  ourScroll += 300
  btnLeft.style.display = 'block'
  btnRight.style.display = 'block'

  if (ourScroll >= totalScrollableWidth + 300) {
    btnRight.style.display = 'none'
  }

  if (ourScroll !== 0) {
    btnLeft.style.display = 'block'
  }
}

// eslint-disable-next-line
const sendEmail = (event) => {
  event.preventDefault()
  const XHR = new XMLHttpRequest()

  // Success
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      if (XHR.status !== 200) {
        alert(JSON.parse(XHR.responseText).error)
        return
      }

      alert('Message sent succesfully. Check your email (& spam folder) for confirmation of receipt.')
    }
  }

  XHR.open('POST', './api/contact')
  XHR.setRequestHeader('Content-Type', 'application/json')
  XHR.send(JSON.stringify({
    FirstName: document.getElementById('FirstName').value,
    LastName: document.getElementById('LastName').value,
    Email: document.getElementById('Email').value,
    Message: document.getElementById('Message').value,
    Token: turnstile.getResponse(document.getElementById('ts-captcha'))
  }))
}
