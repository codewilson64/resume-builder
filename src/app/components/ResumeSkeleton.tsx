export default function ResumeSkeleton() {
    return (
      <div
        className="bg-white w-[794px] h-[1123px] p-10 animate-pulse"
      >
        {/* Header */}
        <div className="space-y-3 mb-8">
          <div className="h-6 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/2 bg-gray-300 rounded" />
        </div>
  
        {/* Sections */}
        <div className="space-y-6">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-3">
              <div className="h-4 w-1/3 bg-gray-300 rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-11/12 bg-gray-200 rounded" />
                <div className="h-3 w-10/12 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  