import PreviewPage from "@/app/components/resume/Preview";
import { getCurrentUser } from "@/lib/actions/auth-action";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Preview() {
  const user = await getCurrentUser();

  return <PreviewPage isLoggedIn={!!user} />;
}
