"use client";

import { useMemo, useState } from "react";
import type { RentalExtra, RentalProduct } from "@/types/rental";
import {
  calculateRentalSubtotal,
  countNights,
  formatEuro,
} from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface BookingFormProps {
  product: RentalProduct;
  extras: RentalExtra[];
}

export function BookingForm({ product, extras }: BookingFormProps) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const nights = countNights(dateFrom, dateTo);
  const subtotal = calculateRentalSubtotal(product, nights);
  const extrasTotal = extras.reduce(
    (sum, extra) => (selectedExtras[extra.id] ? sum + extra.price : sum),
    0
  );
  const total = subtotal + extrasTotal;

  const priceSummary = useMemo(() => {
    if (!dateFrom || !dateTo) {
      return "Valitse päivämäärät nähdäksesi hinnan.";
    }
    if (nights <= 0) {
      return "Palautuspäivä on oltava noudon jälkeen.";
    }
    return `${nights} yötä · vuokra ${formatEuro(subtotal)} + lisät ${formatEuro(extrasTotal)}`;
  }, [dateFrom, dateTo, nights, subtotal, extrasTotal]);

  function toggleExtra(id: string, checked: boolean) {
    setSelectedExtras((prev) => ({ ...prev, [id]: checked }));
  }

  function validate(): string | null {
    if (!dateFrom || !dateTo) return "Valitse vuokra-ajankohta.";
    if (nights <= 0) return "Tarkista päivämäärät.";
    if (!name.trim()) return "Syötä nimi.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Syötä kelvollinen sähköposti.";
    }
    if (!phone.trim()) return "Syötä puhelinnumero.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    await new Promise((resolve) => setTimeout(resolve, 800));

    const shouldFail = false;
    if (shouldFail) {
      setStatus("error");
      setErrorMessage("Lähetys epäonnistui. Yritä uudelleen tai soita meille.");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-border bg-card p-8 text-center shadow-md"
        role="status"
      >
        <p className="text-lg font-semibold text-foreground">Kiitos varauspyynnöstä!</p>
        <p className="mt-2 text-muted-foreground">
          Vahvistamme saatavuuden ja lähetämme maksuohjeet sähköpostiisi 1–2 arkipäivän
          kuluessa.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Arvioitu summa: <span className="font-medium text-foreground">{formatEuro(total)}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setDateFrom("");
            setDateTo("");
            setSelectedExtras({});
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }}
        >
          Lähetä uusi pyyntö
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8"
      noValidate
    >
      <h2 className="text-xl font-semibold text-foreground">Varauspyyntö</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Tämä on demo-lomake — emme tallenna tietoja palvelimelle.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date-from">Alkaen</Label>
          <Input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date-to">Päättyen</Label>
          <Input
            id="date-to"
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
        </div>
      </div>

      {extras.length > 0 ? (
        <fieldset className="mt-6 space-y-3">
          <legend className="text-sm font-medium text-foreground">Lisäpalvelut</legend>
          {extras.map((extra) => (
            <label
              key={extra.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 hover:bg-muted/50"
            >
              <Checkbox
                checked={Boolean(selectedExtras[extra.id])}
                onCheckedChange={(checked) => toggleExtra(extra.id, checked === true)}
              />
              <span className="flex-1 text-sm">
                <span className="font-medium text-foreground">
                  {extra.label} (+{formatEuro(extra.price)})
                </span>
                {extra.description ? (
                  <span className="mt-0.5 block text-muted-foreground">
                    {extra.description}
                  </span>
                ) : null}
              </span>
            </label>
          ))}
        </fieldset>
      ) : null}

      <div
        className="mt-6 rounded-xl bg-muted/60 p-4"
        aria-live="polite"
      >
        <p className="text-sm text-muted-foreground">{priceSummary}</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">
          Yhteensä: {formatEuro(total)}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Nimi</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Sähköposti</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Puhelin</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            required
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message">Viesti</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Kerro esim. nouto/toimitustoive tai erityistarpeet"
            rows={4}
          />
        </div>
      </div>

      {status === "error" && errorMessage ? (
        <p className="mt-4 text-sm text-destructive" role="alert">{errorMessage}</p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto",
          status === "submitting" && "opacity-80"
        )}
      >
        {status === "submitting" ? "Lähetetään…" : "Lähetä varauspyyntö"}
      </Button>
    </form>
  );
}
