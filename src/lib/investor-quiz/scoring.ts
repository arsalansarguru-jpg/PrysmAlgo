import { calculateLeadScore, classifyLeadTier, getTierLabel, getTierRecommendation } from "@/lib/crm/lead-scoring";

export interface QuizAnswers {
  name: string;
  email: string;
  phone: string;
  country: string;
  capital: string;
  experience: string;
  riskTolerance: string;
  goal: string;
}

export interface QuizResult {
  score: number;
  tier: "Hot Lead" | "Warm Lead" | "Cold Lead";
  tierId: "hot" | "warm" | "cold";
  recommendation: string;
  qualified: boolean;
}

export function calculateQuizScore(answers: QuizAnswers): QuizResult {
  const score = calculateLeadScore({
    capital_range: answers.capital,
    experience_level: answers.experience,
    risk_profile: answers.riskTolerance,
  });
  const tierId = classifyLeadTier(score);
  const tier = getTierLabel(tierId) as QuizResult["tier"];

  return {
    score,
    tier,
    tierId,
    recommendation: getTierRecommendation(tierId),
    qualified: tierId !== "cold",
  };
}
