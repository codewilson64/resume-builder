"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get("checkout_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl border shadow-sm p-6 text-center space-y-4">

        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />

        <h1 className="text-xl font-semibold text-gray-900">
          Payment successful!
        </h1>

        <p className="text-sm text-gray-600">
          Thank you for your purchase. Your subscription is now active.
        </p>

        {checkoutId && (
          <p className="text-xs text-gray-400 break-all">
            Checkout ID: {checkoutId}
          </p>
        )}

        <Link
          href="/profile"
          className="inline-block w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-lg transition"
        >
          Go back to download your resume
        </Link>
      </div>
    </div>
  );
}
