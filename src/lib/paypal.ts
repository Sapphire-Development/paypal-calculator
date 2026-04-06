export const PAYPAL_CURRENCIES = [
  { code: "USD", name: "Dólar (USD)", symbol: "$", fixedFee: 0.30 },
  { code: "EUR", name: "Euro (EUR)", symbol: "€", fixedFee: 0.35 },
  { code: "GBP", name: "Libra (GBP)", symbol: "£", fixedFee: 0.30 },
  { code: "MXN", name: "Peso Mex (MXN)", symbol: "$", fixedFee: 4.00 },
  { code: "CAD", name: "Dólar Can (CAD)", symbol: "$", fixedFee: 0.30 },
  { code: "AUD", name: "Dólar Aus (AUD)", symbol: "$", fixedFee: 0.30 },
];

export function calculateReceiveMode(amount: number, percentage: number, fixedFee: number) {
  const divisor = 1 - percentage / 100;
  if (divisor <= 0) {
    return { computedMain: 0, computedCommission: 0 };
  }
  const computedMain = (amount + fixedFee) / divisor;
  const computedCommission = computedMain - amount;
  return { computedMain, computedCommission };
}

export function calculateSendMode(amount: number, percentage: number, fixedFee: number) {
  let computedCommission = (amount * percentage) / 100 + fixedFee;
  let computedMain = amount - computedCommission;
  if (computedMain < 0) {
    computedMain = 0;
    computedCommission = amount;
  }
  return { computedMain, computedCommission };
}

export function calculatePaypalFees(
  mode: "receive" | "send",
  amount: number,
  percentage: number,
  fixedFee: number
) {
  if (mode === "receive") {
    return calculateReceiveMode(amount, percentage, fixedFee);
  } else {
    return calculateSendMode(amount, percentage, fixedFee);
  }
}
