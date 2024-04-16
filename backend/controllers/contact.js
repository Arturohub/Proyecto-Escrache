const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  let { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ success: false });
    } else {
      console.log("Email sent: " + info.response);
      res.send({ success: true });
    }
  });
};


module.exports = { sendEmail }