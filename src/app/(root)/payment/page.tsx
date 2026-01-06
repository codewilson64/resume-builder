"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getCurrentUser } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";

type Plan = "weekly" | "monthly";

const PLAN_CONFIG = {
  weekly: {
    productId: "66ac7322-9315-4e8b-8ce1-020999226132",
    label: "Weekly Access",
    priceLabel: "$2.95",
    renewalPrice: "$2.95",
    renewalPeriod: "week",
    refundDays: 7,
    renewalText:
      "After 7 days, your subscription will automatically renew and $2.95 will be charged every week. You can cancel at any time.",
  },
  monthly: {
    productId: "53b8125b-9fe8-4b26-8a98-c367c3048bcf",
    label: "Monthly Access",
    priceLabel: "$9.95",
    renewalPrice: "$9.95",
    renewalPeriod: "month",
    refundDays: 7,
    renewalText:
      "After 7 days, your subscription will automatically renew and $9.95 will be charged every month. You can cancel at any time.",
  },
};

export default function PaymentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan>("weekly");
  const meta = PLAN_CONFIG[plan];

  async function handleCheckout() {
    try {
      setLoading(true);

      const user = await getCurrentUser()
      if(!user) {
        router.push('/login')
      } 

      await authClient.checkout({
        // Polar Product IDs
        products: [meta.productId],
        // OR if you configured products in the plugin:
        // slug: "weekly",
      });
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Download your professional resume
          </h1>
          <p className="text-sm text-gray-500">
            Choose a plan to continue
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {(Object.keys(PLAN_CONFIG) as Plan[]).map((key) => {
            const p = PLAN_CONFIG[key];
            return (
              <label
                key={key}
                className={`flex items-start gap-3 border rounded-lg p-4 cursor-pointer transition ${
                  plan === key
                    ? "border-cyan-400 ring-2 ring-cyan-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  checked={plan === key}
                  onChange={() => setPlan(key)}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      {p.label}
                    </h3>

                    {key === "weekly" && (
                      <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-full">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-gray-700">
                    <span className="text-3xl font-bold">
                      {p.priceLabel}
                    </span>
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Features */}
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
            <span>Unlimited resume creation.</span>
          </li>

          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
            <span>Unlimited cover letter creation.</span>
          </li>

          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
            <span>Enjoy priority support.</span>
          </li>

          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
            <span>{meta.renewalText}</span>
          </li>

          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
            <span>
              If you are not satisfied for any reason within the first{" "}
              <span className="font-medium">{meta.refundDays} days</span>,{" "}
              contact us and we will refund your money.
            </span>
          </li>
        </ul>

        {/* Agreement */}
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          By continuing, you agree to our{" "}
          <a
            href="/terms-and-conditions"
            className="text-cyan-600 hover:underline font-medium"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="text-cyan-600 hover:underline font-medium"
          >
            Privacy Policy
          </a>
          .
        </p>

        {/* CTA */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-lg transition"
        >
          {loading ? "Redirecting…" : "Continue"}
        </button>

      </div>
    </div>
  );
}
