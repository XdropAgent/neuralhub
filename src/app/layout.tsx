import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeuralHub — Deploy AI Agents at Scale",
  description: "Open-source platform for deploying, orchestrating, and monitoring autonomous AI agents across any infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
