"use client";

export default function AccentSelector({ value, onChange }) {
  const colors = [
    { name: "Gray", color: "#2D2D2D" },
    { name: "Blue", color: "#14213D" },
    { name: "Red", color: "#DC2626" },
    { name: "Green", color: "#16A34A" },
    { name: "Purple", color: "#7C3AED" },
    { name: "Orange", color: "#EA580C" },
  ];

  return (
    <div className="w-full mb-6">
      <label className="font-medium text-gray-700 text-sm block mb-2">
        Accent Color
      </label>

      <div className="flex flex-wrap gap-3">
        {colors.map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => onChange(c.color)}
            className={`
              w-10 h-10 rounded-full border-2 transition 
              flex items-center justify-center relative
              ${value === c.color ? "border-white" : "border-gray-300"}
            `}
            style={{ backgroundColor: c.color }}
          >
            {value === c.color && (
              <span className="absolute inset-0 flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
