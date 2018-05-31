
require('dotenv').config();
const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI; 
const seedData = require('./seed-data.json')

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // Delete all existing records
  db.collection('businesses').remove({}).then(() => {
    
    // FIXME: promises return out of order
    return new Promise((res, rej) => {
      seedData.forEach(business => {
        db.collection('businesses').insertOne(business).then(() => {
          console.log('Seeding business')
        })
      })
      res()
    }).then(() => {
      console.log('Finished seeding')
      db.close()
    })
    
  })
  
})