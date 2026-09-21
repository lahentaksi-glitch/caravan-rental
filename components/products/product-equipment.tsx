import { CircleCheck } from "lucide-react";

export function ProductEquipment({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
        >
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
          <span className="text-sm font-medium leading-relaxed text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
