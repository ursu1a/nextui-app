import { title } from "@/components/primitives";
import ProtectedRoute from "@/components/protected";

export default function PricingPage() {
  return (
    <ProtectedRoute>
      <h1 className={title()}>Pricing</h1>
    </ProtectedRoute>
  );
}
