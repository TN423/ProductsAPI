-- DROP DATABASE ProdList;
CREATE DATABASE ProdList;
USE ProdList;

CREATE TABLE products (
id INT ,
name VARCHAR(1000),
slogan VARCHAR(1000),
description VARCHAR(2000),
category VARCHAR(1000),
default_price VARCHAR(25),
PRIMARY KEY (id)
);

CREATE TABLE features (
id INT,
product_id INT,
feature VARCHAR(100),
value VARCHAR(100),
PRIMARY KEY (id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE styles (
id INT,
product_id INT,
name VARCHAR(50),
sale_price VARCHAR(300),
original_price VARCHAR(100),
default_style VARCHAR(30),
PRIMARY KEY (id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE photos (
id INT,
styleID INT,
url VARCHAR(1000),
thumbnail_url VARCHAR(1000),
PRIMARY KEY (id),
FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE skus (
skuID INT,
styleID INT,
size VARCHAR(25),
quantity INT,
PRIMARY KEY (id),
FOREIGN KEY (styleID) REFERENCES styles(id)
);

CREATE TABLE related (
id INT,
current_product_id INT,
related_product_id INT,
PRIMARY KEY (id),
FOREIGN KEY (current_product_id) REFERENCES products(id)
);


CREATE INDEX styles_product_id ON styles (product_id);
CREATE INDEX photos_styleID ON photos (styleID);
CREATE INDEX skus_styleID ON skus (styleID);

CREATE INDEX styles_id ON styles (id);

-- execute with mysql -u root < schema.sql