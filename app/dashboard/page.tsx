"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Target, Sparkles, Upload, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For MVP, we'll just read text files
    // In production, you'd use pdf-parse or mammoth for PDF/DOCX
    if (file.type === "text/plain") {
      const text = await file.text();
      setResumeText(text);
    } else {
      setError("For this demo, please paste your resume text directly. PDF/DOCX support coming soon!");
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please provide both your resume and the job description");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed. Please try again.");
      }

      const data = await response.json();
      
      // Store results in sessionStorage for results page
      sessionStorage.setItem("analysisResults", JSON.stringify(data));
      sessionStorage.setItem("originalResume", resumeText);
      sessionStorage.setItem("jobDescription", jobDescription);
      
      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsAnalyzing(false);
    }
  };

  const isReady = resumeText.trim().length > 50 && jobDescription.trim().length > 50;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Optimize Your Resume
          </h1>
          <p className="text-gray-600">
            Paste your resume and target job description to get an AI-optimized version
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Input Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Resume Input */}
          <Card className="border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                Your Resume
              </CardTitle>
              <CardDescription>
                Paste your current resume text below
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* File upload option */}
              <label className="flex items-center justify-center gap-2 p-3 mb-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Upload .txt file (optional)</span>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <Textarea
                placeholder="Paste your resume here...

Example:
John Doe
Senior Product Manager

Experience:
• Led product strategy for a B2B SaaS platform serving 10K+ users
• Increased user engagement by 40% through data-driven feature prioritization
• Managed a cross-functional team of 8 engineers and 2 designers
..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[300px] text-sm"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{resumeText.length} characters</span>
                {resumeText.length > 50 && (
                  <span className="text-green-600 flex items-center gap-1">
                    ✓ Ready
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Description Input */}
          <Card className="border-2 border-dashed border-gray-200 hover:border-purple-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                Target Job Description
              </CardTitle>
              <CardDescription>
                Paste the job description you are applying for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste the job description here...

Example:
Senior Product Manager - Payments

About the role:
We're looking for an experienced PM to lead our payments product...

Requirements:
• 5+ years of product management experience
• Experience with B2B SaaS products
• Strong analytical skills and data-driven mindset
..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[350px] text-sm"
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>{jobDescription.length} / 10,000 characters</span>
                {jobDescription.length > 50 && (
                  <span className="text-green-600 flex items-center gap-1">
                    ✓ Ready
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analyze Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={!isReady || isAnalyzing}
            className="h-14 px-12 text-lg"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full spinner mr-2" />
                Analyzing with Claude AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze & Optimize Resume
              </>
            )}
          </Button>

          {!isReady && !isAnalyzing && (
            <p className="text-sm text-gray-500 mt-3">
              Add both your resume and job description to continue
            </p>
          )}

          {isAnalyzing && (
            <p className="text-sm text-gray-500 mt-3">
              This usually takes 15-30 seconds...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
