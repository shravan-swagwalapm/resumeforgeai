"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FileText, Target, Sparkles, Upload, AlertCircle, Lightbulb, ArrowRight } from "lucide-react";

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
    if (file.type === "text/plain") {
      const text = await file.text();
      setResumeText(text);
    } else {
      setError("For this demo, please paste your resume text directly. PDF support coming soon!");
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

      if (!response.ok) throw new Error("Analysis failed. Please try again.");

      const data = await response.json();
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
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Step 1 of 2 — Enter Your Details
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Let's Optimize Your Resume
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Paste your resume and the job description below. Our AI will analyze the match and create an optimized version.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Input Cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Resume Input */}
            <div className="bg-[#12121a] rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Your Resume</h2>
                    <p className="text-gray-500 text-sm">Paste your current resume text</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Tip */}
                <div className="flex items-start gap-2 mb-4 p-3 bg-cyan-500/10 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-cyan-300">Include all your experience — even roles that seem unrelated might have transferable skills!</p>
                </div>

                {/* File upload */}
                <label className="flex items-center justify-center gap-2 p-3 mb-4 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-500/50 hover:bg-white/5 transition-all">
                  <Upload className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Upload .txt file (optional)</span>
                  <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
                </label>

                <textarea
                  placeholder="Paste your resume here...

Example:
John Doe
Senior Product Manager

Experience:
- Led product strategy for B2B SaaS platform
- Increased user engagement by 40%
- Managed team of 8 engineers..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full h-[300px] bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all"
                />
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">{resumeText.length} characters</span>
                  {resumeText.length > 50 && (
                    <span className="text-sm text-green-400 flex items-center gap-1">✓ Looks good!</span>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description Input */}
            <div className="bg-[#12121a] rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Target Job Description</h2>
                    <p className="text-gray-500 text-sm">Paste the job posting you want</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Tip */}
                <div className="flex items-start gap-2 mb-4 p-3 bg-purple-500/10 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-300">Copy the full job description including requirements — the more detail, the better the match!</p>
                </div>

                <textarea
                  placeholder="Paste the job description here...

Example:
Senior Product Manager - Payments

About the role:
We're looking for an experienced PM to lead our payments product...

Requirements:
- 5+ years of product management experience
- Experience with fintech or payments
- Strong analytical skills..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-[300px] bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
                />
                
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500">{jobDescription.length} / 10,000 characters</span>
                  {jobDescription.length > 50 && (
                    <span className="text-sm text-green-400 flex items-center gap-1">✓ Ready to analyze</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="text-center">
            <button
              onClick={handleAnalyze}
              disabled={!isReady || isAnalyzing}
              className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-600 text-white text-xl px-12 py-5 rounded-2xl font-bold inline-flex items-center gap-3 transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-2xl shadow-cyan-500/30 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6" />
                  Analyze & Optimize Resume
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {!isReady && !isAnalyzing && (
              <p className="text-gray-500 mt-4">
                👆 Add both your resume and job description to continue
              </p>
            )}

            {isAnalyzing && (
              <p className="text-cyan-400 mt-4 animate-pulse">
                ✨ Our AI is analyzing your resume... This takes about 15-30 seconds
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
