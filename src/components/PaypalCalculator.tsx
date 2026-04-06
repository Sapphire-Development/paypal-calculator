import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, DollarSign, Euro, PoundSterling, Percent, ArrowRightLeft, Globe } from "lucide-react";
import { usePaypalCalculator } from "@/hooks/usePaypalCalculator";
import { PAYPAL_CURRENCIES } from "@/lib/paypal";
import { InfoDialog } from "./InfoDialog";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

function CalculatorCore() {
  const {
    amount, setAmount,
    percentage, setPercentage,
    fixedFee, setFixedFee,
    mode, setMode,
    currencyCode, setCurrencyCode,
    currencySymbol,
    numAmount,
    computedMain,
    computedCommission
  } = usePaypalCalculator();

  const { t, lang, toggleLang } = useLanguage();

  const CurrencyIcon = currencySymbol === '€' ? Euro : currencySymbol === '£' ? PoundSterling : DollarSign;

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl bg-card border-border">
      <CardHeader className="space-y-1 pb-4 relative">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            <Calculator className="w-5 h-5" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-card-foreground">{t('calculatorTitle')}</CardTitle>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLang}
              className="h-8 shadow-sm bg-background border-border/60 hover:bg-accent/50 focus:outline-none rounded-full"
            >
              <Globe className="w-4 h-4 mr-1 text-muted-foreground" />
              <span className="font-medium text-xs">{lang.toUpperCase()}</span>
            </Button>
            <InfoDialog />
          </div>
        </div>
        <CardDescription className="text-muted-foreground">
          {t('calculatorDesc')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as "receive" | "send")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted">
            <TabsTrigger value="receive" className="rounded-md">{t('toReceive')}</TabsTrigger>
            <TabsTrigger value="send" className="rounded-md">{t('toSend')}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="amount" className="font-semibold text-foreground">{t('amount')}</Label>
              <div className="relative">
                <CurrencyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 text-lg transition-all rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="col-span-1 space-y-2">
              <Label className="font-semibold text-foreground">{t('currency')}</Label>
              <Select value={currencyCode} onValueChange={setCurrencyCode}>
                <SelectTrigger className="w-full h-[46px] rounded-md transition-all text-base bg-background">
                  <SelectValue placeholder={t('currency')} />
                </SelectTrigger>
                <SelectContent>
                  {PAYPAL_CURRENCIES.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="font-medium">{c.code}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="percentage" className="text-xs font-medium text-muted-foreground">
                {t('feePercentage')}
              </Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="percentage"
                  type="number"
                  min="0"
                  step="0.1"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="pl-9 h-9 text-sm rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fixedFee" className="text-xs font-medium text-muted-foreground">
                {t('fixedFee')} ({currencySymbol})
              </Label>
              <div className="relative">
                <CurrencyIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fixedFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={fixedFee}
                  onChange={(e) => setFixedFee(e.target.value)}
                  className="pl-9 h-9 text-sm rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="bg-muted/50 rounded-2xl p-5 border border-border/50 relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            {mode === "receive" ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('receiveExactly')}</p>
                  <p className="text-2xl font-semibold text-foreground">{currencySymbol}{numAmount.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('theyMustSend')}</p>
                  <p className="text-3xl font-bold text-primary">{currencySymbol}{computedMain.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('sendAmount')}</p>
                  <p className="text-2xl font-semibold text-foreground">{currencySymbol}{numAmount.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('recipientGets')}</p>
                  <p className="text-3xl font-bold text-primary">{currencySymbol}{computedMain.toFixed(2)}</p>
                </div>
              </>
            )}

            <div className="pt-2 border-t border-border mt-4 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground"><ArrowRightLeft className="w-3 h-3" /> {t('totalFee')}</span>
              <span className="font-medium font-mono text-destructive">-{currencySymbol}{computedCommission.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PaypalCalculator() {
  return (
    <LanguageProvider>
      <CalculatorCore />
    </LanguageProvider>
  );
}
