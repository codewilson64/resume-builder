import React from 'react'

const Watermark = () => {
  return (
    <>
    {/* ===== WATERMARK OVERLAY ===== */}
          <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
            {/* Top-left → center */}
            <span
              className="absolute text-7xl font-bold text-gray-400/20"
              style={{
                top: "25%",
                left: "22%",
                transform: "rotate(-30deg)",
              }}
            >
              Confidencv
            </span>
    
            {/* Bottom-right → center */}
            <span
              className="absolute text-7xl font-bold text-gray-400/20"
              style={{
                bottom: "40%",
                right: "24%",
                transform: "rotate(-30deg)",
              }}
            >
              Confidencv
            </span>
          </div>
    </>
  )
}

export default Watermark