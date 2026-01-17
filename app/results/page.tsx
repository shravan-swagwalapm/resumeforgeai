"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Lightbulb, 
  FileText, 
  ArrowLeft,
  Copy,
  Check,
  Sparkles
} from "lucide-react";

interface GapItem {
  requirement: string;
  match_level: "strong" | "partial" | "gap";
  current_evidence: string;
  suggestion: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  bullets: string[];
}

interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

interface AnalysisResult {
  jd_analysis: {
    company: string;
    role: string;
    seniority: string;
    key_requirements: Array<{
      requirement: string;
      category: string;
      keywords: string[];
    }>;
  };
  gap_analysis: GapItem[];
  improvements: string[];
  optimized_resume: {
    header: {
      name: string;
      title: string;
      contact: string;
    };
    summary: string;
    experience: ExperienceItem[];
    skills: string[];
    education: EducationItem[];
  };
}

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"gaps" | "resume">("gaps");
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("analysisResults");
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      router.push("/dashboard");
    }
  }, [router]);

  const getMatchIcon = (level: string) => {
    switch (level) {
      case "strong":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "partial":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "gap":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getMatchBadge = (level: string) => {
    switch (level) {
      case "strong":
        return "bg-green-100 text-green-700";
      case "partial":
        return "bg-yellow-100 text-yellow-700";
      case "gap":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const copyResumeToClipboard = () => {
    if (!results) return;
    
    const resume = results.optimized_resume;
    const text = `${resume.header.name}
${resume.header.title}
${resume.header.contact}

SUMMARY
${resume.summary}

EXPERIENCE
${resume.experience.map(exp => `
${exp.role} | ${exp.company}
${exp.duration}
${exp.bullets.map(b => `• ${b}`).join('\n')}`).join('\n')}

SKILLS
${resume.skills.join(' • ')}

EDUCATION
${resume.education.map(edu => `${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full spinner" />
      </div>
    );
  }

  const strongMatches = results.gap_analysis.filter(g => g.match_level === "strong").length;
  const partialMatches = results.gap_analysis.filter(g => g.match_level === "partial").length;
  const gaps = results.gap_analysis.filter(g => g.match_level === "gap").length;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>New Analysis</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mb-2">
            <Sparkles className="w-4 h-4" />
            Analysis Complete
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resume Optimized for {results.jd_analysis.role}
          </h1>
          <p className="text-gray-600">
            {results.jd_analysis.company} • {results.jd_analysis.seniority} Level
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{strongMatches}</div>
            <div className="text-sm text-green-700">Strong Matches</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600">{partialMatches}</div>
            <div className="text-sm text-yellow-700">Partial Matches</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{gaps}</div>
            <div className="text-sm text-red-700">Gaps to Address</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("gaps")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "gaps"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Gap Analysis & Tips
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === "resume"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Optimized Resume
          </button>
        </div>

        {activeTab === "gaps" && (
          <div className="space-y-6">
            {/* Gap Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Skills Gap Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.gap_analysis.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      {getMatchIcon(item.match_level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {item.requirement}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${getMatchBadge(
                              item.match_level
                            )}`}
                          >
                            {item.match_level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.current_evidence}
                        </p>
                        {item.match_level !== "strong" && (
                          <p className="text-sm text-indigo-600">
                            💡 {item.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Key Improvements Made
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "resume" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Your Optimized Resume
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={copyResumeToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {results.optimized_resume.header.name}
                  </h2>
                  <p className="text-lg text-indigo-600 font-medium mb-2">
                    {results.optimized_resume.header.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {results.optimized_resume.header.contact}
                  </p>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Summary
                  </h3>
                  <p className="text-gray-700">
                    {results.optimized_resume.summary}
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Experience
                  </h3>
                  <div className="space-y-5">
                    {results.optimized_resume.experience.map((exp, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-semibold text-gray-900">
                              {exp.role}
                            </span>
                            <span className="text-gray-500"> | {exp.company}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {exp.duration}
                          </span>
                        </div>
                        <ul className="space-y-1 mt-2">
                          {exp.bullets.map((bullet, j) => (
                            <li
                              key={j}
                              className="text-gray-700 text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.optimized_resume.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                    Education
                  </h3>
                  {results.optimized_resume.education.map((edu, i) => (
                    <div key={i} className="text-gray-700">
                      <span className="font-medium">{edu.degree}</span>
                      <span className="text-gray-500">
                        {" "}
                        - {edu.institution} ({edu.year})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Found this helpful? Share it with fellow PMs!
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=Just optimized my PM resume with ResumeForge AI! 🚀 Check it out:&url=${encodeURIComponent(window.location.origin)}`,
                  "_blank"
                );
              }}
            >
              Share on Twitter
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`,
                  "_blank"
                );
              }}
            >
              Share on LinkedIn
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
