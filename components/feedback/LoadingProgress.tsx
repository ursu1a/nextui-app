import { Progress } from "@nextui-org/progress";
import { Spinner } from "@nextui-org/spinner";

export interface LoadingProgressProps {
  type?: "progress" | "spinner";
}

export default function LoadingProgress({
  type = "spinner",
}: LoadingProgressProps) {
  const renderSpinner = () => (
    <div className="absolute inset-0 z-50 bg-main bg-opacity-80">
      <div className="flex items-center justify-center min-h-full">
        <Spinner />
      </div>
    </div>
  );

  const renderProgress = () => (
    <Progress size="sm" isIndeterminate aria-label="Loading..." />
  );

  return (
    <>
      {type === "spinner" && renderSpinner()}
      {type === "progress" && renderProgress()}
    </>
  );
}
