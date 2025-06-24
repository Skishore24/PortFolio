const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main page (optional)
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Handle form submission
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Set up Nodemailer transporter (use your email config here)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,  // Change to 587
        secure: false,  // Use TLS, not SSL
        auth: {
            user: 'kishoresenthil2405@gmail.com',
            pass: 'zsnc jzga cqtu iqmc'
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Message sent successfully!');
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
