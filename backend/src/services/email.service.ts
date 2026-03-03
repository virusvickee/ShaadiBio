import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: process.env.EMAIL_USER ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  } : undefined
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.EMAIL_USER) {
    console.log('Email not configured, skipping send');
    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@example.com',
    to,
    subject,
    html
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `
    <h1>Welcome to ShaadiBio, ${name}!</h1>
    <p>Thank you for registering. Start creating your biodata now!</p>
    <p><a href="${process.env.FRONTEND_URL}">Get Started</a></p>
  `;
  
  await sendEmail(email, 'Welcome to ShaadiBio', html);
};

export const sendPdfReadyEmail = async (email: string, name: string, pdfUrl: string) => {
  const html = `
    <h1>Your Biodata PDF is Ready!</h1>
    <p>Hi ${name},</p>
    <p>Your biodata PDF has been generated successfully.</p>
    <p><a href="${pdfUrl}">Download PDF</a></p>
  `;
  
  await sendEmail(email, 'Your Biodata PDF is Ready', html);
};

export const sendPaymentSuccessEmail = async (email: string, name: string, plan: string) => {
  const html = `
    <h1>Payment Successful!</h1>
    <p>Hi ${name},</p>
    <p>Your payment for ${plan} plan has been processed successfully.</p>
    <p>Enjoy your premium features!</p>
  `;
  
  await sendEmail(email, 'Payment Successful', html);
};
