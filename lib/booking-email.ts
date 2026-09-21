import { escapeHtml } from "@/lib/html";
import { formatFiDate } from "@/lib/dates";
import { formatEuro } from "@/lib/pricing";
import { site } from "@/data/site";
import type { ResolvedBooking } from "@/lib/booking-request";

function extraList(booking: ResolvedBooking): string {
  if (booking.extras.length === 0) return "<p>Ei lisäpalveluita</p>";
  return `<ul>${booking.extras
    .map((extra) => `<li>${escapeHtml(extra.label)} (+${formatEuro(extra.price)})</li>`)
    .join("")}</ul>`;
}

export function customerConfirmationHtml(booking: ResolvedBooking): string {
  const nights = `${booking.nights} ${booking.nights === 1 ? "yö" : "yötä"}`;
  return `<!doctype html>
<html lang="fi">
  <body style="font-family:Georgia,serif;background:#f6f4ef;padding:24px;color:#1c2434;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;">
      <tr><td>
        <p style="letter-spacing:.12em;text-transform:uppercase;font-size:12px;color:#c48a2a;margin:0 0 8px;">${escapeHtml(site.name)}</p>
        <h1 style="font-size:22px;margin:0 0 16px;">Varauspyyntö vastaanotettu</h1>
        <p>Hei ${escapeHtml(booking.name)},</p>
        <p>Kiitos pyynnöstäsi. Tämä ei ole vielä vahvistettu varaus — palaamme sinulle mahdollisimman pian.</p>
        <p><strong>${escapeHtml(booking.product.name)}</strong><br/>
        ${escapeHtml(formatFiDate(booking.dateFrom))} – ${escapeHtml(formatFiDate(booking.dateTo))} (${escapeHtml(nights)})</p>
        ${extraList(booking)}
        <p>Arvioitu summa: <strong>${formatEuro(booking.total)}</strong></p>
        <p style="font-size:13px;color:#5b6575;">Vakuus 200 € peritään vahvistuksen yhteydessä. Omavastuu 800 € / vahinko.</p>
        <p>Ystävällisin terveisin<br/>${escapeHtml(site.name)} · ${escapeHtml(site.partnerName)}<br/>
        <a href="tel:${site.phone.replace(/\s/g, "")}">${escapeHtml(site.phone)}</a></p>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function ownerNotificationHtml(booking: ResolvedBooking): string {
  const nights = `${booking.nights} ${booking.nights === 1 ? "yö" : "yötä"}`;
  return `<!doctype html>
<html lang="fi">
  <body style="font-family:system-ui,sans-serif;background:#f6f4ef;padding:24px;color:#1c2434;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;">
      <tr><td>
        <h1 style="font-size:20px;margin:0 0 12px;">Uusi varauspyyntö</h1>
        <p>Kanava: ${escapeHtml(booking.channel)}</p>
        <p><strong>${escapeHtml(booking.product.name)}</strong><br/>
        ${escapeHtml(formatFiDate(booking.dateFrom))} – ${escapeHtml(formatFiDate(booking.dateTo))} (${escapeHtml(nights)})</p>
        ${extraList(booking)}
        <p>Vuokra ${formatEuro(booking.subtotal)} + lisät ${formatEuro(booking.extrasTotal)} = <strong>${formatEuro(booking.total)}</strong></p>
        <p>Asiakas: ${escapeHtml(booking.name)}<br/>
        ${escapeHtml(booking.email)}<br/>
        ${escapeHtml(booking.phone)}</p>
        ${
          booking.message
            ? `<p>Viesti:<br/>${escapeHtml(booking.message).replace(/\n/g, "<br/>")}</p>`
            : ""
        }
      </td></tr>
    </table>
  </body>
</html>`;
}
