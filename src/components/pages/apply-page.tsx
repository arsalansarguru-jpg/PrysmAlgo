"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import type { ApplicationFormData } from "@/types";
import { trackEvent } from "@/lib/analytics/events";

const steps = ["Personal Info", "Investment Details", "Profile & Goals", "Declarations", "Review"];

const initialForm: ApplicationFormData = {
  name: "",
  email: "",
  phone: "",
  country: "",
  investmentAmount: "",
  experience: "",
  riskTolerance: "",
  goals: "",
  message: "",
  signatureName: "",
  declarationsAccepted: false,
  riskDisclosureAccepted: false,
  consentMarketing: true,
};

export function ApplyPage() {
  useEffect(() => {
    trackEvent("application_start", { event_category: "conversion" });
  }, []);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof ApplicationFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email is required";
      if (!form.phone.trim()) newErrors.phone = "Phone is required";
      if (!form.country) newErrors.country = "Country is required";
    }
    if (step === 1) {
      if (!form.investmentAmount) newErrors.investmentAmount = "Investment amount is required";
      if (!form.experience) newErrors.experience = "Experience level is required";
    }
    if (step === 2) {
      if (!form.riskTolerance) newErrors.riskTolerance = "Risk tolerance is required";
      if (!form.goals.trim()) newErrors.goals = "Investment goals are required";
    }
    if (step === 3) {
      if (!form.signatureName.trim()) newErrors.signatureName = "Electronic signature (full legal name) is required";
      if (!form.declarationsAccepted) newErrors.declarationsAccepted = "You must accept the declarations";
      if (!form.riskDisclosureAccepted) newErrors.riskDisclosureAccepted = "You must accept the risk disclosure";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
          capital_range: form.investmentAmount,
          experience_level: form.experience,
          risk_profile: form.riskTolerance,
          goals: form.goals,
          message: form.message,
          signature_name: form.signatureName,
          declarations_accepted: form.declarationsAccepted,
          risk_disclosure_accepted: form.riskDisclosureAccepted,
          consent_marketing: form.consentMarketing,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      trackEvent("investor_application", {
        event_category: "conversion",
        event_label: form.investmentAmount,
      });
      setSubmitted(true);
    } catch {
      setErrors({ signatureName: "Submission failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-24">
        <div className="mx-auto max-w-lg px-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-6">
              <Check className="h-10 w-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted</h2>
            <p className="text-muted leading-relaxed">
              Thank you for your interest in PrysmAlgo. Our investor relations team will review
              your application and contact you within 2-3 business days.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Apply"
          title="Investor Application"
          description="Complete the application below to begin the onboarding process. Minimum investment: $250,000."
        />

        <div className="flex items-center justify-between mb-8">
          {steps.map((label, index) => (
            <div key={label} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  index <= step
                    ? "bg-accent text-white"
                    : "bg-secondary text-muted"
                }`}
              >
                {index < step ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className={`ml-2 text-xs hidden sm:inline ${index <= step ? "text-foreground" : "text-muted"}`}>
                {label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-px mx-2 ${index < step ? "bg-accent" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Smith" />
                      {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="john@company.com" />
                      {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone number with country code" />
                      {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select value={form.country} onValueChange={(v) => update("country", v)}>
                        <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                        <SelectContent>
                          {["India", "UAE", "United Kingdom", "Singapore", "Canada", "Australia", "United States", "Germany", "Switzerland", "Other"].map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && <p className="text-xs text-red-400">{errors.country}</p>}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label>Investment Amount (USD)</Label>
                      <Select value={form.investmentAmount} onValueChange={(v) => update("investmentAmount", v)}>
                        <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                        <SelectContent>
                          {["$250,000 - $500,000", "$500,000 - $1,000,000", "$1,000,000 - $5,000,000", "$5,000,000+"].map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.investmentAmount && <p className="text-xs text-red-400">{errors.investmentAmount}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label>Investment Experience</Label>
                      <Select value={form.experience} onValueChange={(v) => update("experience", v)}>
                        <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                        <SelectContent>
                          {["Institutional (10+ years)", "Professional (5-10 years)", "Experienced (3-5 years)", "Intermediate (1-3 years)"].map((e) => (
                            <SelectItem key={e} value={e}>{e}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.experience && <p className="text-xs text-red-400">{errors.experience}</p>}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label>Risk Tolerance</Label>
                      <Select value={form.riskTolerance} onValueChange={(v) => update("riskTolerance", v)}>
                        <SelectTrigger><SelectValue placeholder="Select risk tolerance" /></SelectTrigger>
                        <SelectContent>
                          {["Conservative", "Moderate", "Growth", "Aggressive"].map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.riskTolerance && <p className="text-xs text-red-400">{errors.riskTolerance}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">Investment Goals</Label>
                      <Textarea id="goals" value={form.goals} onChange={(e) => update("goals", e.target.value)} placeholder="Describe your investment objectives..." />
                      {errors.goals && <p className="text-xs text-red-400">{errors.goals}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Any additional information..." />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-semibold text-foreground">Declarations & Signature</h3>
                    <div className="rounded-lg border border-border bg-primary/20 p-4 text-xs text-muted leading-relaxed space-y-2">
                      <p><strong className="text-foreground">Risk Disclosure:</strong> Trading involves substantial risk of loss. Past performance is not indicative of future results. PrysmAlgo is a technology provider, not a registered investment advisor.</p>
                      <p><strong className="text-foreground">Qualified Investor:</strong> I confirm I am a qualified or accredited investor with sufficient capital and risk tolerance for systematic trading strategies.</p>
                    </div>
                    <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
                      <input type="checkbox" checked={form.riskDisclosureAccepted} onChange={(e) => update("riskDisclosureAccepted", e.target.checked)} className="mt-1" />
                      <span>I have read and accept the risk disclosure statement.</span>
                    </label>
                    {errors.riskDisclosureAccepted && <p className="text-xs text-red-400">{errors.riskDisclosureAccepted}</p>}
                    <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
                      <input type="checkbox" checked={form.declarationsAccepted} onChange={(e) => update("declarationsAccepted", e.target.checked)} className="mt-1" />
                      <span>I confirm all information provided is accurate and I agree to the terms of service and privacy policy.</span>
                    </label>
                    {errors.declarationsAccepted && <p className="text-xs text-red-400">{errors.declarationsAccepted}</p>}
                    <div className="space-y-2">
                      <Label htmlFor="signature">Electronic Signature (Full Legal Name)</Label>
                      <Input id="signature" value={form.signatureName} onChange={(e) => update("signatureName", e.target.value)} placeholder="Type your full legal name" />
                      {errors.signatureName && <p className="text-xs text-red-400">{errors.signatureName}</p>}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Review Your Application</h3>
                    {Object.entries(form).filter(([k]) => !["declarationsAccepted", "riskDisclosureAccepted", "consentMarketing"].includes(k)).map(([key, value]) => (
                      value && typeof value === "string" && (
                        <div key={key} className="flex justify-between py-2 border-b border-border/50">
                          <span className="text-sm text-muted capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-sm text-foreground font-medium">{value}</span>
                        </div>
                      )
                    ))}
                    <p className="text-xs text-muted/60 mt-4">
                      Signed electronically by <strong className="text-foreground">{form.signatureName}</strong> on {new Date().toLocaleDateString()}.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 0 ? (
                <Button variant="ghost" onClick={prev}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              ) : (
                <div />
              )}
              {step < steps.length - 1 ? (
                <Button onClick={next}>
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
