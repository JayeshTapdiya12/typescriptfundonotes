const nodemailer = require('nodemailer');

import dotenv from 'dotenv';
dotenv.config();

interface sendMailDetails {
  email: string;
  subject: string;
  body: string;
}

export const sendMail = async ({
  email,
  subject,
  body
}: sendMailDetails): Promise<void> => {
  const { EMAIL_USER, PASSWORD_USER } = process.env;

  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: PASSWORD_USER
    },
    debug: true,
    logger: true
  });

  try {
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: subject,
      html: body
    });
    console.log('the email is send succesfully');
  } catch (error) {
    console.log('the email is not send ', error);
  }
};
