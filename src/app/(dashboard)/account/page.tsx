"use client";

import { signOut } from "@/lib/actions/auth-action";
import { createCustomerPortalSession, getCurrentSubscription } from "@/lib/actions/subscription-action";
import { useRouter } from "next/navigation";
import { LogOut, Phone } from "lucide-react";
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

  // Log out
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

  // Cancel Plan
  const handleCancelPlan = async () => {
    setCanceling(true);
    try {
      const polarCustomerPortal = await createCustomerPortalSession();
      window.location.href = polarCustomerPortal;
    } catch (err) {
      console.error(err);
      alert("Failed to open billing portal");
    } finally {
      setCanceling(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "trialing":
        return "Trial";
      case "active":
        return "Active";
      case "canceled":
        return "Canceled";
      default:
        return "Inactive";
    }
  };

  const getDateLabel = (
    status: string,
    hasCanceled: boolean
  ) => {
    if (status === "trialing" || status === "active") {
      return hasCanceled ? "Expires at" : "Renews at";
    }
    if (status === "canceled") {
      return "Ended on";
    }
    return "";
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
                {getStatusLabel(subscription.status)} ·{" "}
                {getDateLabel(subscription.status, subscription.hasCanceled)}{" "}
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
              onClick={handleCancelPlan}
              disabled={subscription.status === "canceled" || canceling}
              className="flex items-center gap-2 text-sm font-medium text-red-500 disabled:opacity-50"
            >
              {subscription.status === "canceled" ? "Plan canceled" : "Manage subscription"}
            </button>

          </div>
        )}
      </div>

      {/* Contact us */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <a
          href="mailto:wilsonnn948@gmail.com"
          className="w-fit flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 disabled:opacity-50"
        >
          <Phone className="w-4 h-4" />
          Contact us
        </a>
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

    </div>
  );
}
