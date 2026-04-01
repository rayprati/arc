import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ARC | Break your bad habit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#07080b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(160,40,40,0.18) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: "#f7f8fb",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          ARC
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(231, 235, 243, 0.6)",
            marginTop: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Break your bad habit.
        </div>
      </div>
    ),
    { ...size }
  );
}
