const Prismic = require('@prismicio/client')

exports.handler = async function () {
  const client = Prismic.client('http://mollyelizabeth.cdn.prismic.io/api')
  return client
    .query(Prismic.Predicates.at('document.type', 'shop_item')) // An empty query will return all the documents
    .then(function (response) {
      console.log('Documents: ', response.results)
      let data = response.results

      let newItems = Object.values(data).map(item => {
        return {
          __typename: 'Product',
          id: item.id,
          title: item.data.shop_item.product_name.value[0].text,
          price: item.data.shop_item.product_price.value,
          url: 'https://mollydooner.com/.netlify/functions/prismic'
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
