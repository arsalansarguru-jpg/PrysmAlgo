"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { calculateQuizScore, type QuizAnswers } from "@/lib/investor-quiz/scoring";
import { submitLead } from "@/lib/webhooks/submit-lead";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STEPS = ["Contact", "Capital", "Experience", "Risk", "Goals", "Results"];

const initial: QuizAnswers = {
  name: "", email: "", phone: "", country: "",
  capital: "", experience: "", riskTolerance: "", goal: "",
};

export function InvestorQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(initial);
  const [result, setResult] = useState<ReturnType<typeof calculateQuizScore> | null>(null);

  const update = (field: keyof QuizAnswers, value: string) =>
    setAnswers((a) => ({ ...a, [field]: value }));

  const next = async () => {
    if (step === 4) {
      const r = calculateQuizScore(answers);
      setResult(r);
      await submitLead({
        source: "investor-assessment",
        email: answers.email,
        name: answers.name,
        phone: answers.phone,
        country: answers.country,
        capital_range: answers.capital,
        experience_level: answers.experience,
        risk_profile: answers.riskTolerance,
        goals: answers.goal,
        consent_marketing: true,
        metadata: { score: r.score, tier: r.tierId, goal: answers.goal },
      });
    }
    setStep((s) => Math.min(s + 1, 5));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const canNext = () => {
    if (step === 0) return answers.name && answers.email && answers.phone && answers.country;
    if (step === 1) return answers.capital;
    if (step === 2) return answers.experience;
    if (step === 3) return answers.riskTolerance;
    if (step === 4) return answers.goal;
    return true;
  };

  const OptionGrid = ({ field, options }: { field: keyof QuizAnswers; options: string[] }) => (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => update(field, opt)}
          className={cn(
            "rounded-xl border p-4 text-left text-sm transition-colors",
            answers[field] === opt
              ? "border-accent bg-accent/10 text-foreground"
              : "border-border bg-primary/30 text-muted hover:border-accent/30"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <SectionHeader
          label="Investor Assessment"
          title="Are You a Qualified Investor?"
          description="Complete this 2-minute assessment to receive a personalized recommendation."
          align="left"
        />

        <div className="flex gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={cn("h-1 flex-1 rounded-full transition-colors", i <= step ? "bg-accent" : "bg-border")}
            />
          ))}
        </div>

        <Card>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {step === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                    <div><Label>Name</Label><Input value={answers.name} onChange={(e) => update("name", e.target.value)} className="mt-1" /></div>
                    <div><Label>Email</Label><Input type="email" value={answers.email} onChange={(e) => update("email", e.target.value)} className="mt-1" /></div>
                    <div><Label>Phone</Label><Input value={answers.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1" /></div>
                    <div><Label>Country</Label><Input value={answers.country} onChange={(e) => update("country", e.target.value)} className="mt-1" /></div>
                  </div>
                )}
                {step === 1 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Investment Capital</h3>
                    <OptionGrid field="capital" options={["<$5k", "$5k–$10k", "$10k–$25k", "$25k–$50k", "$50k–$100k", "$100k+"]} />
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Investment Experience</h3>
                    <OptionGrid field="experience" options={["Beginner", "Intermediate", "Advanced", "Professional"]} />
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Risk Tolerance</h3>
                    <OptionGrid field="riskTolerance" options={["Low", "Moderate", "High"]} />
                  </div>
                )}
                {step === 4 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Investment Goal</h3>
                    <OptionGrid field="goal" options={["Capital Preservation", "Income", "Growth", "Aggressive Growth"]} />
                  </div>
                )}
                {step === 5 && result && (
                  <div className="text-center">
                    <Check className="h-12 w-12 text-accent mx-auto mb-4" />
                    <p className="text-sm text-accent uppercase tracking-brand mb-2">{result.tier} Investor</p>
                    <p className="text-4xl font-bold text-foreground mb-2">Score: {result.score}</p>
                    <p className="text-muted leading-relaxed mb-8">{result.recommendation}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild size="lg">
                        <Link href="/book-call"><Calendar className="h-4 w-4" /> Book Investor Call</Link>
                      </Button>
                      <Button asChild variant="outline"><Link href="/apply">Apply Now</Link></Button>
                      <Button asChild variant="outline">
                        <a href={SITE_CONFIG.whatsapp} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4" /> WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {step < 5 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button variant="ghost" onClick={prev} disabled={step === 0}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={next} disabled={!canNext()}>
                  {step === 4 ? "See Results" : "Continue"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
