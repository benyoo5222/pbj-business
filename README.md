# PBJ Scheduling
An easy-to-use, easy-to-implement solution for small businesses to allow their customers to book appointments online.

## Description
An all-in-one scheduling plugin for business owners (eg. hair salons, massage therapists, auto mechanics, etc). Includes:
- a customer-facing popup widget that allows customers to select services and timeslots, and pay with credit card online
- a business-owner-facing admin page which shows all bookings, displays the widget setup instructions, and provides an interface to changes services, hours, and other options
- a server which can automatically process online payments, create calendar events and invites, and send email/SMS notifications and confirmations
Also included for demo purposes are a sample landing page for this widget and sample business website which integrates the widget in "Book now" links

This repo contains the server code and Business-owner frontend code. See [this repo](https://github.com/pgoshulak/pbj-scheduler-widget) for customer-facing widget.

### Screenshots
**Business admin page**
- [Appointment agenda view](./docs/admin-1-agenda.png)
- [Calendar view](./docs/admin-2-weekly.png)
- [Editing services](./docs/admin-3-services.png)
- [Editing business hours](./docs/admin-4-hours.png)
- [Notification settings](./docs/admin-5-notifications.png)
- [Analytics and reports](./docs/admin-6-reports.png)
- [Simple setup to add widget to existing webpage](./docs/admin-7-setup.png)

**Customer-facing widget**
- [Selecting services](./docs/widget-1-services.png)
- [Valid appointment time](./docs/widget-2-calendar-ok.png)
- [Invalid appointment time](./docs/widget-3-calendar-no.png)
- [Online credit card payment with Stripe](./docs/widget-4-stripe.png)

### About
This project began as a Final Group Project for Lighthouse Labs full-time web development bootcamp. It was designed and built over 12 days by [@pgoshulak](https://github.com/pgoshulak), [@apatheticking](https://github.com/apatheticking), and [@benyoo222](https://github.com/benyoo5222).

### Features
The business-owner-facing Admin page allows business owners to setup and change business data displayed in the customer widget, and view incoming appointments.
- [Calendar view](./docs/admin-2-weekly.png): view existing appointments in monthly, weekly, daily, or agenda views
  - [Agenda view](./docs/admin-1-agenda.png) displays the full info for the day's appointments, including customer name, contact information, services chosen, and if payment is received or due
- [Services page](./docs/admin-3-services.png): add, edit, and delete services offered by the business, including price and duration
- [Hours page](./docs/admin-4-hours.png): edit business hours
- [Notifications page](./docs/admin-5-notifications.png): Change how and when the business receives notifications for new appointments and summary reports
- [Reports page](./docs/admin-6-reports.png): generate analytics charts to show service peak times, popular services, etc
- [Information page](./docs/admin-7-setup.png): Update business contact info, and generate a setup URL
  - the setup URL is a single-line `<a>` tag which opens a popup window with the business's widget. It can be placed anywhere in a business's existing website and styled as desired.
  - WIP: the business may set a maximum number of 'concurrent appointments', eg. three hairstylists may service up to three customers at a time.

The customer-facing Widget is a popup window that can be easily integrated into a business's existing website, allowing customers to book services and timeslots, and providing the option to pay online.
- [Services view](./docs/widget-1-services.png): a checklist of services offered by the business, including price and duration. The customer can select any combination of appointments to book.
- [Calendar view](./docs/widget-2-calendar-ok.png): a calendar view which allows the customer to select the exact time to book their appointment.
  - the calendar obfuscates customer data on existing events, simply displaying the time as 'booked'
  - the customer can drag-and-drop their appointment to any available time. The appointment turns [green](./docs/widget-2-calendar-ok.png) when the appointment is valid, and [red](./docs/widget-3-calendar-no.png) when a conflict occurs (eg. existing appointment or after business hours)
  - appointment duration is automatically calculated from the services selected
- Customer info view: customer enters their name, phone number, and email address
- [Payment screen](./docs/widget-4-stripe.png): the customer pay choose to 'Pay now' with credit card (via Stripe) or to 'Pay later' at the business location
  - the customer may select if they would like an SMS or email confirmation of their booking

The backend server and database contains business logic and processes transactions.
- exposes the expected CRUD endpoints for business information such as hours, services, contact info, etc
- exposes a POST endpoint which requires the business ID as `/business/<BUSINESS_ID>/appointment` with which the customer widget interacts
- upon receiving a new appointment request, the server:
  - validates and processes the Stripe credit card payment, if included
  - generates an event to the business's Google Calendar
  - sends a calendar event invitation to the customer's email
  - sends SMS/email notification to the business owner, if selected in *Notifications* admin page
  - sends SMS/email confirmation to the customer, if selected in *Payment* widget screen

## Setup
- clone this repo and the [customer-facing widget](https://github.com/pgoshulak/pbj-scheduler-widget) repo to separate folders (eg. `/business` and `/widget`)
- generate API keys and accounts with the appropriate services and add to the following files (use the corresponding `*.sample.json` files to confirm correct file location and format):
  - `/business/.env`: MongoDB URI (can use default from `.env.sample` for dev/testing)
  - `/business/src/calendar_secrets.json`: Google Calendar API KEY
  - `/business/server/calendar_secrets.json`: Google Calendar API KEY
  - `/business/server/gmail_password.json`: Email password (note: you can change mailer accounts in `/business/server/Modules/nodeMailerModule.js`)
  - `/business/server/service_account_secrets.json`: Google Calendar authentication (email and private key)
  - `/business/server/stripe_secrets.json`: Stripe API key
  - `/business/server/twilio_secrets.json`: Twilio account ID and auth tokens
  - `/widget/src/calendar_secrets.json`: Google Calendar API KEY (see note below)
  - `/widget/src/stripekeys.json`: Stripe API key (see note below)
- inside `/business` folder, run `npm run seed` to seed the MongoDB database (ensure mongodb is installed first)
- run `npm run server` to start the Node/Express server 
- inside either `/business` or `/widget` run `npm run start` to run the React development server. Both rely on the backend Node/Express server to read/update data

Note: the customer-facing widget is hosted statically on Github Pages. However, it still requests data from the backend Node/Express server (`localhost:5000`)

## Dependencies
- MongoDB
- Express
- Node
- React
- Material UI
- ChartJS
- Nodemailer
- React Big Calendar

3rd Party APIs:
- Google Calendar / authentication
- Stripe
- Twilio