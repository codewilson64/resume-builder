"use client";

export default function ResumePage({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "preview" | "thumbnail";
  pageIndex?: number;
}) {
  return (
    <div
      className="bg-white shadow-xl mb-6 resume-print"
      style={{
        width: 794,
        height: 1123,
        transform: variant === "thumbnail" ? "scale(0.32)" : undefined,
        transformOrigin: "top left",
      }}
    >
      {children}
    </div>
  );
}
