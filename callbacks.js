const ejs = require('ejs')
const config = require('./config')

const cacheIndexPage = () => {
  const data = { page: 'UF OSC | Home', version: config.VERSION }
  const indexPageData = { indexPage: '' }
  ejs.renderFile('./views/index.ejs', data, { async: false }, (err, str) => {
    if (err) {
      indexPageData.indexPage = '500 INTERNAL SERVER ERROR'
      return
    }
    indexPageData.indexPage = str
  })

  return indexPageData
}

module.exports = {
  callbacks: [cacheIndexPage]
}
