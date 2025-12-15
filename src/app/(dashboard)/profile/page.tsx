import ResumeList from "@/app/components/dashboard/ResumeList";
import { getCurrentUser } from "@/lib/actions/auth-action";
import { getUserResumes } from "@/lib/actions/resume-action";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function ProfilePage() {
  const session = await getCurrentUser();
  if (!session) redirect('/login')

  const resumes = await getUserResumes()
  
  return (
    <div className="min-h-screen flex justify-center py-12">
      <div className="w-full py-12 px-5 space-y-6">

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