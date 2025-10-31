// Netlify Function to handle contact form submissions
const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Parse the request body
  let formData;
  try {
    formData = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  // Validate required fields
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please fill in all required fields.' })
    };
  }

  // Validate reCAPTCHA
  if (!formData.recaptchaResponse) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'reCAPTCHA verification is required.' })
    };
  }

  // Verify reCAPTCHA with Google
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaSecret) {
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' })
    };
  }

  try {
    const recaptchaVerified = await verifyRecaptcha(
      formData.recaptchaResponse,
      recaptchaSecret
    );

    if (!recaptchaVerified) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'reCAPTCHA verification failed. Please try again.' })
      };
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'reCAPTCHA verification failed' })
    };
  }

  // Send email using configured email service
  try {
    await sendEmail(formData);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        message: 'Thank you for your message! I will get back to you soon.' 
      })
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while sending your message. Please try again later.' })
    };
  }
};

// Helper function to verify reCAPTCHA
function verifyRecaptcha(token, secret) {
  return new Promise((resolve, reject) => {
    const postData = `secret=${secret}&response=${token}`;
    
    const options = {
      hostname: 'www.google.com',
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.success === true);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Helper function to send email using Nodemailer or similar service
async function sendEmail(formData) {
  // Get email configuration from environment variables
  const emailConfig = {
    smtpServer: process.env.SMTP_SERVER || 'smtp.gmail.com',
    smtpPort: parseInt(process.env.SMTP_PORT || '587'),
    smtpUsername: process.env.SMTP_USERNAME,
    smtpPassword: process.env.SMTP_PASSWORD,
    fromEmail: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME || 'Portfolio Contact Form',
    toEmail: process.env.TO_EMAIL,
    toName: process.env.TO_NAME || 'Muhammad Asad Khan'
  };

  // Validate email configuration
  if (!emailConfig.smtpUsername || !emailConfig.smtpPassword || 
      !emailConfig.fromEmail || !emailConfig.toEmail) {
    throw new Error('Email configuration is incomplete. Please check environment variables.');
  }

  // For Netlify Functions, we'll use a simpler email sending approach
  // Option 1: Use a service like SendGrid, Mailgun, or similar
  // Option 2: Use Nodemailer (requires installing it as a dependency)
  
  // Using Nodemailer (recommended)
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    host: emailConfig.smtpServer,
    port: emailConfig.smtpPort,
    secure: emailConfig.smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: emailConfig.smtpUsername,
      pass: emailConfig.smtpPassword
    }
  });

  const mailOptions = {
    from: `"${emailConfig.fromName}" <${emailConfig.fromEmail}>`,
    to: `"${emailConfig.toName}" <${emailConfig.toEmail}>`,
    subject: `Portfolio Contact: ${formData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
      <p><strong>Phone:</strong> ${formData.phone ? escapeHtml(formData.phone) : 'N/A'}</p>
      <p><strong>Subject:</strong> ${escapeHtml(formData.subject)}</p>
      <p><strong>Project Type:</strong> ${formData.projectType ? escapeHtml(formData.projectType) : 'N/A'}</p>
      <p><strong>Budget:</strong> ${formData.budget ? escapeHtml(formData.budget) : 'N/A'}</p>
      <hr>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(formData.message).replace(/\n/g, '<br>')}</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

