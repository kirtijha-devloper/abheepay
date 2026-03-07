/**
 * Utility for sending OTPs
 * Currently mocked; replace with real implementations (e.g., Nodemailer, Twilio, MSG91) as needed.
 */

const sendOTPEmail = async (email, otp) => {
  console.log(`\n================================`);
  console.log(`📧 MOCK EMAIL SENT`);
  console.log(`To: ${email}`);
  console.log(`Subject: Your Abheepay Login Verification Code`);
  console.log(`Body: Your OTP for login is: ${otp}. It is valid for 10 minutes.`);
  console.log(`================================\n`);
  return true;
};

const sendOTPSMS = async (mobile, otp) => {
  console.log(`\n================================`);
  console.log(`📱 MOCK SMS SENT`);
  console.log(`To: ${mobile}`);
  console.log(`Message: Your Abheepay OTP is ${otp}. Do not share this with anyone.`);
  console.log(`================================\n`);
  return true;
};

module.exports = {
  sendOTPEmail,
  sendOTPSMS,
};
