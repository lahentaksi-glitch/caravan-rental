import { Container } from "@/components/ui/container";

export default function ProductLoading() {
  return (
    <Container className="py-14">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-48 rounded bg-muted" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-[4/3] rounded-2xl bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
        </div>
      </div>
    </Container>
  );
}
