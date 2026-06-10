import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_PLANS } from "@/data/intelligence/membership";

export function MembershipTiers() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {MEMBERSHIP_PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`rounded-xl border p-6 flex flex-col ${
            plan.id === "professional" ? "border-accent/40 bg-accent/5 shadow-glow-sm" : "border-border bg-primary/30"
          }`}
        >
          <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
          <p className="text-2xl font-bold text-accent mt-2">{plan.price}</p>
          <p className="text-sm text-muted mt-2 mb-6">{plan.description}</p>
          <ul className="space-y-2 flex-1 mb-6">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant={plan.id === "professional" ? "default" : "outline"} className="w-full">
            <Link href={plan.id === "institutional" ? "/apply" : "/portal"}>
              {plan.id === "free" ? "Get Started" : plan.id === "institutional" ? "Contact Sales" : "Upgrade"}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
