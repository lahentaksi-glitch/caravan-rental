import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold text-foreground">Sivua ei löytynyt</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Etsimääsi sivua ei ole tai se on siirretty. Palaa etusivulle tai valitse tuote
        valikosta.
      </p>
      <Link href="/" className={buttonVariants({ size: "lg", className: "mt-8" })}>
        Takaisin etusivulle
      </Link>
    </Container>
  );
}
