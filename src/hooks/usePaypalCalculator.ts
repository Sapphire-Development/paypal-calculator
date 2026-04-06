import { useState, useEffect } from "react";
import { calculatePaypalFees, PAYPAL_CURRENCIES } from "@/lib/paypal";

export function usePaypalCalculator() {
  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const currencyObj = PAYPAL_CURRENCIES.find(c => c.code === currencyCode) ?? PAYPAL_CURRENCIES[0];

  const [amount, setAmount] = useState<string>("100");
  const [percentage, setPercentage] = useState<string>("5.4");
  const [fixedFee, setFixedFee] = useState<string>(currencyObj.fixedFee.toString());
  const [mode, setMode] = useState<"receive" | "send">("receive");

  useEffect(() => {
    const cur = PAYPAL_CURRENCIES.find(c => c.code === currencyCode);
    if (cur) {
      setFixedFee(cur.fixedFee.toString());
    }
  }, [currencyCode]);

  const numAmount = parseFloat(amount) || 0;
  const numPercentage = parseFloat(percentage) || 0;
  const numFixedFee = parseFloat(fixedFee) || 0;

  const { computedMain, computedCommission } = calculatePaypalFees(
    mode,
    numAmount,
    numPercentage,
    numFixedFee
  );

  return {
    amount,
    setAmount,
    percentage,
    setPercentage,
    fixedFee,
    setFixedFee,
    mode,
    setMode,
    currencyCode,
    setCurrencyCode,
    currencySymbol: currencyObj.symbol,
    numAmount,
    computedMain,
    computedCommission
  };
}
