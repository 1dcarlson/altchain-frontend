const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  throw new Error('Missing SENDGRID_API_KEY in environment variables.');
}

sgMail.setApiKey(SENDGRID_API_KEY);

function sendEmail({ to, subject, text, html }) {
  const msg = {
    to,
    from: 'daniel@altchain.app',
    subject,
    text,
    html,
  };

  return sgMail.send(msg);
}

function sendWaitlistConfirmation(email, language = 'en') {
  const templates = {
    en: {
      subject: 'Welcome to AltChain',
      text: 'Thanks for joining the waitlist!',
      html: '<strong>Thanks for joining the AltChain waitlist!</strong>',
    },
    es: {
      subject: 'Bienvenido a AltChain',
      text: 'Gracias por unirse a la lista de espera.',
      html: '<strong>Gracias por unirse a la lista de espera de AltChain.</strong>',
    },
    fr: {
      subject: 'Bienvenue chez AltChain',
      text: 'Merci de vous être inscrit à notre liste.',
      html: '<strong>Merci de vous être inscrit à la liste d’attente AltChain.</strong>',
    },
  };

  const template = templates[language] || templates.en;

  return sendEmail({
    to: email,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
}

module.exports = {
  sendEmail,
  sendWaitlistConfirmation,
};