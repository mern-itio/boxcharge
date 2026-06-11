import { PaymentMethodIcon, CardNetworkIcon } from "@/components/site/PaymentMethodIcons";

const cardSchemes = ["VISA", "Mastercard", "AMEX", "UnionPay", "JCB", "Discover", "Diners"];
const apms = ["SEPA", "iDEAL", "PIX", "Klarna", "Bancontact", "Sofort", "P24", "GiroPay", "Alipay", "WeChat Pay", "PayPal", "Apple Pay"];

export function PartnerWall() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Connectivity Across Major Schemes &amp; Local Payment Methods
        </div>
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold sm:text-3xl">
          <span className="gradient-text">One Integration. Global Acceptance.</span>
        </h2>

        <div className="mt-10">
          <div className="mb-3 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
            Card Networks
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {cardSchemes.map((s) => (
              <span
                key={s}
                title={s}
                className="glass gradient-border inline-flex items-center rounded-xl bg-white/95 px-3 py-2"
              >
                <CardNetworkIcon name={s} size="md" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-3 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
            Alternative Payment Methods
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {apms.map((s) => (
              <span
                key={s}
                title={s}
                className="glass gradient-border inline-flex items-center rounded-xl bg-white/95 px-3 py-2"
              >
                <PaymentMethodIcon name={s} size="md" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
