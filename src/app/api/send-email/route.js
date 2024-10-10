import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: email || 'no-reply@yourdomain.com',
      to: 'at792226@gmail.com',
      subject: 'New Contact Message',
      text: `From: ${name || 'Anonymous'} \nEmail: ${email || 'Not provided'} \n\nMessage: ${message}`,
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}