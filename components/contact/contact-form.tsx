"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Täytä kaikki kentät.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Tarkista sähköpostiosoite.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm" role="status">
        <p className="font-medium text-foreground">Viesti lähetetty (demo)</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Otamme yhteyttä mahdollisimman pian arkipäivisin.
        </p>
        <Button type="button" variant="outline" className="mt-4" onClick={() => setStatus("idle")}>
          Lähetä uusi viesti
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/50 bg-white/70 p-6 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl">
      <div className="space-y-2">
        <Label htmlFor="contact-name">Nimi</Label>
        <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Sähköposti</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Viesti</Label>
        <Textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      {status === "error" && error ? (
        <p className="text-sm text-destructive" role="alert">{error}</p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {status === "submitting" ? "Lähetetään…" : "Lähetä viesti"}
      </Button>
    </form>
  );
}
