import { ShieldCheck, Star, Car, FileText } from "lucide-react";
import Link from "next/link";

const items = [
  { icon: Car, label: "B-kortti riittää" },
  { icon: ShieldCheck, label: "Vakuutus sisältyy" },
  { icon: Star, label: "5/5 asiakaspalautteet" },
  { icon: FileText, label: "Selkeät ehdot", href: "/hinnasto" },
] as const;

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={
        compact
          ? "grid grid-cols-2 gap-2 sm:grid-cols-4"
          : "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {items.map((item) => {
        const content = (
          <>
            <item.icon className="size-4 shrink-0 text-accent" aria-hidden />
            <span>{item.label}</span>
          </>
        );
        const className =
          "flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-xs font-medium text-foreground shadow-sm backdrop-blur-md sm:text-sm";
        if ("href" in item && item.href) {
          return (
            <li key={item.label}>
              <Link href={item.href} className={`${className} transition-colors hover:border-accent/50`}>
                {content}
              </Link>
            </li>
          );
        }
        return (
          <li key={item.label} className={className}>
            {content}
          </li>
        );
      })}
    </ul>
  );
}
