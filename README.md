# Receipt-Processor

Receipt Processor API that records your receipts and share your points. This project used [Node.js][node], [Express][express], and [Docker][docker].

## Requirements

You need [Docker][docker] and [Git][git] installed into your system.

## Get Started

To run this application:

1.  Have Docker Desktop running in your computer.
2.  In your terminal type `git clone https://github.com/Ali-Aftab/Receipt-Processor.git` to clone it to your computer.
3.  Then type `cd Receipt-Processor` to access the folder.
4.  Type `docker compose up --build` in your terminal and you can use the API!

## API

First, we recommend installing [Postman](https://www.postman.com/) to easily test out the API. Remember to add `localhost:3000` to the URL before typing in the API path. (`/receipts/process`=>`localhost:3000/receipts/process`)

### Receipt Routes

How to signup and login.

- POST `/receipts/process` allows user to store receipt and returns an id <br/>
  &nbsp;&nbsp;-Requires a retailer, purchaseDate, purchaseTime, items, and total key inside body as instructed [here](https://github.com/fetch-rewards/receipt-processor-challenge/blob/main/README.md#examples). Note: items key should have an array of objects which each should have a shortDescription and price key.<br/>
  &nbsp;&nbsp;-Example:

  ```
  {
    "retailer": "Walgreens",
    "purchaseDate": "2022-01-02",
    "purchaseTime": "08:13",
    "total": "2.65",
    "items": [
        {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
        {"shortDescription": "Dasani", "price": "1.40"}
    ]
  }
  ```

- GET `/receipts/:id/points` allows a user to see the the points they have received from there.<br/>
  &nbsp;&nbsp;-Replace `:id` with the id (received from the POST route) in the URL. <br/> <br/>

[express]: https://expressjs.com/
[docker]: https://docker.com/
[node]: https://nodejs.org/
[git]: https://git-scm.com/
