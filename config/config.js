require("dotenv").config();
process.argv.forEach((value, index) => console.log(index + " => " + value));

module.exports = {
  fileSystem: {
    path: "./DB",
  },
  admin: 'useradmin@user.com',
  mongodb: {
    // cnxStr: process.env.MONGO_ATLAS,
    cnxStr:'mongodb://localhost:27017/ecommerce',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // serverSelectionTimeoutMS: 40000,
    },
  },
  gmail: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
    admin: process.env.GMAIL_ADMIN,
  },

  // credenciales Twillio
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUM_SMS: process.env.TWILIO_NUM_SMS,
  TWILIO_NUM_WHATSAPP: process.env.TWILIO_NUM_WHATSAPP,
  ADMIN_WHATSAPP: process.env.ADMIN_WHATSAPP,
  TWILIO_SMS_SERVICE: process.env.TWILIO_SMS_SERVICE,
};
