import ResumeList from "@/app/components/dashboard/ResumeList";
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
    <div className="min-h-screen flex justify-center py-12 bg-gray-50">
      <div className="w-full max-w-3xl py-12 px-5 space-y-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {session?.name}
        </h1>

        {/* Resume Card */}
        <ResumeList resumes={resumes}/>

      </div>
    </div>
  );
}
