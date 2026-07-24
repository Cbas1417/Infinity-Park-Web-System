import { NextResponse } from "next/server";
import { Resend } from "resend";


const NOTIFICATION_EMAIL = "c.a.s.infinitygroup@gmail.com";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Website <noreply@casinfinitygroup.nl>",
      to: NOTIFICATION_EMAIL,
      replyTo: email,
      subject: `Nuevo contacto desde la web: ${name}`,
      text: `
Nombre: ${name}
Email: ${email}
Teléfono: ${phone || "No proporcionado"}

Mensaje:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}