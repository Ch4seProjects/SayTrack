import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const type = formData.get("type") as string;
    const year = formData.get("year") as string;
    const section = formData.get("section") as string;
    const file = formData.get("file") as File;

    // convert file to buffer for Nodemailer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL, // your Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: `"Signup System" <${process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL}>`,
      to: process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL, // your inbox
      subject: `🆕 New Signup: ${name}`,
      html: `
        <h2>New Signup Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Year:</strong> ${year}</p>
        <p><strong>Section:</strong> ${section}</p>
        <p>Student ID attached below.</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
