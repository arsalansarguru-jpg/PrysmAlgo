import type { PipelineDeal } from "@/types/capital-v7";

export const PIPELINE_DEALS: PipelineDeal[] = [
  { id: "1", investorName: "Mumbai Family Office", email: "fo@mumbai.example", country: "India", stage: "due_diligence", capitalCommitted: 500000, capitalFunded: 0, expectedClose: "2026-05-15" },
  { id: "2", investorName: "Dubai HNWI", email: "investor@dubai.example", country: "UAE", stage: "active_discussion", capitalCommitted: 250000, capitalFunded: 0, expectedClose: "2026-06-01" },
  { id: "3", investorName: "Singapore Allocator", email: "alloc@sg.example", country: "Singapore", stage: "pending_funding", capitalCommitted: 1000000, capitalFunded: 0, expectedClose: "2026-04-30" },
  { id: "4", investorName: "London Tech Executive", email: "exec@london.example", country: "UK", stage: "qualified", capitalCommitted: 150000, capitalFunded: 0 },
  { id: "5", investorName: "Bangalore Founder", email: "founder@blr.example", country: "India", stage: "funded", capitalCommitted: 300000, capitalFunded: 300000 },
  { id: "6", investorName: "NY Family Trust", email: "trust@ny.example", country: "USA", stage: "prospect", capitalCommitted: 0, capitalFunded: 0 },
];

export function getPipelineSummary() {
  const committed = PIPELINE_DEALS.reduce((s, d) => s + d.capitalCommitted, 0);
  const funded = PIPELINE_DEALS.reduce((s, d) => s + d.capitalFunded, 0);
  const expectedAum = committed;
  return { committed, funded, expectedAum, deals: PIPELINE_DEALS.length };
}
