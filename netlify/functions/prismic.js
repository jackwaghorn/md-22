const Prismic = require('@prismicio/client')

exports.handler = async  () => {
  try {
  const client = Prismic.client('http://mollyelizabeth.cdn.prismic.io/api')

  return client
    .query(Prismic.Predicates.at('document.type', 'shop_item')) // An empty query will return all the documents
    .then(function (response) {
      let newItems = Object.values(response.results).map(item => {
        return {
          id: item.id,
          title: item.data.shop_item.product_name.value[0].text,
          price: item.data.shop_item.product_price.value
        }
      })

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItems)
      }
    })
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}
