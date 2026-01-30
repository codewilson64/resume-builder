"use client";

import ResumeEditor from "@/app/components/desktop/ResumeEditor";
import { SubscriptionProvider } from "@/app/context/SubscriptionContext";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubscriptionProvider>
      <div className="h-screen bg-slate-50">
        <div className="mx-auto max-w-full flex justify-center">
          <ResumeEditor>
            {children}
          </ResumeEditor>
        </div>
      </div>
    </SubscriptionProvider>
  );
}
