export interface TierEstimateInput {
  baseMonthlyUsd: number;
  estimatedOverageUsd: number;
}

export function estimateMonthlyCost(input: TierEstimateInput): number {
  return Math.max(0, input.baseMonthlyUsd + input.estimatedOverageUsd);
}
