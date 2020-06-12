require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (phone, message) => {
  // console.log('phone', phone)
  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
       body: message,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: phone
     })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))
}

const genCode = (length) => {
  var result = ''
  var characters = '0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

module.exports = {
  sendSms,
  genCode
};
