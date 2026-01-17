import Link from "next/link";
import { FileText, Target, Sparkles, CheckCircle, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">ResumeForge</span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">AI</span>
            </div>
            <Link href="/login">
              <Button size="sm">
                Try Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Powered by Claude AI
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Turn Your PM Resume Into an{" "}
            <span className="gradient-text">Interview Magnet</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            AI-powered resume optimization designed specifically for Product Managers. 
            Match any job description in seconds, not hours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="pulse-cta text-lg px-8 py-6">
                <Sparkles className="w-5 h-5" />
                Try Now — It is Free
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Data not stored</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Results in 30 seconds</span>
            </div>
          </div>
        </div>

        {/* Visual Preview */}
        <div className="max-w-5xl mx-auto mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-3xl opacity-10"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div>
                <div className="text-sm font-medium text-gray-500 mb-3">YOUR RESUME</div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                  <div className="h-3 bg-red-100 rounded w-2/3 border border-red-200"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                </div>
              </div>
              {/* After */}
              <div>
                <div className="text-sm font-medium text-indigo-600 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  OPTIMIZED FOR JOB
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-indigo-500 rounded w-3/4"></div>
                  <div className="h-3 bg-indigo-100 rounded w-full"></div>
                  <div className="h-3 bg-indigo-100 rounded w-5/6"></div>
                  <div className="h-3 bg-green-100 rounded w-4/5 border border-green-300"></div>
                  <div className="h-3 bg-green-100 rounded w-2/3 border border-green-300"></div>
                  <div className="h-3 bg-indigo-100 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Three Steps to Your Perfect Resume
            </h2>
            <p className="text-lg text-gray-600">
              From upload to optimized resume in under 30 seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-indigo-50 to-white border border-indigo-100">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-bold text-indigo-600 mb-2">STEP 1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Resume</h3>
              <p className="text-gray-600">
                Paste your resume text or upload a PDF/DOCX file
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-bold text-purple-600 mb-2">STEP 2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paste Job Description</h3>
              <p className="text-gray-600">
                Add the job description you are targeting
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-pink-50 to-white border border-pink-100">
              <div className="w-16 h-16 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-bold text-pink-600 mb-2">STEP 3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Optimized Resume</h3>
              <p className="text-gray-600">
                Download your tailored, ATS-optimized resume
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Product Managers Love Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "PM-Specific",
                desc: "Understands product terminology and what hiring managers look for"
              },
              {
                icon: CheckCircle,
                title: "Gap Analysis",
                desc: "See exactly what skills are missing for each job"
              },
              {
                icon: Zap,
                title: "ATS-Ready",
                desc: "Keywords that pass applicant tracking systems"
              },
              {
                icon: Sparkles,
                title: "AI-Powered",
                desc: "Claude AI rewrites with hiring manager mindset"
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-xl bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all">
                <feature.icon className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Land More Interviews?
            </h2>
            <p className="text-lg text-indigo-100 mb-8">
              Join hundreds of PMs who have optimized their resumes with AI
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 text-lg px-8 py-6">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">ResumeForge AI</span>
          </div>
          <p className="text-gray-600 mb-4">
            Built with ❤️ by{" "}
            <a href="https://youtube.com/@TheSwagWalaPM" target="_blank" className="text-indigo-600 hover:underline">
              The Swag Wala PM
            </a>
            {" "}• Powered by Claude AI
          </p>
          <p className="text-sm text-gray-400">
            Your data is processed securely and not stored permanently.
          </p>
        </div>
      </footer>
    </div>
  );
}
