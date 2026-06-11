const logos = [
  { name: "Nordwind", tag: "SaaS · EU" },
  { name: "Coral Travel", tag: "Travel · MENA" },
  { name: "Bytehaus", tag: "Marketplace · APAC" },
  { name: "Mirae Edu", tag: "Education · APAC" },
  { name: "Atlas Retail", tag: "E-commerce · LATAM" },
  { name: "Helios Pay", tag: "Fintech · EU" },
  { name: "Verdant", tag: "Subscriptions · UK" },
  { name: "Kintaro", tag: "Marketplace · JP" },
];

export function LogoWall() {
  // Duplicate for seamless marquee
  const row = [...logos, ...logos];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Brands building global payments on BoxCharge
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <div
            className="flex w-max gap-4"
            style={{ animation: "logo-marquee 40s linear infinite" }}
          >
            {row.map((l, i) => (
              <div
                key={`${l.name}-${i}`}
                className="glass gradient-border flex min-w-[200px] items-center gap-3 rounded-xl px-5 py-4"
              >
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/30 to-accent/20 font-display text-sm font-semibold text-foreground/90 ring-1 ring-white/10">
                  {l.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-medium leading-tight">{l.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {l.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          Some clients shown anonymized at partner request.
        </p>
      </div>
    </section>
  );
}
