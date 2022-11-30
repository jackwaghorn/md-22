const Prismic = require('@prismicio/client')

exports.handler = async function () {
  const client = Prismic.client('http://mollyelizabeth.cdn.prismic.io/api')
  return client
    .query(Prismic.Predicates.at('document.type', 'shop')) // An empty query will return all the documents
    .then(response => {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(
          Object.values(response.results[0].data.shop.body.value).map(item => {
            return {
              id: item.id,
              title: item['non-repeat'].item_title.value,
              price: item['non-repeat'].price.value,
              url: 'https://mollydooner.com/.netlify/functions/prismic'
            }
          })
        )
      }
    })
}
