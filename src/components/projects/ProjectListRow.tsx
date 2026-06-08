import React from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Magnetic } from "@/components/ui/magnetic";
import { TagList } from "@/components/ui/tag-list";

export type ProjectItem = {
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  color: string;
  liveUrl: string;
  sourceUrl: string;
};

interface ProjectListRowProps {
  project: ProjectItem;
  index: number;
  isHovered: boolean;
}

export const ProjectListRow = React.forwardRef<HTMLDivElement, ProjectListRowProps>(
  ({ project, index, isHovered }, ref) => {
    const formattedIndex = String(index + 1).padStart(2, "0");

    return (
      <div
        ref={ref}
        className="relative flex flex-col md:flex-row md:items-center justify-between gap-8 py-14 border-b transition-colors duration-300 group"
        style={{ borderColor: "var(--rule-light)" }}
      >
        <div className="flex items-center gap-8">
          <span
            className="font-bebas text-3xl md:text-4xl transition-colors duration-300"
            style={{ color: isHovered ? "var(--gold)" : "var(--fg-dim)" }}
          >
            {formattedIndex}
          </span>
          <h3
            className="font-bebas text-4xl md:text-6xl uppercase tracking-wider transition-colors duration-300"
            style={{ color: isHovered ? "var(--fg)" : "var(--fg-muted)" }}
          >
            {project.title}
          </h3>
        </div>

        <div className="flex flex-col gap-2.5 max-w-xl md:px-6">
          <p
            className="font-lora text-[13px] leading-relaxed transition-colors duration-300"
            style={{ color: isHovered ? "var(--fg)" : "var(--fg-dim)" }}
          >
            {project.description.split(".")[0].trim()}.
          </p>
          <TagList tags={project.techStack} limit={4} isHovered={isHovered} className="mt-1" />
        </div>

        <div className="flex items-center gap-3 shrink-0 md:ml-6 z-10">
          <Magnetic>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200"
              style={{
                background: "rgba(240,237,230,0.05)",
                border: "1px solid var(--rule-light)",
                color: "var(--fg)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold)";
                e.currentTarget.style.color = "var(--bg)";
                e.currentTarget.style.borderColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(240,237,230,0.05)";
                e.currentTarget.style.color = "var(--fg)";
                e.currentTarget.style.borderColor = "var(--rule-light)";
              }}
            >
              Preview <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200"
              style={{ border: "1px solid var(--rule-light)", color: "var(--fg-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--fg-muted)";
                e.currentTarget.style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--rule-light)";
                e.currentTarget.style.color = "var(--fg-muted)";
              }}
            >
              <FaGithub className="h-3.5 w-3.5" /> Source
            </a>
          </Magnetic>
        </div>
      </div>
    );
  }
);

ProjectListRow.displayName = "ProjectListRow";
