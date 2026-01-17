import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeForge AI - Turn Your PM Resume Into an Interview Magnet",
  description: "AI-powered resume optimization designed specifically for Product Managers. Analyze your resume against any job description and get a tailored, ATS-optimized version in seconds.",
  keywords: ["resume", "product manager", "AI", "job search", "career"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
