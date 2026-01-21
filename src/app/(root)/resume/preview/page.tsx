import PreviewPage from "@/app/components/resume/Preview";
import { getCurrentUser } from "@/lib/actions/auth-action";
import { hasPremiumAccess } from "@/lib/actions/subscription-action";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Preview() {
  const user = await getCurrentUser();
  const isPremium = await hasPremiumAccess();

  return <PreviewPage isLoggedIn={!!user} isPremium={isPremium}/>;
}
