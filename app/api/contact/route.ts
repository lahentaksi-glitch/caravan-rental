import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Täytä kaikki kentät." },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      console.info("[contact] RESEND_API_KEY puuttuu — mock-tila.");
      return NextResponse.json({ ok: true, emailed: false, mode: "mock" });
    }

    const recipient =
      process.env.CONTACT_EMAIL?.trim() || "kuitunentarjaleena@gmail.com";

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: recipient,
      replyTo: email,
      subject: `Uusi yhteydenotto sivustolta: ${name}`,
      html: `
        <h2>Uusi yhteydenottoviesti</h2>
        <p><strong>Nimi:</strong> ${name}</p>
        <p><strong>Sähköposti:</strong> ${email}</p>
        <p><strong>Viesti:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ ok: true, emailed: true, mode: "resend" });
  } catch (error: any) {
    console.error("[contact] Resend-virhe:", error);
    return NextResponse.json(
      { error: `Sähköpostin lähetys epäonnistui: ${error?.message || "Tuntematon virhe"}` },
      { status: 502 }
    );
  }
}