<h1 align="center" style="font-size: 2.7rem;">Atelier</h1>

<h2 align="center" style="font-size: 1.5rem;">An e-commerce RESTful API microservice. The API contains data on roughly 1 million apparel and fashion products<br><br>



## Table of Contents

- [Overview](#Overview)
- [Technologies Used](#Technologies-Used)
- [Database and ETL](#Database-and-ETL)
- [Server Routes](#Server-Routes)
- [Deployment:Database](#Deployment:Database)
- [Deployment:Server](#Deployment:Server)
- [Performance Testing](#Performance-Testing)
- [Optimization 1: NGINX and Horizontal Scaling](#Optimization-1)
- [Optimization 2: Redis Caching](#Optimization-2)
- [Contributors](#Contributors)

## Overview
- Performed an extract, transform, and load (ETL) process to transfer 12+ million records from 6 CSV files into a deployed **MySQL** database
- Designed **RESTful API** server to handle front end requests
- Implemented server side caching with **Redis** to improve latency
- Scaled horizontally using an **NGINX** load balancer
- Deployed at low cost using **AWS** EC2 T2micros
- Tested response times and user throughput using **Loader.io**

## Technologies Used
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [AWS](https://aws.amazon.com/)
- [NGINX](https://www.nginx.com/)
- [Redis](https://redis.io/)
- [Loader.io] (https://loader.io/)

## Database and ETL

### xx

- We used **xx**

  ![Wire Diagram](dist/static/assets/Figma1.png 'Wire Diagram')
  ![Miro Diagram](dist/static/assets/Miro.png 'Miro')
  ![Trello Diagram](dist/static/assets/Trello.png 'Trello')

## Server Routes:

- `GET /products` - Retrieves the list of products
- GET /products/:product_id - Returns all product level information for a specified product id
- GET /products/:product_id/styles - Returns all styles available for a given product
- GET /products/:product_id/related - Returns the IDs of products related to the product specified
- https://learn-2.galvanize.com/cohorts/2779/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md


## Deployment - Database:

- xx

## Deployment - Server:

- xx

## Performance Testing:


## Optimization 1: NGINX and Horizontal Scaling:
- xx

## Optimization 2: Redis Caching:
- xx

## Contributors:


<table>
  <tr>
    <td align="center"><a href="https://github.com/TN423"><img src="https://avatars.githubusercontent.com/u/80915187?v=4" width="100px;" alt=""/><br /><sub><b>Justin Hurst</b></sub></a><br /></td>
  </tr>
</table>
