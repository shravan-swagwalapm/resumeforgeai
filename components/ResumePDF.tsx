"use client";

import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1f2937",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#6366f1",
    marginBottom: 6,
  },
  contact: {
    fontSize: 10,
    color: "#6b7280",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    color: "#374151",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  companyRole: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },
  duration: {
    fontSize: 10,
    color: "#6b7280",
  },
  bullet: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
    marginLeft: 10,
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    padding: "4 8",
    borderRadius: 4,
  },
  educationItem: {
    marginBottom: 6,
  },
  educationText: {
    fontSize: 11,
    color: "#374151",
  },
  educationDegree: {
    fontFamily: "Helvetica-Bold",
  },
});

interface ResumeData {
  header: {
    name: string;
    title: string;
    contact: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    bullets: string[];
  }>;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
}

const ResumeDocument = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{data.header.name}</Text>
        <Text style={styles.title}>{data.header.title}</Text>
        <Text style={styles.contact}>{data.header.contact}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <Text style={styles.companyRole}>
                {exp.role} | {exp.company}
              </Text>
              <Text style={styles.duration}>{exp.duration}</Text>
            </View>
            {exp.bullets.map((bullet, j) => (
              <Text key={j} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skill, i) => (
            <Text key={i} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.educationItem}>
            <Text style={styles.educationText}>
              <Text style={styles.educationDegree}>{edu.degree}</Text>
              {" — "}{edu.institution} ({edu.year})
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export async function generatePDF(data: ResumeData): Promise<Blob> {
  const blob = await pdf(<ResumeDocument data={data} />).toBlob();
  return blob;
}
