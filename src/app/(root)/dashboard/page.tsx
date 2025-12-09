import { getCurrentUser } from "@/lib/actions/auth-action";

export default async function DashboardPage() {
  const session = await getCurrentUser();

  if (!session) {
    return (
      <div>
        <meta httpEquiv="refresh" content="0; url=/login" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.name}</h1>
      <p>Your Dashboard Content</p>
    </div>
  );
}
