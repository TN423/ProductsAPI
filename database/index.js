const mysql = require('mysql');

//host.docker.internal
//'18.117.152.91'
//'localhost'
//host?
//don't i need to specify ssh and my pem file somewhere
const connection = mysql.createConnection({
  host: '18.117.152.91',
  user: 'root',
  password: '',
  database: 'ProdList',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!');
  }
});

//Database Queries

var getProducts = function (count, page, callback) {
  var count = count || 5;
  var page = page || 1;
  connection.query(`SELECT * FROM products LIMIT ${count * page}`, function(err, data) {
    callback(err, data);
  } );
};

var getProductFeat = function (id, callback) {
  var query = `
  SELECT
    products.id,
    products.name,
    products.slogan,
    products.description,
    products.category,
    products.default_price,
    features.feature,
    features.value
  FROM products inner join features on (products.id = features.product_id)
  WHERE products.id=${id}`;
  connection.query(query, function(err, data) {
    callback(err, data);
  } );
};

var getProductFeat1 = function (id, callback) {
  var query =
  `SELECT JSON_OBJECT (
    'name', products.name,
    'features', (select json_arrayagg
      (json_object(
        'feature', features.feature))
      FROM features WHERE features.product_id = products.id)
  ) FROM products AS products WHERE id=${id}`;

  connection.query(query, function(err, data) {
    callback(err, data);
  } );
};



// `SELECT JSON_OBJECT(
//   'name', product.name
//   'features', (select json_arrayagg
//     (json_object(
//       'feature', features.feature))
//     FROM features WHERE features.product_id = product.id)
//   ) FROM product AS product WHERE id=${req.params.product_id}`




var getStylesPhotoSKU = function (id, callback) {
  var query = `
  SELECT
    styles.id,
    styles.name,
    styles.sale_price,
    styles.original_price,
    styles.default_style,
    photos.thumbnail_url,
    photos.url,
    skus.skuID,
    skus.quantity,
    skus.size
  FROM styles left outer join photos on styles.id = photos.styleID left outer join skus on styles.id = skus.styleID
  WHERE styles.product_id=${id}`;
  connection.query(query, function(err, data) {
    callback(err, data);
  } );
};

var getRelated = function (id, callback) {

  connection.query(`SELECT * FROM related WHERE related.current_product_id= ${id}`, function(err, data) {
    callback(err, data);
  } );
};



var getFeatures = function (callback) {
  connection.query('SELECT * FROM features limit 10', function(err, data) {
    callback(err, data);
  } );
};


module.exports = {
  getProducts: getProducts,
  getProductFeat: getProductFeat,
  getStylesPhotoSKU: getStylesPhotoSKU,
  getRelated: getRelated,
  getProductFeat1: getProductFeat1,
  getFeatures: getFeatures
};



// getFeatures( (err, succ)=>{
//   if (err) {
//     console.log('fail', err);
//   } else {
//     console.log('success', succ);
//   }
// });