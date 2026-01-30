import DesktopPreview from "./DesktopPreview";

export default function ResumeEditor({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex flex-col xl:flex-row overflow-auto">

      {/* LEFT: Editor */}
      <div className="w-full xl:w-1/2 xl:overflow-y-auto">
        {children}
      </div>

      {/* RIGHT: Preview */}
      <div className="hidden xl:block xl:w-1/2 xl:overflow-y-auto">
        <DesktopPreview />
      </div>

    </div>
  );
}
