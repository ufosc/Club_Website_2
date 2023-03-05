/* global alert, XMLHttpRequest, IS_NEW, OBJ_ID */

const editUser = (event) => { // eslint-disable-line
  event.preventDefault()
  const XHR = new XMLHttpRequest()

  // Success
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      if (XHR.status !== 200) {
        alert(JSON.parse(XHR.responseText).error)
        return
      }

      alert('User saved succesfully')
      if (IS_NEW) {
        window.location.href = `./user/${JSON.parse(XHR.responseText)._id}`
        return
      }

      window.location.reload()
    }
  }

  // Open Request
  if (IS_NEW) {
    XHR.open('POST', '/api/users')
  } else {
    XHR.open('PUT', `/api/users/${OBJ_ID}`)
  }

  // Retrieve isAdmin as a boolean
  const isAdmin = (document.getElementById('IsAdmin').value === 'true')

  XHR.withCredentials = true
  XHR.setRequestHeader('Content-Type', 'application/json')

  const data = {
    username: document.getElementById('Username').value,
    fullName: document.getElementById('FullName').value,
    role: document.getElementById('Role').value,
    isAdmin
  }

  if (document.getElementById('Password').value !== '') {
    data.password = document.getElementById('Password').value
  }

  XHR.send(JSON.stringify(data))
}

const deleteUser = () => { // eslint-disable-line
  const XHR = new XMLHttpRequest()

  // Success
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      if (XHR.status !== 200) {
        alert(JSON.parse(XHR.responseText).error)
        return
      }

      alert('User deleted succesfully')
      window.location.reload()
    }
  }

  XHR.open('DELETE', `/api/users/${OBJ_ID}`)
  XHR.withCredentials = true
  XHR.setRequestHeader('Content-Type', 'application/json')

  XHR.send()
}

const editBlog = (event) => { // eslint-disable-line
  event.preventDefault()
  const XHR = new XMLHttpRequest()

  // Success
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      if (XHR.status !== 200) {
        alert(JSON.parse(XHR.responseText).error)
        return
      }

      alert('Blog saved succesfully')
      if (IS_NEW) {
        window.location.href = `./blog/${JSON.parse(XHR.responseText)._id}`
        return
      }

      window.location.reload()
    }
  }

  // Open Request
  if (IS_NEW) {
    XHR.open('POST', '/api/blog')
  } else {
    XHR.open('PUT', `/api/blog/${OBJ_ID}`)
  }

  // withCredentials will preserve auth cookie
  XHR.withCredentials = true
  XHR.setRequestHeader('Content-Type', 'application/json')

  XHR.send(JSON.stringify({
    title: document.getElementById('Title').value,
    status: document.getElementById('Status').value,
    previewImg: document.getElementById('Image').value,
    content: document.getElementById('Content').value,
    subtitle: document.getElementById('Subtitle').value,
    author: document.getElementById('Author').value
  }))
}

const deleteBlog = () => { // eslint-disable-line
  const XHR = new XMLHttpRequest()

  // Success
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      if (XHR.status !== 200) {
        alert(JSON.parse(XHR.responseText).error)
        return
      }

      alert('Blog post deleted succesfully')
      window.location.reload()
    }
  }

  XHR.open('DELETE', `/api/blog/${OBJ_ID}`)
  XHR.withCredentials = true
  XHR.setRequestHeader('Content-Type', 'application/json')

  XHR.send()
}
