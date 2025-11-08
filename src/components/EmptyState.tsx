import { Alert, AlertDescription } from "@/components/ui/alert";

export function EmptyPrompt({ children }: { children: React.ReactNode }) {
  return (
    <Alert className="text-center">
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
