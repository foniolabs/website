import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // For now, we'll use a simple mailto approach or you can integrate with Resend
    // If you want to use Resend, you'll need to install it: npm install resend
    // and set up RESEND_API_KEY in your .env.local file

    // Option 1: Using Resend (recommended for production)
    if (process.env.RESEND_API_KEY) {
      const Resend = (await import("resend")).Resend;
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Fonio Labs Website <onboarding@resend.dev>", // You'll need to verify your domain
        to: ["admin@foniolabs.xyz"],
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      return NextResponse.json(
        { message: "Email sent successfully" },
        { status: 200 }
      );
    }

    // Option 2: Fallback - Log to console (for development)
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Send a simple response indicating the form was received
    return NextResponse.json(
      {
        message:
          "Message received! We'll get back to you soon. (Email service not configured yet)",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
