import { LoadingState } from "@/components/system";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background" role="status" aria-live="polite" aria-label="Page loading">
      <LoadingState message="INITIALIZING SYSTEM..." />
    </div>
  );
}
