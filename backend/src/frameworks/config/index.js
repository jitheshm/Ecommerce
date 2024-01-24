const dotenv = require('dotenv');
dotenv.config();

module.exports={
    port:process.env.PORT||3000,
    mongodb_uri:process.env.MONGODB_URI,
    nodemailerEmail:process.env.NODEMAILER_EMAIL,
    nodemailerPassword:process.env.NODEMAILER_PASSWORD
}