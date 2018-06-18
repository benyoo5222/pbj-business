PBJ Business Admin Panel

This is the business side to our client side booking widget. This allows the business owner to view all the pass, present and up coming appointments for their business. A business is allowed to add and edit services, change store hours, choose how to be notified and view an analytics page to see when are the busy times and when are the popular services.

##Contributors 
Jeffrey Lee - https://github.com/apatheticking 
Peter Goshulak - https://github.com/pgoshulak 
Ben Yoo - https://github.com/benyoo5222

##Screenshots 
coming soon

##How to run
First go into the server folder and run the command `npm run dev-server`
Next use the command `npm start` to run the business admin panel

To book appointments and view them in the business panel down the client side widget below
https://github.com/apatheticking/pbj-scheduler-widget
use the command `npm start` to run client side widget

##Dependencies

@material-ui/core": "^1.1.0",
"@material-ui/icons": "^1.1.0",
"axios": "^0.18.0",
"body-parser": "^1.18.3",
"chart.js": "^1.1.1",
"cors": "^2.8.4",
"dotenv": "^5.0.1",
"express": "^4.16.3",
"faker": "^4.1.0",
"googleapis": "^31.0.2",
"moment": "^2.22.2",
"moment-timezone": "^0.5.17",
"mongodb": "^2.2.35",
"nodemailer": "^4.6.5",
"react": "^16.4.0",
"react-big-calendar": "^0.19.1",
"react-chartjs": "^1.2.0",
"react-dom": "^16.4.0",
"react-router-dom": "^4.2.2",
"react-scripts": "1.1.4",
"stripe": "^6.1.0",
"twilio": "^3.17.2"

##What I would do next
-Retool the database to use Postgres instead of MongoDB
-Reports currently are proof of concept, next I would have them pull from the database to create accurate reports
