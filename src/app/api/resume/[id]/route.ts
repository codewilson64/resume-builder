import { getResumeById } from "@/lib/actions/resume-action";

export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const resume = await getResumeById(id);

    if (!resume) {
      return new Response("Resume not found", { status: 404 });
    }

    return Response.json(resume);
  } catch (err) {
    return new Response("Unauthorized", { status: 401 });
  }
}
