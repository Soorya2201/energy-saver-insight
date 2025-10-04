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
