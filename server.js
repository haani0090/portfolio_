const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');


let initialPath = path.join(__dirname, "public");
let app = express();


app.use(express.static(initialPath));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html"));
})
app.listen(3000, () => {
    console.log('listening.....');
})


app.post('/mail', (req, res) => {
    const { firstname, lastname, email, msg } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
         secure: true, // use SSL
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: 'receiver email',
        subject: 'Easy peasy',
        text: `First name: ${firstname}, \nLast name: ${lastname}, \nEmail: ${email}, \nMessage: ${msg}`
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            console.log(err);
            res.json('OOPS! it seems like some error occured plz. try again....')
        } else{
            res.json('thanks for e-mailing me');
        }
    });
})