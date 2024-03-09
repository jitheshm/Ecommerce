const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI,
    nodemailerEmail: process.env.NODEMAILER_EMAIL,
    nodemailerPassword: process.env.NODEMAILER_PASSWORD,
    razorpaykey_id: process.env.razorpaykey_id,
    razorpaykey_secret: process.env.razorpaykey_secret,
    google_client_id: process.env.google_client_id,
    google_client_secret: process.env.google_client_secret,
    google_callback_url: process.env.google_callback_url,
    client_url: process.env.client_url,

    facebook_client_id: process.env.facebook_client_id,
    facebook_client_secret: process.env.facebook_client_secret,
    facebook_callback_url: process.env.facebook_callback_url,
}