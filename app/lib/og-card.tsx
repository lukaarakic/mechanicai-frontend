import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Satori can't resolve CSS variables or next/font, so the palette from
// app/globals.css is mirrored here as literals and the faces are read from
// assets/fonts. Blog covers in mechanicai-studio/covers use the same design.
const PAPER = "#080808";
const INK = "#f1f1f1";
const INK_SOFT = "rgba(241, 241, 241, 0.55)";
const RULE = "rgba(241, 241, 241, 0.14)";
const ACCENT = "#1eadff";

// Read at module scope: the OG routes take no request-time APIs, so they're
// statically generated and these resolve at build time.
const assetsPromise = Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Anton-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Inter-Medium.ttf")),
  readFile(join(process.cwd(), "assets/fonts/DMMono-Medium.ttf")),
  readFile(join(process.cwd(), "app/assets/logo-white.svg")),
]);

type OgCardProps = {
  label: string;
  titleLines: string[];
  summary: string;
  footer: string[];
  kicker?: string;
};

const mono = {
  fontFamily: "DM Mono",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
} as const;

export async function renderOgCard({
  label,
  titleLines,
  summary,
  footer,
  kicker = "Free to start",
}: OgCardProps) {
  const [anton, inter, dmMono, logo] = await assetsPromise;
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: PAPER,
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(30, 173, 255, 0.16), rgba(8, 8, 8, 0) 55%)",
          color: INK,
          fontFamily: "Inter",
          padding: "0 64px",
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 96,
            borderBottom: `1px solid ${RULE}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={34} height={34} alt="" />
            <div style={{ fontFamily: "Anton", fontSize: 34, textTransform: "uppercase" }}>
              DashClue
            </div>
            <div style={{ width: 1, height: 34, background: INK, opacity: 0.6 }} />
            <div
              style={{
                ...mono,
                display: "flex",
                flexDirection: "column",
                fontSize: 13,
                color: INK_SOFT,
              }}
            >
              <span>AI car diagnosis</span>
              <span>on call 24/7</span>
            </div>
          </div>
          <div style={{ ...mono, display: "flex", alignItems: "center", gap: 12, fontSize: 16 }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: ACCENT }} />
            {kicker}
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: 44 }}>
          <div style={{ ...mono, display: "flex", fontSize: 17, color: ACCENT }}>{label}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 22,
              fontFamily: "Anton",
              fontSize: 112,
              lineHeight: 0.92,
              textTransform: "uppercase",
            }}
          >
            {titleLines.map((line, i) => (
              <div key={line} style={{ display: "flex", alignItems: "flex-end" }}>
                {line}
                {i === titleLines.length - 1 ? (
                  <div
                    style={{
                      width: 15,
                      height: 15,
                      marginLeft: 6,
                      marginBottom: 14,
                      background: ACCENT,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 820,
              fontSize: 26,
              lineHeight: 1.4,
              color: INK_SOFT,
            }}
          >
            {summary}
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            ...mono,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 72,
            borderTop: `1px solid ${RULE}`,
            fontSize: 16,
            color: INK_SOFT,
          }}
        >
          {footer.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Inter", data: inter, style: "normal", weight: 500 },
        { name: "DM Mono", data: dmMono, style: "normal", weight: 500 },
      ],
    },
  );
}
