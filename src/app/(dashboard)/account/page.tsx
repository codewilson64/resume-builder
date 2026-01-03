"use client";

import { signOut } from "@/lib/actions/auth-action";
import { cancelCurrentSubscription, getCurrentSubscription } from "@/lib/actions/subscription-action";
import { useRouter } from "next/navigation";
import { LogOut, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import PlanSkeleton from "@/app/components/skeletons/PlanSkeleton";

type SubscriptionData = Awaited<ReturnType<typeof getCurrentSubscription>>;

export default function AccountPage() {
  const router = useRouter();
  const [subscription, setSubscription] = useState<SubscriptionData>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

 useEffect(() => {
  let mounted = true;

  const loadSubscription = async () => {
    try {
      const data = await getCurrentSubscription();
      if (mounted) setSubscription(data);
    } catch (err) {
      console.error(err);
      if (mounted) setError("Failed to load subscription");
    } finally {
      if (mounted) setLoading(false);
    }
  };

  loadSubscription();

  return () => {
    mounted = false;
  };
}, []);


const handleLogout = async () => {
  setLoggingOut(true)
  try {
    await signOut();    
    router.replace("/");
  } catch (error) {
    console.log("Log out failed")
  } finally {
    setLoggingOut(false)
  }
};

const handleCancelPlan = async () => {
  setCanceling(true);
  try {
    await cancelCurrentSubscription();

    // Reload subscription state
    const data = await getCurrentSubscription();
    setSubscription(data);
  } catch (err) {
    console.error(err);
    alert("Failed to cancel subscription");
  } finally {
    setCanceling(false)
  }
};


  return (
    <div className="w-full max-w-3xl px-6 py-28">
      <h1 className="text-2xl font-bold mb-12">My Account</h1>

      <div className="mb-3">
        <h2 className="text-lg font-semibold">Current Plan</h2>
      </div>

      {/* Plan Card */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        {loading ? (
          <PlanSkeleton />
        ): error ? (
          <p className="text-sm text-red-500">{error}</p>
        ): !subscription ? (
          <p className="text-sm text-gray-500">No active plan</p>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-medium">
                {subscription.planName}
              </p>

              <p className="text-sm text-gray-600">
                {subscription.isTrial
                  ? "Trial"
                  : "Active"}{" "}
                · Expires at{" "}
                {subscription.expiresAt
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    }).format(new Date(subscription.expiresAt))
                : "—"}
              </p>
            </div>

            <button
              onClick={() => setShowCancelModal(true)}
              disabled={subscription.status === "canceled" || canceling}
              className="flex items-center gap-2 text-sm font-medium text-red-500 disabled:opacity-50"
            >
              {subscription.status === "canceled" ? "Plan canceled" : "Cancel plan"}
            </button>

          </div>
        )}
      </div>

      {/* Logout */}
      <div className="bg-white rounded-xl border p-6">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">
              Cancel subscription?
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Your plan will remain active until the end of the current billing
              period. You won’t be charged again.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={canceling}
                className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50"
              >
                Keep plan
              </button>

              <button
                onClick={async () => {
                  setShowCancelModal(false);
                  await handleCancelPlan();
                }}
                disabled={canceling}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {canceling ? "Canceling…" : "Yes, cancel plan"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
