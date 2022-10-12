const Prismic = require('@prismicio/client')

exports.handler = async function () {
  const client = Prismic.client('http://mollyelizabeth.cdn.prismic.io/api')
  return client
    .getSingle('shop')
    .then(function (response) {
      console.log(response)
      let data = response.results[0].data.body
      let newItems = Object.values(data).map(item => {
        return {
          id: '1'
          // .id,
          // name: item.primary.item_title,
          // price: item.primary.price,
          // url: 'https://md-shop-test.netlify.app/.netlify/functions/prismic'
        }
      })

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newItems)
      }
    })
}
