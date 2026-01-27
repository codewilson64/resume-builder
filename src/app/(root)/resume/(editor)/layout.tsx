"use client";

import ResumeEditor from "@/app/components/desktop/ResumeEditor";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-slate-50">
      <div className="mx-auto max-w-full flex justify-center">
        <ResumeEditor isPremium={null}>
          {children}
        </ResumeEditor>
      </div>
    </div>
  );
}
