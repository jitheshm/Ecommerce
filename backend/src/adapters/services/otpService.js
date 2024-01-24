// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter using SMTP transport



module.exports = {
    createOtp: (length=6) => {
        let otp = ''

        for (let i = 0; i < length; i++) {
            otp += Math.floor(Math.random() * 10)
        }
        console.log(otp);
        return otp
    },

    sendOtp: (otp, email,mailerConfig) => {
        console.log(mailerConfig);
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: mailerConfig.nodemailerEmail,
                pass: mailerConfig.nodemailerPassword,
            }
        })
        const mailOptions = {
            from: mailerConfig.nodemailerEmail,
            to: email,
            subject: "Otp",
            text: otp,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }

}


