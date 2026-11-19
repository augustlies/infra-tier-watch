import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PricingDatasetSchema } from "./schema.ts";

const raw = JSON.parse(
  readFileSync(resolve(import.meta.dirname, "../../../data/pricing.json"), "utf-8")
);

PricingDatasetSchema.parse(raw);
console.log("pricing.json passed Zod validation.");
