const nodemailer = require("nodemailer");
require('dotenv').config();

exports.mailSender = async (email, name, verificationLink) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,  // Add port
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            // Add these settings
            tls: {
                rejectUnauthorized: false
            }
        });

        // Add more professional HTML template
        const mailOptions = {
            from: {
                name: "Expense Tracker", // Add a proper name
                address: process.env.MAIL_USER
            },
            to: email,
            subject: `Welcome to Expense Tracker - Please Verify Your Email`,
            text: `Hello ${name}, Please verify your email address to complete your registration.`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .container {
                            padding: 20px;
                            font-family: Arial, sans-serif;
                        }
                        .button {
                            background-color: #4CAF50;
                            border: none;
                            color: white;
                            padding: 15px 32px;
                            text-align: center;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                            margin: 4px 2px;
                            cursor: pointer;
                            border-radius: 4px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Welcome to Expense Tracker!</h2>
                        <p>Hello ${name},</p>
                        <p>Thank you for registering with us. Please verify your email address to complete your registration.</p>
                        <a href="${verificationLink}" class="button">Verify Email</a>
                        <p>If the button doesn't work, copy and paste this link in your browser:</p>
                        <p>${verificationLink}</p>
                        <p>Best regards,<br>The Expense Tracker Team</p>
                    </div>
                </body>
                </html>
            `,
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high'
            }
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", result);
        return result;

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}