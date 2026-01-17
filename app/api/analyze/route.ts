import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

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
  try {
    const { resumeText, jobDescription } = await request.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 }
      );
    }

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

    let analysis;
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0]);
    } else {
      analysis = JSON.parse(content.text);
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
