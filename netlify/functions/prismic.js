const Prismic = require('@prismicio/client')

exports.handler = async function () {
  const client = Prismic.client('http://mollyelizabeth.cdn.prismic.io/api')
  return client
    .query(Prismic.Predicates.at('document.type', 'shop')) // An empty query will return all the documents
    .then(response => {
      let data = response.results

      let newItems = null

      for (let i = 0; i < response.results.length; i++) {
        newItems = Object.values(data).map(item => {
          return {
            id: item
            // .id,
            // name: item.primary.item_title,
            // price: item.primary.price,
            // url: 'https://md-shop-test.netlify.app/.netlify/functions/prismic'
          }
        })
      }

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

// const Prismic = require('@prismicio/client')

// exports.handler = async function () {
//   const client = Prismic.client('http://mollyelizabeth.cdn.prismic.io/api')
//   return client.getSingle('shop').then(function (response) {
//     let newItems = Object.values(response.data.body).map(item => {
//       return {
//         id: item.id,
//         name: item.primary.item_title,
//         price: item.primary.price,
//         url: 'https://md-shop-test.netlify.app/.netlify/functions/prismic'
//       }
//     })

//     return {
//       statusCode: 200,
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify(newItems)
//     }
//   })
// }
