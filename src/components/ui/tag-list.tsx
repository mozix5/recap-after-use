interface TagListProps {
  tags: string[];
  limit?: number;
  isHovered?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const TagList = ({
  tags,
  limit,
  isHovered = false,
  size = "md",
  className = "",
}: TagListProps) => {
  const displayedTags = limit ? tags.slice(0, limit) : tags;
  const hasMore = limit && tags.length > limit;
  const isMd = size === "md";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {displayedTags.map((tag) => (
        <span
          key={tag}
          className={`font-mono uppercase ${
            isMd 
              ? "text-[10px] tracking-widest px-2.5 py-1" 
              : "text-[9px] tracking-wider px-2 py-0.5"
          }`}
          style={{
            border: "1px solid",
            color: isHovered ? "var(--gold)" : "var(--fg-dim)",
            borderColor: isHovered
              ? "var(--gold-muted)"
              : isMd
              ? "var(--rule)"
              : "var(--rule-light)",
            transition: "all 0.3s",
          }}
        >
          {tag}
        </span>
      ))}
      {hasMore && (
        <span className="font-mono text-[9px]" style={{ color: "var(--fg-dim)" }}>
          +{tags.length - limit}
        </span>
      )}
    </div>
  );
};
