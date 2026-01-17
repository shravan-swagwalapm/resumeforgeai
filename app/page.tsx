import Link from "next/link";
import { FileText, Target, Sparkles, Zap, CheckCircle, ArrowRight, Star, Shield, Clock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">ResumeForge</span>
              <span className="text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-2.5 py-1 rounded-full font-semibold">AI</span>
            </div>
            <Link href="/login">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
                Start Free <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 px-5 py-2.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Powered by Claude AI — No coding required
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Land Your Dream
            <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PM Job Faster
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop spending hours tailoring your resume. Our AI analyzes job descriptions 
            and <span className="text-white font-semibold">rewrites your resume to match</span> — in 30 seconds.
          </p>
          
          {/* CTA Button */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <Link href="/login">
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-xl px-10 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50">
                <Sparkles className="w-6 h-6" />
                Optimize My Resume — Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <p className="text-gray-500 text-sm">✨ No credit card required • Results in 30 seconds</p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-base text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Results in 30 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              <span>Built specifically for PMs</span>
            </div>
          </div>
        </div>

        {/* 3D Preview Card */}
        <div className="max-w-4xl mx-auto mt-20 perspective-1000">
          <div className="relative transform hover:rotate-y-2 transition-transform duration-500">
            {/* Glow effect behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-[#12121a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Window controls */}
              <div className="bg-[#1a1a24] px-5 py-4 border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-500 ml-2">ResumeForge AI — Live Analysis</span>
              </div>
              
              <div className="p-8 grid md:grid-cols-2 gap-10">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 bg-gray-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Your Resume</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-white/10 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-white/5 rounded w-full"></div>
                    <div className="h-4 bg-white/5 rounded w-5/6"></div>
                    <div className="h-4 bg-red-500/30 rounded w-2/3 border border-red-500/50 flex items-center px-2">
                      <span className="text-xs text-red-400">❌ Missing keywords</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  </div>
                </div>
                
                {/* After */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Optimized Version</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-cyan-500/20 rounded w-full"></div>
                    <div className="h-4 bg-cyan-500/20 rounded w-5/6"></div>
                    <div className="h-4 bg-green-500/30 rounded w-4/5 border border-green-500/50 flex items-center px-2">
                      <span className="text-xs text-green-400">✓ ATS optimized</span>
                    </div>
                    <div className="h-4 bg-green-500/30 rounded w-2/3 border border-green-500/50 flex items-center px-2">
                      <span className="text-xs text-green-400">✓ Keywords matched</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-500 mb-10 text-lg">Trusted by product managers at top companies</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "30s", label: "Average Time", icon: Clock, color: "cyan" },
              { number: "95%", label: "Match Rate", icon: Target, color: "purple" },
              { number: "500+", label: "PMs Helped", icon: TrendingUp, color: "pink" },
              { number: "Free", label: "To Start", icon: Sparkles, color: "green" },
            ].map((stat, i) => (
              <div key={i} className="group text-center bg-white/5 hover:bg-white/10 rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <stat.icon className={`w-8 h-8 mx-auto mb-4 text-${stat.color}-400 group-hover:scale-110 transition-transform`} />
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">{stat.number}</div>
                <div className="text-gray-400 text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-semibold mb-4 text-lg">HOW IT WORKS</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Three Steps to Your <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Perfect Resume</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              No complicated setup. Just paste, click, and get your optimized resume.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: FileText,
                title: "Paste Your Resume",
                desc: "Copy-paste your current resume text. Don't worry about formatting — we'll handle that.",
                tip: "💡 Tip: Include all your experience, even if it seems unrelated"
              },
              {
                step: "02", 
                icon: Target,
                title: "Add Job Description",
                desc: "Paste the job posting you want. Our AI will analyze every requirement and keyword.",
                tip: "💡 Tip: Include the full job description for best results"
              },
              {
                step: "03",
                icon: Sparkles,
                title: "Get Optimized Resume",
                desc: "Receive a tailored resume with gap analysis, smart suggestions, and ATS-friendly format.",
                tip: "💡 Tip: Review the gap analysis to prepare for interviews"
              }
            ].map((item, i) => (
              <div key={i} className="group relative">
                {/* Connector line */}
                {i < 2 && <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0"></div>}
                
                <div className="relative bg-[#12121a] hover:bg-[#1a1a24] rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    {item.step}
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-lg mb-4 leading-relaxed">{item.desc}</p>
                  <p className="text-sm text-cyan-400/80 bg-cyan-500/10 px-4 py-2 rounded-lg">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 font-semibold mb-4 text-lg">WHY RESUMEFORGE</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Built by PMs, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">for PMs</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We understand what hiring managers look for because we've been there.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "PM-Specific AI", desc: "Trained on thousands of PM job descriptions and successful resumes" },
              { icon: CheckCircle, title: "Gap Analysis", desc: "See exactly which skills match and what's missing from your resume" },
              { icon: Zap, title: "ATS-Optimized", desc: "Keywords and formatting that pass applicant tracking systems" },
              { icon: Shield, title: "Privacy First", desc: "Your data is never stored. We process and forget immediately." }
            ].map((feature, i) => (
              <div key={i} className="group bg-[#12121a] hover:bg-[#1a1a24] rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-[#12121a] rounded-3xl p-12 sm:p-16 text-center border border-white/10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Land More Interviews?
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Join 500+ product managers who've already optimized their resumes and landed their dream jobs.
              </p>
              <Link href="/login">
                <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-xl px-12 py-5 rounded-2xl font-bold inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-2xl shadow-purple-500/30">
                  Get Started — It's Free 
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <p className="text-gray-500 mt-6">No credit card required • Takes 30 seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">ResumeForge AI</span>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            Built with ❤️ by{" "}
            <a href="https://youtube.com/@TheSwagWalaPM" target="_blank" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Swag Wala PM
            </a>
            {" "}• Powered by Claude AI
          </p>
          <p className="text-gray-600">
            Your data is processed securely and never stored permanently.
          </p>
        </div>
      </footer>
    </div>
  );
}
