# Shop-App

This is a small REST API for shop, which is written in Node.js using Express framework and MongoDb as a database.

Shop app includes the following functionalities:

* Login and registration
* CRUD operations for product
* Searching products by name
* CRUD operations for orders

## Users

It supports two types of users, admin and regular user. 

* There is only one admin in the system, and he/she can log in and add new products, edit and delete them. 
* Regular user can register and log in in the system, then he/she can search products, create and edit orders. 

### How to run

If you want to run this application, follow the next steps:

* Clone this repository
* Check if you have installed Node.js (v14.18.1)
* Install MongoDb (v5.0.4)
* Start MongoDb
* Create .env file in the root folder of the app and set variables for PORT and DB_URL
* Change port which you setup also in swagger.json file 
* Run npm install
* Run nodemon app
* Open swagger in the browser typing this url with port you setup: http://localhost:PORT/api-docs/ and see all the routes in the app
