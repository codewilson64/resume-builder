import FinalPageSkeleton from "@/app/components/skeletons/FinalPageSkeleton";
import FinalPage from "@/app/components/resume/FinalPage";
import { Suspense } from "react";

export default function FinishingPage() {
  return (
    <Suspense fallback={<FinalPageSkeleton />}>
      <FinalPage />
    </Suspense>
  );
}
