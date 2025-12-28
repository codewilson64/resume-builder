export default function FinalPageSkeleton() {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 animate-pulse">
        {/* Back button */}
        <div className="w-6 h-6 bg-gray-200 rounded mb-8" />
  
        {/* Title */}
        <div className="h-8 w-64 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-96 bg-gray-100 rounded mb-10" />
  
        {/* Job title */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
  
        {/* Resume Format */}
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
  
        {/* Template select */}
        <div className="h-12 w-full bg-gray-200 rounded mb-6" />
  
        {/* Font family */}
        <div className="h-12 w-full bg-gray-200 rounded mb-6" />
  
        {/* Accent Color */}
        <div className="h-5 w-32 bg-gray-200 rounded mb-3" />
        <div className="flex gap-3 mb-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
          ))}
        </div>
  
        {/* Button */}
        <div className="h-14 w-full bg-gray-300 rounded-lg" />
      </div>
    );
  }
  