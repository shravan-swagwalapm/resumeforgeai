"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { 
  CheckCircle, AlertTriangle, XCircle, Lightbulb, FileText, 
  ArrowLeft, Copy, Check, Sparkles, Download, Share2, Target,
  ArrowRight, RefreshCw
} from "lucide-react";

interface GapItem {
  requirement: string;
  match_level: "strong" | "partial" | "gap";
  current_evidence: string;
  suggestion: string;
}

interface LineChange {
  section: string;
  item: string;
  before: string;
  after: string;
  reason: string;
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
  line_by_line_changes: LineChange[];
  improvements: string[];
  optimized_resume: {
    header: { name: string; title: string; contact: string };
    summary: string;
    experience: ExperienceItem[];
    skills: string[];
    education: EducationItem[];
  };
}

export default function ResultsPage() {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"gaps" | "changes" | "resume">("gaps");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
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
      case "strong": return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "partial": return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "gap": return <XCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  const getMatchBadge = (level: string) => {
    switch (level) {
      case "strong": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "partial": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "gap": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "summary": return "📝";
      case "experience": return "💼";
      case "skills": return "🛠️";
      case "education": return "🎓";
      default: return "📄";
    }
  };

  const copyResumeToClipboard = () => {
    if (!results) return;
    const resume = results.optimized_resume;
    const text = `${resume.header.name}\n${resume.header.title}\n${resume.header.contact}\n\nSUMMARY\n${resume.summary}\n\nEXPERIENCE\n${resume.experience.map(exp => `\n${exp.role} | ${exp.company}\n${exp.duration}\n${exp.bullets.map(b => `• ${b}`).join('\n')}`).join('\n')}\n\nSKILLS\n${resume.skills.join(' • ')}\n\nEDUCATION\n${resume.education.map(edu => `${edu.degree} - ${edu.institution} (${edu.year})`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = async () => {
    if (!results) return;
    setIsGeneratingPDF(true);
    
    try {
      const { generatePDF } = await import("@/components/ResumePDF");
      const blob = await generatePDF(results.optimized_resume);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${results.optimized_resume.header.name.replace(/\s+/g, "_")}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try copying the text instead.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const strongMatches = results.gap_analysis.filter(g => g.match_level === "strong").length;
  const partialMatches = results.gap_analysis.filter(g => g.match_level === "partial").length;
  const gaps = results.gap_analysis.filter(g => g.match_level === "gap").length;
  const totalScore = Math.round((strongMatches * 100 + partialMatches * 50) / results.gap_analysis.length);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>New Analysis</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Analysis Complete — Here's Your Optimized Resume
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Resume Optimized for {results.jd_analysis.role}
            </h1>
            <p className="text-xl text-gray-400">
              {results.jd_analysis.company} • {results.jd_analysis.seniority} Level
            </p>
          </div>

          {/* Score Card */}
          <div className="bg-[#12121a] rounded-2xl border border-white/10 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {totalScore}%
                </div>
                <div className="text-gray-400">Match Score</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="text-4xl font-bold text-green-400">{strongMatches}</div>
                <div className="text-green-400/80 text-sm">Strong Matches</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <div className="text-4xl font-bold text-yellow-400">{partialMatches}</div>
                <div className="text-yellow-400/80 text-sm">Partial Matches</div>
              </div>
              <div className="text-center p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="text-4xl font-bold text-red-400">{gaps}</div>
                <div className="text-red-400/80 text-sm">Gaps to Address</div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab("gaps")}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                activeTab === "gaps"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Target className="w-4 h-4" />
              Gap Analysis
            </button>
            <button
              onClick={() => setActiveTab("changes")}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                activeTab === "changes"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Line-by-Line Changes
            </button>
            <button
              onClick={() => setActiveTab("resume")}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                activeTab === "resume"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
            >
              <FileText className="w-4 h-4" />
              Final Resume
            </button>
          </div>

          {/* Gap Analysis Tab */}
          {activeTab === "gaps" && (
            <div className="space-y-6">
              <div className="bg-[#12121a] rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Skills Gap Analysis
                  </h2>
                  <p className="text-gray-500 mt-1">See how your experience matches each job requirement</p>
                </div>
                <div className="p-6 space-y-4">
                  {results.gap_analysis.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                      {getMatchIcon(item.match_level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white">{item.requirement}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getMatchBadge(item.match_level)}`}>
                            {item.match_level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{item.current_evidence}</p>
                        {item.match_level !== "strong" && (
                          <p className="text-sm text-cyan-400 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {item.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvements */}
              <div className="bg-[#12121a] rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Key Improvements Made
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {results.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Line-by-Line Changes Tab */}
          {activeTab === "changes" && (
            <div className="bg-[#12121a] rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-cyan-400" />
                  Line-by-Line Changes
                </h2>
                <p className="text-gray-500 mt-1">Detailed before/after comparison with explanations</p>
              </div>
              <div className="p-6 space-y-6">
                {results.line_by_line_changes && results.line_by_line_changes.length > 0 ? (
                  results.line_by_line_changes.map((change, i) => (
                    <div key={i} className="bg-white/5 rounded-xl overflow-hidden">
                      {/* Section Header */}
                      <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                        <span className="text-lg">{getSectionIcon(change.section)}</span>
                        <span className="font-semibold text-white uppercase text-sm tracking-wider">{change.section}</span>
                        {change.item && (
                          <span className="text-gray-500 text-sm">— {change.item}</span>
                        )}
                      </div>
                      
                      <div className="p-4 space-y-4">
                        {/* Before */}
                        <div className="flex items-start gap-3">
                          <div className="w-20 flex-shrink-0">
                            <span className="text-xs font-semibold text-red-400 bg-red-500/20 px-2 py-1 rounded">BEFORE</span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed line-through decoration-red-500/50">{change.before}</p>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex items-center gap-3 pl-20">
                          <ArrowRight className="w-4 h-4 text-cyan-400" />
                        </div>
                        
                        {/* After */}
                        <div className="flex items-start gap-3">
                          <div className="w-20 flex-shrink-0">
                            <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded">AFTER</span>
                          </div>
                          <p className="text-white text-sm leading-relaxed">{change.after}</p>
                        </div>
                        
                        {/* Reason */}
                        <div className="flex items-start gap-3 mt-3 pt-3 border-t border-white/10">
                          <div className="w-20 flex-shrink-0">
                            <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 px-2 py-1 rounded">WHY</span>
                          </div>
                          <p className="text-purple-300 text-sm leading-relaxed">{change.reason}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No line-by-line changes available for this analysis.</p>
                    <p className="text-sm mt-2">Try running a new analysis for detailed changes.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Final Resume Tab */}
          {activeTab === "resume" && (
            <div className="bg-[#12121a] rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Your Optimized Resume
                  </h2>
                  <p className="text-gray-500 mt-1">Download as PDF or copy the text</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={copyResumeToClipboard}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Text"}
                  </button>
                  <button
                    onClick={downloadPDF}
                    disabled={isGeneratingPDF}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-5 py-2 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 text-gray-900 shadow-2xl">
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
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Summary</h3>
                    <p className="text-gray-700">{results.optimized_resume.summary}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Experience</h3>
                    <div className="space-y-5">
                      {results.optimized_resume.experience.map((exp, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <span className="font-semibold text-gray-900">{exp.role}</span>
                              <span className="text-gray-500"> | {exp.company}</span>
                            </div>
                            <span className="text-sm text-gray-500">{exp.duration}</span>
                          </div>
                          <ul className="space-y-1 mt-2">
                            {exp.bullets.map((bullet, j) => (
                              <li key={j} className="text-gray-700 text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
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
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {results.optimized_resume.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Education</h3>
                    {results.optimized_resume.education.map((edu, i) => (
                      <div key={i} className="text-gray-700">
                        <span className="font-medium">{edu.degree}</span>
                        <span className="text-gray-500"> — {edu.institution} ({edu.year})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Share CTA */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 mb-4">Found this helpful? Share it with fellow PMs!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=Just optimized my PM resume with ResumeForge AI! 🚀&url=${encodeURIComponent(window.location.origin)}`, "_blank")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share on Twitter
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, "_blank")}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share on LinkedIn
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
