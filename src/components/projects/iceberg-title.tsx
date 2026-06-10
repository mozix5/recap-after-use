const TITLE_TEXT = "Selected case studies \u00b7 Tip of the iceberg";

interface IcebergTitleProps {
  charHighlight: number;
}

export function IcebergTitle({ charHighlight }: IcebergTitleProps) {
  const n = TITLE_TEXT.length;

  return (
    <p className="font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.35em] mb-4 md:mb-10 text-center px-4 select-none">
      {TITLE_TEXT.split("").map((char, i) => {
        const litRatio = Math.max(0, Math.min(1, (charHighlight - i / n) * n));
        const isCurrent = charHighlight > (i - 1) / n && charHighlight <= (i + 2) / n;
        return (
          <span
            key={i}
            style={{
              color: litRatio > 0.5 ? "var(--fg)" : "var(--fg-muted)",
              opacity: 0.18 + litRatio * 0.82,
              textShadow:
                isCurrent && litRatio > 0.3
                  ? "0 0 8px var(--gold), 0 0 2px var(--gold)"
                  : "none",
              transition: "color 0.08s linear, text-shadow 0.1s ease",
              display: "inline",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </p>
  );
}
