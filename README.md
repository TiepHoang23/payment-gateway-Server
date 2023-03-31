# Challenge Report: Payment Gateway using PayPal
### Introduction
In this challenge, I developed a payment gateway using PayPal to process online payments for my web application. I used Node.js and Express for backend , React.js for frontend , and MongoDB for database.
`link demo`: https://youtu.be/l_NytwY-3Ok
### Features
My payment gateway includes features:

* Ability to create a new payment using PayPal API
* Ability to execute a payment and store the payment history in the database
* Display payment history for the user
* Integration with the PayPal payment gateway to securely process payments
* Easy-to-use interface for the user to enter payment details and complete payment
### Usage
To use the Payment Gateway API, follow these steps:

1. Use the `GET /myCart` endpoint to retrieve the items in the user's shopping cart.
2. Use the `POST /paymentCart` endpoint to initiate a payment with PayPal.
3. Redirect the user to the URL specified in the `urlRedirect` field of the response from the `POST /paymentCart endpoint`.
4. After the user has completed the payment process with PayPal, PayPal will redirect the user to your app at the URL specified in the `return_url` field of the `create_payment_json` object.
5. Your app will receive the response from PayPal at the `GET /paymentSuccess` endpoint. Use the information in the response to confirm the payment and update your app's records as necessary.

### Technologies Used
I used the following technologies for our payment gateway:

* Node.js
* ReactJS
* Express
* MongoDB
* Mongoose
* PayPal API
* HTML/CSS/JavaScript
### Challenges Faced
During the development of our payment gateway, we faced several challenges, including:

* Understanding the PayPal API and how to integrate it with our web application
* Storing payment details securely in the database
* Handling errors and exceptions when processing payments
