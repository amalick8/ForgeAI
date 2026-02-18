
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'FREE' | 'STUDENT' | 'PRO';
}

export interface ResumeAnalysis {
  atsScore: number;
  impactScore: number;
  keywordMatch: string[];
  bulletRewrites: { original: string; improved: string; impact: string }[];
  summary: string;
}

export interface GitHubAnalysis {
  qualityScore: number;
  consistencyScore: number;
  topRepoComplexity: string;
  readmeRating: number;
  strengths: string[];
}

export interface LeetCodeAnalysis {
  masteryScore: number;
  problemsSolved: number;
  difficultyDistribution: { easy: number; medium: number; hard: number };
  readinessPercentage: number;
}

export interface DashboardStats {
  overallScore: number;
  resumeScore: number;
  githubScore: number;
  leetcodeScore: number;
}
