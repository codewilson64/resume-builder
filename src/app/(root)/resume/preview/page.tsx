import PreviewPage from "@/app/components/resume/Preview";
import { getCurrentUser } from "@/lib/actions/auth-action";

export default async function Preview() {
  const user = await getCurrentUser();

  return <PreviewPage isLoggedIn={!!user} />;
}
