const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'bd23122000@gmail.com',
        subject: 'Thanks for joining to our app',
        html : `<h1>Welcome</h1>
            <p>Welcome to task manager app, <strong>${name}</strong> . You can manage your tasks here
             so that you dont forget any important work in your busy life</p>`
    })
}

const sendCancelationEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from : 'bd23122000@gmail.com',
        subject : `GoodBye, ${name}`,
        text : `Hello, ${name} .We are sorry if you are not happy with our service .

Feel free to reply for your inconvenience,we are ready to help you out.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
}
