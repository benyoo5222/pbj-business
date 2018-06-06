const ObjectId = require('mongodb').ObjectId

module.exports = [
  {
    "_id": ObjectId("123456123456123456123456"),
    "name": "Ben's Hair salon",
    "address": "46 Spadina Ave, Toronto, ON M5V 2H8",
    "phone": "416-555-1234",
    "calendarId": "fn8tokeshkjgra785ffa0u717c@group.calendar.google.com",
    "calendarData": {
      "gridSmall": 15,
      "gridLarge": 60,
      "maxConcurrentAppointments": 2
    },
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
    ],
    "hours": [
      {"day": "Sunday", "opening": "00:00", "closing": "00:00"},
      {"day": "Monday", "opening": "09:00", "closing": "21:00"},
      {"day": "Tuesday", "opening": "09:00", "closing": "21:00"},
      {"day": "Wednesday", "opening": "09:00", "closing": "21:00"},
      {"day": "Thursday", "opening": "09:00", "closing": "21:00"},
      {"day": "Friday", "opening": "09:00", "closing": "23:00"},
      {"day": "Saturday", "opening": "09:00", "closing": "18:00"}
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
    ],
    "hours": [
      {"day": "Sunday", "opening": "10:00", "closing": "19:00"},
      {"day": "Monday", "opening": "10:00", "closing": "20:00"},
      {"day": "Tuesday", "opening": "10:00", "closing": "20:00"},
      {"day": "Wednesday", "opening": "10:00", "closing": "20:00"},
      {"day": "Thursday", "opening": "10:00", "closing": "22:00"},
      {"day": "Friday", "opening": "10:00", "closing": "22:00"},
      {"day": "Saturday", "opening": "10:00", "closing": "19:00"}
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
    ],
    "hours": [
      {"day": "Sunday", "opening": "10:00", "closing": "20:00"},
      {"day": "Monday", "opening": "11:00", "closing": "22:00"},
      {"day": "Tuesday", "opening": "11:00", "closing": "22:00"},
      {"day": "Wednesday", "opening": "11:00", "closing": "22:00"},
      {"day": "Thursday", "opening": "11:00", "closing": "20:00"},
      {"day": "Friday", "opening": "11:00", "closing": "20:00"},
      {"day": "Saturday", "opening": "10:00", "closing": "20:00"}
    ]
  }
]