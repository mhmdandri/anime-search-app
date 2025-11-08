import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <Alert variant="destructive" className="text-start">
      <AlertTitle>Terjadi Kesalahan</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {onRetry && (
          <div className="mt-3">
            <Button onClick={onRetry} size="sm" variant="ghost">
              Refresh
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}
