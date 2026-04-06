import React, { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'es' | 'en';

export const translations = {
  es: {
    calculatorTitle: "PayPal Fee",
    calculatorDesc: "Calcula fácilmente las comisiones para enviar o recibir dinero.",
    toReceive: "Para Recibir",
    toSend: "Para Enviar",
    amount: "Monto",
    currency: "Divisa",
    feePercentage: "Comisión (%)",
    fixedFee: "Tarifa fija",
    receiveExactly: "Si quieres recibir libres:",
    theyMustSend: "Te deben enviar:",
    sendAmount: "Si envías el monto de:",
    recipientGets: "El destinatario recibe:",
    totalFee: "Comisión total",
    feesBtn: "Tarifas",
    guideTitle: "Guía de Comisiones de PayPal",
    guideDesc: "Toda la información al detalle sobre tarifas, pagos y protección.",
    howToUse: "¿Cómo usar la calculadora?",
    howToReceiveDesc: "Si deseas que llegue una cantidad exacta, el remitente debe enviar un monto ligeramente mayor para cubrir las comisiones. Calculamos el monto bruto requerido.",
    howToSendDesc: "Si envías una cantidad fija (ej. 100 USD), PayPal descontará su tarifa de esa cifra, de manera que al destinatario final le llegará un monto neto menor.",
    feeStructure: "Estructura de Tarifas",
    feeStructureDesc: "Las comisiones comerciales estándar de PayPal se componen por regla general de dos partes. En nuestra calculadora usamos un 5.4% por defecto y 0.30 USD (tarifas comunes en comercios), pero esto varía dependiendo del tipo de cuenta y país.",
    variableFee: "Comisión Variable (%):",
    variableFeeDesc: "Es un porcentaje del total depositado. Depende estrictamente del país de origen y destino de los fondos.",
    fixedFeeTitle: "Tarifa Fija:",
    fixedFeeDesc: "Se suma además un importe fijo que depende explícitamente de la divisa (p. ej. 0.30 USD dólares, 0.35 EUR euros, 0.30 GBP libras).",
    commercialVsPersonal: "Pagos Comerciales vs Personales",
    friendsFamily: "Amigos y Familiares:",
    friendsFamilyDesc: "Suele ser gratuito si empleas saldo de PayPal o tu cuenta bancaria. Atención: Esta opción no conlleva protección al comprador si te estafan.",
    goodsServices: "Bienes y Servicios:",
    goodsServicesDesc: "Aquí es obligatoria la comisión calculada. Sin embargo, beneficia de la protección al comprador por 180 días si algo saliera mal con un producto.",
    international: "Pagos Internacionales (Cross-Border)",
    internationalDesc1: "Si recibes dinero desde un país extranjero, PayPal te imputará además una tarifa adicional de pago comercial internacional (por ejemplo un +1.5% añadido sobre el porcentaje variable).",
    internationalDesc2: "Para conversiones automáticas de moneda (si te depositan en EUR y tienes cuenta USD), ten en cuenta que PayPal asignará un tipo de conversión de su propia divisa interno, el cual será un margen de alrededor del 3% u 4% menos beneficioso versus el marco global habitual."
  },
  en: {
    calculatorTitle: "PayPal Fee",
    calculatorDesc: "Easily calculate fees for sending or receiving money.",
    toReceive: "To Receive",
    toSend: "To Send",
    amount: "Amount",
    currency: "Currency",
    feePercentage: "Fee (%)",
    fixedFee: "Fixed fee",
    receiveExactly: "If you want to receive exactly:",
    theyMustSend: "They need to send you:",
    sendAmount: "If you send the amount of:",
    recipientGets: "The recipient gets:",
    totalFee: "Total fee",
    feesBtn: "Fees",
    guideTitle: "PayPal Fee Guide",
    guideDesc: "Detailed information about fees, payments, and protection.",
    howToUse: "How to use the calculator?",
    howToReceiveDesc: "If you want an exact amount to arrive, the sender must send a slightly larger amount to cover the fees. We calculate the required gross amount.",
    howToSendDesc: "If you send a fixed amount (e.g. 100 USD), PayPal will deduct its fee from that figure, so the final recipient will get a smaller net amount.",
    feeStructure: "Fee Structure",
    feeStructureDesc: "Standard PayPal commercial fees are generally composed of two parts. In our calculator we use 5.4% by default and 0.30 USD (common commercial fees), but this varies depending on the account type and country.",
    variableFee: "Variable Fee (%):",
    variableFeeDesc: "It is a percentage of the total deposited. It strictly depends on the origin and destination country of the funds.",
    fixedFeeTitle: "Fixed Fee:",
    fixedFeeDesc: "A fixed amount is also added which explicitly depends on the currency (e.g. 0.30 USD dollars, 0.35 EUR euros, 0.30 GBP pounds).",
    commercialVsPersonal: "Commercial vs Personal Payments",
    friendsFamily: "Friends and Family:",
    friendsFamilyDesc: "Usually free if you use PayPal balance or your bank account. Warning: This option does not carry buyer protection if you get scammed.",
    goodsServices: "Goods and Services:",
    goodsServicesDesc: "Calculated fees are mandatory here. However, it benefits from 180-day buyer protection if something goes wrong with a product.",
    international: "International Payments (Cross-Border)",
    internationalDesc1: "If you receive money from a foreign country, PayPal will also charge you an additional international commercial payment fee (for example, +1.5% added to the variable percentage).",
    internationalDesc2: "For automatic currency conversions (if they deposit in EUR and you have a USD account), keep in mind that PayPal will set an internal conversion margin of its own, which is usually around 3% or 4% less beneficial versus the standard global rate."
  }
};

type TranslationsContextType = {
  lang: Language;
  toggleLang: () => void;
  t: (key: keyof typeof translations['es']) => string;
};

const LanguageContext = createContext<TranslationsContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key: keyof typeof translations['es']) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
