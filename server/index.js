const express = require('express');
const path = require('path');
const connection = require('../database/index.js');
const PORT = 3002;
const app = express();
app.use(express.json());

//controllers

app.get('/loaderio-8227407897b7de001dd385d007efcb6a.txt', (req, res)=>{
  res.send('loaderio-8227407897b7de001dd385d007efcb6a');
});



app.get('/products', (req, res) => {
  // console.log('this is .params', req.params['count']);
  var count = req.query.count;
  var page = req.query.page;
  // console.log('this is .query', req.query.count);
  connection.getProducts (count, page, (err, data)=>{
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(data);
    }
  });
});

app.get('/features', (req, res) => {
  // console.log('this is .params', req.params['count']);
  // console.log('this is .query', req.query.count);
  connection.getFeatures ((err, data)=>{
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(data);
    }
  });
});



app.get('/productsTest/:product_id', (req, res)=>{
  var id = req.params.product_id;
  // console.log(id);
  connection.getProductFeat1 (id, (err, data)=>{
    if (err) {
      console.log('getProductErr', err);
      res.send('getproductErr', err);
    } else {
      var parsed = JSON.parse(data[0][`JSON_OBJECT (\n    'name', products.name,\n    'features', (select json_arrayagg\n      (json_object(\n        'feature', features.feature))\n      FROM features WHERE features.product_id = products.id)\n  )`]);
      res.json(parsed);

    }
  });
});


app.get('/products/:product_id', (req, res)=>{
  var id = req.params.product_id;
  // console.log(id);
  connection.getProductFeat (id, (err, data)=>{
    if (err) {
      console.log('getProductErr', err);
      res.send('getproductErr', err);
    } else {
      // console.log('heres joined data', data);
      var resObj = {
        id: data[0].id,
        name: data[0].name,
        slogan: data[0].slogan,
        description: data[0].description,
        category: data[0].category,
        default_price: data[0].default_price,
        features: []
      };
      for (var i = 0; i < data.length; i++) {
        var obj = {
          feature: data[i].feature,
          value: data[i].value
        };
        resObj.features.push(obj);
      }
      res.json(resObj);

    }
  });
});




app.get('/productsMess/:product_id/styles', (req, res)=>{
  var id = req.params.product_id;
  console.log(id);
  connection.getStylesPhotoSKU (id, (err, styleData)=>{
    if (err) {
      res.send(err);
    } else {
      // console.log(styleData);
      res.json(styleData);
    }
  });
});

app.get('/products/:product_id/styles', (req, res)=>{
  var id = req.params.product_id;
  console.log(id);
  connection.getStylesPhotoSKU (id, (err, styleData)=>{
    if (err) {
      res.send(err);
    } else {
      //create hash of all styleIDs
      var styleIDs = {};
      for (var i = 0; i < styleData.length; i++) {
        styleIDs[styleData[i].id] = styleData[i].id;
      }
      //construct response object
      var resObj = {
        product_id: req.params.product_id,
        results: []
      };

      for (var key in styleIDs) {
        var inObj = {};
        var photos = [];
        var skus = {};
        var photoHash = {};
        var skusHash = {};
        for (var i = 0; i < styleData.length; i++) {
          if (styleData[i].id === styleIDs[key]) {
            inObj.style_id = styleIDs[key];
            inObj.name = styleData[i].name;
            inObj.original_price = styleData[i].original_price;
            inObj.sale_price = styleData[i].sale_price;
            if (photoHash[styleData[i].thumbnail_url] === undefined) {
              photoHash[styleData[i].thumbnail_url] = 'exists';
              photos.push({
                thumbnail_url: styleData[i].thumbnail_url,
                url: styleData[i].url
              });
            }
            if (skusHash[styleData[i].skuID] === undefined) {
              skusHash[styleData[i].skuID] = 'exists';
              var skuObj = {
                quantity: styleData[i].quantity,
                size: styleData[i].size
              };
              skus[styleData[i].skuID] = skuObj;
            }
          }
        }
        inObj.photos = photos;
        inObj.skus = skus;
        resObj.results.push(inObj);
      }
      // console.log(styleIDs);
      res.json(resObj);
    }
  });
});

app.get('/products/:product_id/related', (req, res) => {
  // console.log('this is .params', req.params['count']);
  var id = req.params.product_id;
  console.log('this is ', id);
  connection.getRelated (id, (err, data)=>{
    if (err) {
      res.status(404).send(err);
    } else {
      var result = [];
      for (var i = 0; i < data.length; i++) {
        result.push(data[i].related_product_id);
      }
      res.json(result);
    }
  });
});


app.get('/', (req, res) =>
  res.send('Welcome to our backend Products API!')
);

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});


//NOT USED
// app.get('/products/:product_id', (req, res)=>{
//   var id = req.params.product_id;
//   // console.log(id);
//   connection.getAProduct (id, (err, data)=>{
//     if (err) {
//       console.log('getProductErr', err);
//       res.send('getproductErr', err);
//     } else {
//       console.log(data);
//       connection.getFeatures (id, (err, data2)=>{
//         if (err) {
//           console.log('getFeatureErr', err);
//           res.send ('getFeatureErr', err);
//         } else {
//           var responseObj = data[0];
//           responseObj.features = data2;
//           res.json(responseObj);
//         }
//       });

//     }
//   });
// });