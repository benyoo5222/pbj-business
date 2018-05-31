# PBJ-Scheduler Server and Database
Run the following commands to get the Node/Express/MongoDB backend running

### Install and set up the server environment
```
$ npm install
```
Update the `.env` file in your project root with your MongoDB URI, eg. `MONGODB_URI=mongodb://127.0.0.1:27017/pbj`

### Seed the database
```
$ npm run seed
```
Your database is now seeded. If you need to reset the data to this (original) state, just run `npm run seed` again.

### Start the server
In `vagrant`, run `npm run dev-server`. Nodemon may not listen properly for changes. If you need to listen for changes to the server (ie. you are actually working on the server), install nodemon globally inside vagrant (`npm i -g nodemon`) then run `nodemon -L server`

### Making requests
To see all businesses, navigate to [http://localhost:5000/api/businesses]. 

To view/edit a single business, you will need its `_id` field (eg. `5b106417bda46f2c600c69b1`; these change every time the database is seeded).

You can view a business with a `GET` request to `/api/business/<BUSINESS_ID>`, using the business's `_id`.

To update a business, make a `PUT` request to `/api/business/<BUSINESS_ID>`, using the business's `_id`. Your request body should be formatted with JSON as follows:
```json
{
  "data": {
    "name": "Ben's wonderful hair place"
    // etc...
  }
}
```
To view a business's services, make a `GET` request to `/:id/services`

To update a business's services, make a `PUT` request to `/:id/services`. You must send the **ENTIRE** updated array, as it will overwrite the original array. Your request body should have the following JSON format:
```json
{
  "data": [
    {
      "billingCode": "abc",
      "description": "Men's hair cut",
      "priceCents": 2500,
      "durationMin": 15
    },
    {
      //...
    }
  ]
}
```

To add a new transaction, make a `POST` to `/:id/transactions`. Timestamp is automatically added.

To add/remove individual services, for now just send a full version of your new `services` array.