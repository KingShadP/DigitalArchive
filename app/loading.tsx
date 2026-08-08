import { LoadingState } from "@/components/system";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <LoadingState message="INITIALIZING SYSTEM..." />
    </div>
  );
}
