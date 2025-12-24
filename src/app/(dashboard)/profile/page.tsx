import CreateResumeButton from "@/app/components/dashboard/CreateResumeButton";
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
  console.log(resumes)
  
  return (
    <div className="w-full min-h-screen flex justify-center py-12">
      <div className="w-full py-10 px-5 ">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Your documents
          </h1>

          <CreateResumeButton />
        </div>

        {/* Resume Card */}
        <ResumeList resumes={resumes}/>
      </div>
      </div>
    </div>
  );
}