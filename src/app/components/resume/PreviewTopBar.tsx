"use client";

import { X, SlidersHorizontal } from "lucide-react";

interface PreviewTopBarProps {
  onSettings: () => void;
  onDownload: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function PreviewTopBar({
  onSettings,
  onDownload,
  onCancel,
  loading
}: PreviewTopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white">
      <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Settings */}
        <button
          onClick={onSettings}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition"
        >
          <SlidersHorizontal size={18} />
        </button>

        {/* Center: Download */}
        <button
          onClick={onDownload}
          disabled={loading}
          className="px-5 py-2 rounded-md bg-cyan-400 hover:bg-cyan-500 transition font-semibold text-sm"
        >
          {loading ? "Downloading..." : "Download"}
        </button>

        {/* Right: Cancel */}
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
