# Energy Saver Insight (TIS PURE)

**A rooftop-solar lead-generation app for Tamil Nadu households. Enter your bi-monthly electricity usage to see your TNEB bill, your CO₂ footprint, and a right-sized solar proposal.**

## What it calculates (`src/lib/electricityCalculations.ts`)

- **TNEB bill.** Tamil Nadu's tiered domestic tariff: the first 100 units are free, there are separate slab structures above and below 500 units, and rates run from ₹2.35 to ₹11.55 per unit.
- **CO₂ emissions.** kWh × the Tamil Nadu grid emission factor (default 0.75 kg CO₂/kWh, 2023–24).
- **Solar capacity.** Daily load ÷ peak sun hours (5 h default for TN), corrected for system efficiency (0.85) plus a 25% safety margin, converted to kVA.

## Flow

`Onboarding` (consumption input) → `Dashboard` (bill, emissions, savings) → `Plans` (dynamic solar proposal sized to the user) → `Thank you`

## Stack

React · TypeScript · Vite · Tailwind / shadcn-ui. Scaffolded with [Lovable](https://lovable.dev).

## Run locally

```bash
npm install
npm run dev
```
