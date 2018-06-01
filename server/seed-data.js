const ObjectId = require('mongodb').ObjectId

module.exports = [
  {
    "_id": ObjectId("123456123456123456123456"),
    "name": "Ben's Hair salon",
    "calendarId": "fn8tokeshkjgra785ffa0u717c@group.calendar.google.com",
    "services": [
      {
        "billingCode": "1",
        "description": "Men's hair cut",
        "priceCents": 2500,
        "durationMin": 15
      },
      {
        "billingCode": "2",
        "description": "Women's hair cut",
        "priceCents": 5000,
        "durationMin": 30
      },
      {
        "billingCode": "3",
        "description": "Hair coloration",
        "priceCents": 3000,
        "durationMin": 15
      }
    ]
  },
  {
    "_id": ObjectId("567890567890567890567890"),
    "name": "Jeffs's Beauty Parlour",
    "services": [
      {
        "billingCode": "1",
        "description": "Manicure",
        "priceCents": 5000,
        "durationMin": 30
      },
      {
        "billingCode": "2",
        "description": "Pedicure",
        "priceCents": 5000,
        "durationMin": 30
      },
      {
        "billingCode": "3",
        "description": "Eyebrow plucking",
        "priceCents": 3000,
        "durationMin": 15
      },
      {
        "billingCode": "4",
        "description": "Facial hair waxing",
        "priceCents": 2500,
        "durationMin": 15
      }
    ]
  },
  {
    "_id": ObjectId("abcdefabcdefabcdefabcdef"),
    "name": "Peter's Psychic Readings",
    "services": [
      {
        "billingCode": "1",
        "description": "Contact the Dead",
        "priceCents": 7000,
        "durationMin": 20
      },
      {
        "billingCode": "2",
        "description": "Crystal Ball reading",
        "priceCents": 5000,
        "durationMin": 20
      },
      {
        "billingCode": "3",
        "description": "Tarot Card reading",
        "priceCents": 2500,
        "durationMin": 20
      },
      {
        "billingCode": "4",
        "description": "Full seance",
        "priceCents": 10000,
        "durationMin": 40
      }
    ]
  }
]