import BudapestTemplate from "@/app/components/templates/BudapestTemplate";
import ChicagoTemplate from "@/app/components/templates/ChicagoTemplate";
import type { ResumeData } from "@/app/types/resume";
import NordicTemplate from "./templates/NordicTemplate";

interface TemplateRendererProps {
  resume: ResumeData;
  variant?: "preview" | "thumbnail";
}

export default function TemplateRenderer({
  resume,
  variant = "preview",
}: TemplateRendererProps) {
  switch (resume.template) {
    case "Budapest":
      return <BudapestTemplate data={resume} variant={variant} />;

    case "Chicago":
      return <ChicagoTemplate data={resume} variant={variant} />;
    
    case "Nordic":
      return <NordicTemplate data={resume} variant={variant} />;

    default:
      return <BudapestTemplate data={resume} variant={variant} />;
  }
}
