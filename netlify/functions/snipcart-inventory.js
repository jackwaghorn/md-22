const fetch = require("node-fetch");

exports.handler = async function () {
  const secret =
    "ST_YWM2YmI1NWMtOGJmYS00ZmMzLThjMmUtYzQ2ZGNiYmU1ZGRiNjM3NjYwODY0NDgzODQ2ODg4";

  const request = await fetch("https://app.snipcart.com/api/products", {
    headers: {
      Authorization: `Basic ${Buffer.from(secret).toString("base64")}`,
      Accept: "application/json",
    },
  });

  const result = await request.json();

  

  let newItems = Object.values(result.items).map((item) => {
    return {
        name: item.name,
        id: item.userDefinedId,
        inventory: item.stock,
      
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
};
