import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert PM Resume Optimizer. Analyze the resume against the job description and return ONLY valid JSON with this structure:

{
  "jd_analysis": {
    "company": "Company name",
    "role": "Role title",
    "seniority": "Senior",
    "key_requirements": [
      {"requirement": "Skill name", "category": "must_have", "keywords": ["keyword1"]}
    ]
  },
  "gap_analysis": [
    {"requirement": "Skill", "match_level": "strong", "current_evidence": "Evidence", "suggestion": "Suggestion"}
  ],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"],
  "optimized_resume": {
    "header": {"name": "Name", "title": "Title", "contact": "email | location"},
    "summary": "Professional summary",
    "experience": [
      {"company": "Company", "role": "Role", "duration": "Date", "bullets": ["Bullet 1", "Bullet 2"]}
    ],
    "skills": ["Skill 1", "Skill 2"],
    "education": [{"institution": "University", "degree": "Degree", "year": "Year"}]
  }
}

Return ONLY the JSON object. No markdown, no explanation.`;

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 }
      );
    }

    // Get user session
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Call Claude API
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nAnalyze and optimize. Return ONLY JSON.`,
        },
      ],
      system: SYSTEM_PROMPT,
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response format");
    }

    // Parse JSON response
    let analysis;
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0]);
    } else {
      analysis = JSON.parse(content.text);
    }

    const processingTime = Date.now() - startTime;

    // Save to Supabase
    const { data: savedAnalysis, error: saveError } = await supabase
      .from("analyses")
      .insert({
        user_id: user.id,
        original_resume_text: resumeText,
        job_description: jobDescription,
        target_company: analysis.jd_analysis?.company || null,
        target_role: analysis.jd_analysis?.role || null,
        jd_analysis: analysis.jd_analysis,
        gap_analysis: analysis.gap_analysis,
        improvements: analysis.improvements,
        optimized_resume: analysis.optimized_resume,
        status: "completed",
        processing_time_ms: processingTime,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Supabase save error:", saveError);
      // Still return analysis even if save fails
    }

    return NextResponse.json({
      ...analysis,
      id: savedAnalysis?.id,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
