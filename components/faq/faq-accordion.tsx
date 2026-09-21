import type { FaqItem } from "@/types/rental";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Usein kysytyt kysymykset päivitetään pian.
      </p>
    );
  }

  return (
    <Accordion className="w-full rounded-2xl border border-white/50 bg-white/70 px-4 shadow-[0_16px_40px_-24px_rgba(20,40,80,0.4)] backdrop-blur-xl sm:px-6">
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="text-left text-base font-medium">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
