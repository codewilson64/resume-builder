import FinalPage from "@/app/components/resume/FinalPage";
import { Suspense } from "react";

export default function FinishingPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading…</p>}>
      <FinalPage />
    </Suspense>
  );
}
