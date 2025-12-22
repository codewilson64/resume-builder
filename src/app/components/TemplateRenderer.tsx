import BudapestTemplate from "@/app/components/templates/BudapestTemplate";
import ChicagoTemplate from "@/app/components/templates/ChicagoTemplate";
import type { ResumeData } from "@/app/types/resume";
import NordicTemplate from "./templates/NordicTemplate";
import AuroraTemplate from "./templates/AuroraTemplate";
import AtlasTemplate from "./templates/AtlasTemplate";
import ResumePage from "./ResumePage";

interface TemplateRendererProps {
  resume: ResumeData;
  variant?: "preview" | "thumbnail";
}

export default function TemplateRenderer({
  resume,
  variant = "preview",
}: TemplateRendererProps) {
  let Template;

  switch (resume.template) {
    case "Budapest":
      Template = BudapestTemplate;
      break;

    case "Chicago":
      Template = ChicagoTemplate;
      break;

    case "Nordic":
      Template = NordicTemplate;
      break;

    case "Aurora":
      Template = AuroraTemplate;
      break;
    
    case "Atlas":
      Template = AtlasTemplate;
      break;

    default:
      Template = BudapestTemplate;
  }

  return (
    <ResumePage variant={variant}>
      <Template data={resume} variant={variant} />
    </ResumePage>
  );
}
