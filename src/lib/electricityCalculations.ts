export function calculateTNEBBill(units: number): number {
  let bill = 0;

  if (units <= 100) {
    return 0; // Free up to 100 units
  }

  if (units <= 500) {
    bill += Math.max(0, Math.min(units, 200) - 100) * 2.35;
    bill += Math.max(0, Math.min(units, 400) - 200) * 4.70;
    bill += Math.max(0, Math.min(units, 500) - 400) * 6.30;
  } else {
    bill += Math.max(0, 400 - 100) * 4.70; // 101–400
    bill += Math.max(0, 500 - 400) * 6.30; // 401–500
    bill += Math.max(0, Math.min(units, 600) - 500) * 8.40; // 501–600
    bill += Math.max(0, Math.min(units, 800) - 600) * 9.45; // 601–800
    bill += Math.max(0, Math.min(units, 1000) - 800) * 10.50; // 801–1000
    bill += Math.max(0, units - 1000) * 11.55; // Above 1000
  }

  return parseFloat(bill.toFixed(2));
}

/**
 * Estimate CO2 emissions for Tamil Nadu electricity use.
 * @param unitsKWh Bi-monthly consumption in kWh
 * @param efKgPerKWh (optional) emission factor; default 0.75 kg/kWh (Tamil Nadu 2023–24)
 */
export function tnElectricityCO2(unitsKWh: number, efKgPerKWh = 0.75) {
  const kg = unitsKWh * efKgPerKWh;
  return { kgCO2: +kg.toFixed(2), tCO2: +(kg / 1000).toFixed(3) };
}

/**
 * Calculate required solar capacity based on power consumption
 * @param powerConsumptionKWh Bi-monthly consumption in kWh
 * @param solarHoursPerDay Average solar hours per day (default: 5 for Tamil Nadu)
 * @param efficiency System efficiency (default: 0.85)
 * @param safetyMargin Safety margin factor (default: 0.25)
 * @param powerFactor Power factor (default: 1)
 */
export function calculateSolarCapacity(
  powerConsumptionKWh: number,
  solarHoursPerDay: number = 5,
  efficiency: number = 0.85,
  safetyMargin: number = 0.25,
  powerFactor: number = 1
): number {
  // 1. Calculate the total daily energy consumption (kWh/day)
  const dailyPowerConsumption = powerConsumptionKWh / 60; // 60 days in 2 months (bi-monthly)

  // 2. Calculate the required solar capacity (in kW) to meet the energy demand
  let requiredSolarPower = dailyPowerConsumption / solarHoursPerDay;

  // 3. Account for inefficiency and safety margin
  requiredSolarPower = (requiredSolarPower / efficiency) * (1 + safetyMargin);

  // 4. Convert to KVA (assuming power factor of 1)
  const requiredSolarKVA = requiredSolarPower / powerFactor;

  return requiredSolarKVA;
}
