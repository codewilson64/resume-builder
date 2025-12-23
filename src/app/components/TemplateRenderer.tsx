import OrionTemplate from "@/app/components/templates/OrionTemplate";
import NovaTemplate from "@/app/components/templates/NovaTemplate";
import NordicTemplate from "./templates/NordicTemplate";
import AuroraTemplate from "./templates/AuroraTemplate";
import AtlasTemplate from "./templates/AtlasTemplate";
import AstraTemplate from "./templates/AstraTemplate";
import ResumePage from "./ResumePage";
import ZenithTemplate from "./templates/ZenithTemplate";
import type { ResumeData } from "@/app/types/resume";

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
    case "Orion":
      Template = OrionTemplate;
      break;

    case "Nova":
      Template = NovaTemplate;
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
    
    case "Astra":
      Template = AstraTemplate;
      break;

    case "Zenith":
      Template = ZenithTemplate;
      break;

    default:
      Template = OrionTemplate;
  }

  return (
    <ResumePage variant={variant}>
      <Template data={resume} variant={variant} />
    </ResumePage>
  );
}
