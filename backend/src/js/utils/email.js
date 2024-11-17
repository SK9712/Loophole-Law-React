const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`;
  }

  // Create nodemailer transport
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    // Mailtrap for development
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Read email template and compile with handlebars
  async loadTemplate(templateName) {
    const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.html`);
    const template = await fs.readFile(templatePath, 'utf-8');
    return handlebars.compile(template);
  }

  // Send actual email
  async send(templateName, subject, data = {}) {
    try {
      // 1) Load and compile email template
      const compiledTemplate = await this.loadTemplate(templateName);

      // 2) Render HTML with dynamic data
      const html = compiledTemplate({
        firstName: this.firstName,
        url: this.url,
        subject,
        ...data,
        year: new Date().getFullYear(),
        companyName: process.env.COMPANY_NAME || 'LoopholeLaw'
      });

      // 3) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText(html)
      };

      // 4) Create transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Error sending email');
    }
  }

  // Predefined email methods
  async sendWelcome() {
    await this.send('welcome', 'Welcome to LoopholeLaw!', {
      welcomeMessage: 'We are excited to have you on board.'
    });
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Reset Your Password', {
      validityDuration: '10 minutes',
      supportEmail: process.env.SUPPORT_EMAIL
    });
  }

  async sendEmailVerification() {
    await this.send('emailVerification', 'Verify Your Email Address', {
      validityDuration: '24 hours'
    });
  }

  async sendVerificationSuccess() {
    await this.send('verificationSuccess', 'Account Verification Successful', {
      nextSteps: 'You can now access all advocate features.'
    });
  }

  async sendCaseAssignment(caseDetails) {
    await this.send('caseAssignment', 'New Case Assignment', {
      caseNumber: caseDetails.caseNumber,
      clientName: caseDetails.clientName,
      courtDetails: caseDetails.courtDetails,
      hearingDate: caseDetails.hearingDate
    });
  }

  async sendHearingReminder(hearingDetails) {
    await this.send('hearingReminder', 'Upcoming Hearing Reminder', {
      caseNumber: hearingDetails.caseNumber,
      court: hearingDetails.court,
      date: hearingDetails.date,
      time: hearingDetails.time
    });
  }

  async sendNewPublication(publicationDetails) {
    await this.send('newPublication', 'New Publication Posted', {
      title: publicationDetails.title,
      author: publicationDetails.author,
      abstract: publicationDetails.abstract,
      publicationUrl: publicationDetails.url
    });
  }

  async sendLoginAlert(loginDetails) {
    await this.send('loginAlert', 'New Login Detected', {
      deviceInfo: loginDetails.device,
      location: loginDetails.location,
      ipAddress: loginDetails.ip,
      time: loginDetails.time
    });
  }

  async sendNewsletterMail(newsletterData) {
    await this.send('newsletter', newsletterData.subject, {
      content: newsletterData.content,
      featuredArticles: newsletterData.articles,
      upcomingEvents: newsletterData.events
    });
  }
}

// Helper function to convert HTML to text
function htmlToText(html) {
  return html.replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Example email templates handler
const emailTemplates = {
  welcome: {
    subject: 'Welcome to LoopholeLaw',
    template: 'welcome'
  },
  passwordReset: {
    subject: 'Password Reset Request',
    template: 'passwordReset'
  },
  emailVerification: {
    subject: 'Email Verification',
    template: 'emailVerification'
  },
  caseAssignment: {
    subject: 'New Case Assignment',
    template: 'caseAssignment'
  },
  hearingReminder: {
    subject: 'Upcoming Hearing Reminder',
    template: 'hearingReminder'
  }
};

// Utility function to send emails
const sendEmail = async (options) => {
  try {
    const email = new Email(options.user, options.url);
    await email[`send${options.template}`](options.data);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Error sending email');
  }
};

module.exports = {
  Email,
  sendEmail,
  emailTemplates
};