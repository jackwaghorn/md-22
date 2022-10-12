const Prismic = require("@prismicio/client");

exports.handler = async function () {
  const client = Prismic.client("http://roxanakenjeeva.cdn.prismic.io/api");
  return client
    .query(Prismic.Predicates.at("document.type", "product")) // An empty query will return all the documents
    .then(function (response) {
      console.log("Documents: ", response.results);

      let data = response.results;

      let newItems = Object.values(data).map((item) => {
        return {
            name: item.data.product.name.value[0].text,
            id: item.id,
            price: {
              eur: item.data.product.euro.value,
            gbp: item.data.product.pound.value,
            },
            url: 'https://roxanakenjeeva.com/.netlify/functions/prismic',
            stock: item.data.product.stock.value,
        dimensions: {
          weight: item.data.product.weight.value 
        }
        };
      });

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newItems),
      };
    });
};
