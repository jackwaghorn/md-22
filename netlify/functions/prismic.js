const Prismic = require('@prismicio/client')

exports.handler = async function () {
  const client = Prismic.client('http://mollydooner.cdn.prismic.io/api')
  return client.getSingle('shop').then(response => {
    let newItems = Object.values(response.results).map(item => {
      return {
        id: item.id,
        name: item.primary.item_title,
        price: item.primary.price,
        url: 'https://md-shop-test.netlify.app/netlify/functions/prismic'
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
