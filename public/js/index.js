/* global XMLHttpRequest, alert, turnstile */
const horizontalScrollContainer = document.querySelector('.portfolio__cards__scroll')
const btnLeft = document.querySelector('.portfolio__cards__scroll__btn-left')
const btnRight = document.querySelector('.portfolio__cards__scroll__btn-right')
const scrollableWidth = horizontalScrollContainer.scrollWidth
let totalScrollableWidth = (scrollableWidth - horizontalScrollContainer.clientWidth)

const setScrollButtons = () => {
  totalScrollableWidth = (horizontalScrollContainer.scrollWidth - horizontalScrollContainer.clientWidth)
  if (horizontalScrollContainer.scrollLeft === 0) {
    btnLeft.style.display = 'none'
    btnRight.style.display = 'block'
    return
  }
  if (horizontalScrollContainer.scrollLeft === totalScrollableWidth) {
    btnLeft.style.display = 'block'
    btnRight.style.display = 'none'
    return
  }
  if (horizontalScrollContainer.scrollLeft > 0) {
    btnLeft.style.display = 'block'
  }
  if (horizontalScrollContainer.scrollLeft < totalScrollableWidth) {
    btnRight.style.display = 'block'
  }
}

onresize = setScrollButtons // eslint-disable-line
horizontalScrollContainer.addEventListener('scroll', setScrollButtons)

btnLeft.onclick = () => {
  horizontalScrollContainer.scrollLeft -= 300
}

btnRight.onclick = () => {
  horizontalScrollContainer.scrollLeft += 300
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
