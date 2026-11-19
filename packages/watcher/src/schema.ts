import { z } from "zod";

export const PricingEntrySchema = z.object({
  provider: z.string().min(1),
  tier: z.string().min(1),
  base_monthly_usd: z.number().nonnegative(),
  included_quota: z.string().min(1),
  overage_rate: z.string().min(1),
});

export const PricingDatasetSchema = z.array(PricingEntrySchema).min(1);
export type PricingEntry = z.infer<typeof PricingEntrySchema>;
