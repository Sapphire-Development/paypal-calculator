import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InfoIcon, ShieldCheck, Globe, CreditCard, ArrowRightLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function InfoDialog() {
  const { t } = useLanguage();

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="h-8 px-3 shadow-sm bg-background border-border/60 hover:bg-accent/50 text-foreground transition-all" />
        }
      >
        <div className="flex items-center gap-1.5">
          <InfoIcon className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">{t('feesBtn')}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
              <InfoIcon className="w-4 h-4" />
            </div>
            {t('guideTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('guideDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[65vh] p-6">
          <div className="space-y-8 text-sm text-muted-foreground">

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
                <ArrowRightLeft className="w-5 h-5 text-primary" /> {t('howToUse')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <strong className="text-foreground block mb-2 text-base font-medium">{t('toReceive')}</strong>
                  <p className="leading-relaxed">
                    {t('howToReceiveDesc')}
                  </p>
                </div>
                <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <strong className="text-foreground block mb-2 text-base font-medium">{t('toSend')}</strong>
                  <p className="leading-relaxed">
                    {t('howToSendDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
                <CreditCard className="w-5 h-5 text-primary" /> {t('feeStructure')}
              </h3>
              <p className="leading-relaxed">
                {t('feeStructureDesc')}
              </p>
              <ul className="space-y-3 bg-muted/20 p-5 rounded-xl border border-border/30">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-foreground font-medium">{t('variableFee')}</strong> {t('variableFeeDesc')}
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="leading-relaxed">
                    <strong className="text-foreground font-medium">{t('fixedFeeTitle')}</strong> {t('fixedFeeDesc')}
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
                <ShieldCheck className="w-5 h-5 text-primary" /> {t('commercialVsPersonal')}
              </h3>
              <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 text-foreground/80 space-y-3">
                <div>
                  <strong className="text-primary font-semibold">{t('friendsFamily')}</strong>
                  <p className="mt-1 text-muted-foreground">{t('friendsFamilyDesc')}</p>
                </div>
                <div>
                  <strong className="text-primary font-semibold">{t('goodsServices')}</strong>
                  <p className="mt-1 text-muted-foreground">{t('goodsServicesDesc')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2 text-base">
                <Globe className="w-5 h-5 text-primary" /> {t('international')}
              </h3>
              <p className="leading-relaxed bg-muted/30 p-5 rounded-xh border border-border/50">
                {t('internationalDesc1')} <br /><br />
                {t('internationalDesc2')}
              </p>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
