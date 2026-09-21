"use client";

import { useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import type { RentalExtra, RentalProduct } from "@/types/rental";
import { getBookedDates } from "@/data/availability";
import {
  buildBookingMessage,
  mailtoBookingUrl,
  whatsappBookingUrl,
} from "@/lib/booking-message";
import { formatFiDate } from "@/lib/dates";
import {
  calculateRentalSubtotal,
  countNights,
  formatEuro,
} from "@/lib/pricing";
import { BookingCalendar } from "@/components/booking/booking-calendar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "success" | "error";
type SendChannel = "whatsapp" | "email";

interface BookingFormProps {
  product: RentalProduct;
  extras: RentalExtra[];
}

export function BookingForm({ product, extras }: BookingFormProps) {
  const bookedDates = useMemo(
    () => getBookedDates(product.slug),
    [product.slug]
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>(
    {}
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [calendarHint, setCalendarHint] = useState("");
  const [sentVia, setSentVia] = useState<SendChannel | null>(null);

  const nights = countNights(dateFrom, dateTo);
  const subtotal = dateFrom && dateTo ? calculateRentalSubtotal(product, nights) : 0;
  const chosenExtras = extras.filter((extra) => selectedExtras[extra.id]);
  const extrasTotal = chosenExtras.reduce((sum, extra) => sum + extra.price, 0);
  const total = subtotal + extrasTotal;

  const priceSummary = useMemo(() => {
    if (!dateFrom && !dateTo) {
      return "Valitse kalenterista nouto- ja palautuspäivä.";
    }
    if (dateFrom && !dateTo) {
      return `Alkaa ${formatFiDate(dateFrom)} — valitse vielä päättymispäivä.`;
    }
    return `${formatFiDate(dateFrom)} – ${formatFiDate(dateTo)} · ${nights} ${nights === 1 ? "yö" : "yötä"} · vuokra ${formatEuro(subtotal)} + lisät ${formatEuro(extrasTotal)}`;
  }, [dateFrom, dateTo, nights, subtotal, extrasTotal]);

  function toggleExtra(id: string, checked: boolean) {
    setSelectedExtras((prev) => ({ ...prev, [id]: checked }));
  }

  function validate(): string | null {
    if (!dateFrom || !dateTo) return "Valitse vuokra-ajankohta kalenterista.";
    if (nights <= 0) return "Tarkista päivämäärät.";
    if (!name.trim()) return "Syötä nimi.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Syötä kelvollinen sähköposti.";
    }
    if (!phone.trim()) return "Syötä puhelinnumero.";
    return null;
  }

  function buildMessage() {
    return buildBookingMessage({
      product,
      dateFrom,
      dateTo,
      nights,
      extras: chosenExtras,
      subtotal,
      extrasTotal,
      total,
      name,
      email,
      phone,
      message,
    });
  }

  function send(channel: SendChannel) {
    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    const text = buildMessage();
    if (channel === "email") {
      window.location.href = mailtoBookingUrl(text, product.name);
    } else {
      const url = whatsappBookingUrl(text);
      const popup = window.open(url, "_blank", "noopener,noreferrer");
      if (!popup) {
        window.location.href = url;
      }
    }
    setSentVia(channel);
    setStatus("success");
    setErrorMessage("");
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl border border-white/50 bg-white/75 p-8 text-center shadow-[0_24px_60px_-28px_rgba(20,40,80,0.45)] backdrop-blur-xl"
        role="status"
      >
        <p className="text-lg font-semibold text-foreground">Varauspyyntö avattu</p>
        <p className="mt-2 text-muted-foreground">
          {sentVia === "whatsapp"
            ? "WhatsApp avasi valmiin viestin. Lähetä se vahvistaaksesi pyynnön."
            : "Sähköpostiohjelmasi avasi valmiin varausviestin. Lähetä se vahvistaaksesi pyynnön."}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Arvioitu summa:{" "}
          <span className="font-medium text-foreground">{formatEuro(total)}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-xl"
          onClick={() => {
            setStatus("idle");
            setSentVia(null);
            setDateFrom("");
            setDateTo("");
            setSelectedExtras({});
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setCalendarHint("");
          }}
        >
          Tee uusi varauspyyntö
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      className="rounded-2xl border border-white/50 bg-white/70 p-5 shadow-[0_24px_60px_-28px_rgba(20,40,80,0.45)] backdrop-blur-xl sm:p-8"
      noValidate
    >
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Varaustila
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          Valitse vapaat päivät
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Punaiset päivät ovat jo varattuja. Vihreät päivät ovat vapaana — valitse
          ensin noutopäivä ja sitten palautus.
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <BookingCalendar
            slug={product.slug}
            bookedDates={bookedDates}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onChange={(from, to) => {
              setDateFrom(from);
              setDateTo(to);
              setStatus("idle");
            }}
            onHint={setCalendarHint}
          />
          {calendarHint ? (
            <p className="mt-3 text-sm text-accent" role="status">
              {calendarHint}
            </p>
          ) : null}
        </div>

        <div>
          {extras.length > 0 ? (
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-foreground">
                Lisäpalvelut
              </legend>
              {extras.map((extra) => {
                const checked = Boolean(selectedExtras[extra.id]);
                return (
                  <label
                    key={extra.id}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition-all duration-200",
                      checked
                        ? "border-accent/60 bg-accent/10 shadow-md"
                        : "border-border/70 bg-white/50 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleExtra(extra.id, value === true)
                      }
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
                );
              })}
            </fieldset>
          ) : null}

          <div
            className="mt-6 rounded-2xl bg-primary px-4 py-5 text-primary-foreground shadow-lg"
            aria-live="polite"
          >
            <p className="text-sm text-primary-foreground/80">{priceSummary}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {formatEuro(total)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Nimi</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="h-11 rounded-xl"
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
            className="h-11 rounded-xl"
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
            className="h-11 rounded-xl"
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
            className="rounded-xl"
          />
        </div>
      </div>

      {status === "error" && errorMessage ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          onClick={() => send("whatsapp")}
          className="h-12 rounded-xl bg-[#25D366] px-5 text-white hover:bg-[#1EBE57]"
        >
          <MessageCircle className="size-4" />
          Lähetä varauspyyntö WhatsAppilla
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => send("email")}
          className="h-12 rounded-xl border-primary/20 bg-white/70 px-5 hover:bg-white"
        >
          <Mail className="size-4" />
          Lähetä sähköpostilla
        </Button>
      </div>
    </form>
  );
}
