import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert PM Resume Optimizer with 15 years of hiring experience at Google, Meta, and top startups.

Analyze the resume against the job description and return ONLY valid JSON with this EXACT structure:

{
  "jd_analysis": {
    "company": "Company name",
    "role": "Role title",
    "seniority": "Junior/Mid/Senior/Lead",
    "key_requirements": [
      {"requirement": "Skill name", "category": "must_have", "keywords": ["keyword1", "keyword2"]}
    ]
  },
  "gap_analysis": [
    {
      "requirement": "Requirement name",
      "match_level": "strong|partial|gap",
      "current_evidence": "What exists in resume",
      "suggestion": "How to improve"
    }
  ],
  "line_by_line_changes": [
    {
      "section": "summary|experience|skills|education",
      "item": "Section name or bullet description",
      "before": "Original text from resume",
      "after": "Optimized text",
      "reason": "Why this change improves the resume (be specific about keywords, metrics, or PM best practices)"
    }
  ],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3", "Improvement 4", "Improvement 5"],
  "optimized_resume": {
    "header": {
      "name": "Full Name",
      "title": "Optimized job title matching JD",
      "contact": "email | phone | location | linkedin"
    },
    "summary": "2-3 sentence professional summary tailored to the JD with keywords",
    "experience": [
      {
        "company": "Company Name",
        "role": "Role Title",
        "duration": "Date Range",
        "bullets": [
          "Achievement bullet with metrics and PM power verbs",
          "Another achievement bullet",
          "Third achievement bullet"
        ]
      }
    ],
    "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"],
    "education": [
      {
        "institution": "University Name",
        "degree": "Degree and Major",
        "year": "Year"
      }
    ]
  }
}

IMPORTANT RULES:
1. Include 5-10 line_by_line_changes showing specific before/after improvements
2. Focus changes on: adding metrics, PM power verbs (Led, Drove, Launched, Increased), keywords from JD
3. Be specific in the "reason" field - mention exact keywords or techniques used
4. Return ONLY valid JSON, no markdown, no explanation text
5. Ensure all arrays have at least one item`;

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
      model: "claude-3-haiku-20240307",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `## RESUME TO OPTIMIZE:
${resumeText}

## TARGET JOB DESCRIPTION:
${jobDescription}

Analyze this resume against the job description. Provide detailed line-by-line changes showing exactly what to modify and why. Return ONLY valid JSON.`,
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

    // Ensure line_by_line_changes exists
    if (!analysis.line_by_line_changes) {
      analysis.line_by_line_changes = [];
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
