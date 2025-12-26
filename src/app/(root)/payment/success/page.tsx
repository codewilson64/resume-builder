import SuccessPage from "@/app/components/checkouts/SuccessPage";
import { Suspense } from "react";

export default function SuccessRedirectPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading…</p>}>
      <SuccessPage />
    </Suspense>
  );
}
