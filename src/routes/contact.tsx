import { createFileRoute } from "@tanstack/react-router";
import { CmsHtmlBody } from "@/components/cms/CmsHtmlBody";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/PageBlocks";
import { ApplyForm } from "@/components/site/ApplyForm";
import { FAQAccordion } from "@/components/site/PageBlocks";
import { buildHead } from "@/components/seo/buildHead";
import { TelegramIcon } from "@/components/site/TelegramIcon";
import { XIcon } from "@/components/site/XIcon";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { pageSeoDefaults } from "@/content/seoCopy";
import { resolvePageSeo, seoFromLoader } from "@/lib/pageSeo";
import {
  Building2,
  Calendar,
  Clock,
  Facebook,
  Globe2,
  Linkedin,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const seo = pageSeoDefaults.contact;

export const Route = createFileRoute("/contact")({
  loader: () => resolvePageSeo("contact", seo),
  head: ({ loaderData }) => {
    const meta = seoFromLoader(loaderData, seo);
    return buildHead({
      title: meta.title,
      description: meta.description,
      path: "/contact",
      keywords: meta.keywords,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ],
    });
  },
  component: ContactPage,
});

const channels = [
  {
    icon: Building2,
    t: "Business Inquiry",
    b: "Discuss merchant services, pricing and onboarding.",
    c: "business@boxchrge.com",
    href: "mailto:business@boxchrge.com",
  },
  {
    icon: Mail,
    t: "Technical Inquiry",
    b: "Integration support, APIs, and webhooks.",
    c: "developers@boxchrge.com",
    href: "mailto:developers@boxchrge.com",
  },
  {
    icon: Globe2,
    t: "Partnerships",
    b: "Acquiring, APMs, and infrastructure partners.",
    c: "partners@boxchrge.com",
    href: "mailto:partners@boxchrge.com",
  },
  {
    icon: Calendar,
    t: "Contact form",
    b: "Send a business inquiry via our secure form — typical reply within 1 business day.",
    c: "Open contact form",
    href: "#apply",
  },
];

const timeline = [
  { n: 1, t: "Inquiry received", b: "Your details land with the BoxCharge intake team." },
  { n: 2, t: "Profile review", b: "We review your business, region and processing needs." },
  { n: 3, t: "Specialist matched", b: "A payments specialist is assigned to your case." },
  { n: 4, t: "Tailored proposal", b: "Setup recommendation — typically within 1 business day." },
  { n: 5, t: "Agreement signed", b: "Commercial terms confirmed and onboarding documents executed." },
  { n: 6, t: "Sandbox issued", b: "Sandbox credentials and test cards for your integration team." },
  { n: 7, t: "Integration & go-live", b: "We support testing, certification and the production switch-on." },
];

const faqs = [
  {
    q: "How fast will I hear back after submitting the form?",
    a: "Most business inquiries receive an initial response within one business day. Complex or partner-routed cases may take 2–3 business days.",
  },
  {
    q: "Do I need to share volume and corridor details up front?",
    a: "It helps. Sharing approximate monthly volume, primary regions and the payment methods you want to support lets us route you to the right specialist immediately.",
  },
  {
    q: "Can BoxCharge support my business?",
    a: "We work with a wide network of acquiring and banking partners worldwide. Our job is to place your application with the right partner so you can focus on growing the business while we handle the banking partnerships.",
  },
  {
    q: "Will pricing be shared in the first reply?",
    a: "Yes — a high-level commercial outline accompanies the setup proposal. Final pricing depends on volume, regions and the acquiring partners in scope.",
  },
  {
    q: "How long does onboarding take?",
    a: "Typically 7–21 business days, depending on partner KYB and documentation completeness. Sandbox access is usually available within the first week.",
  },
  {
    q: "How is my information protected?",
    a: "Inquiry data is handled by the BoxCharge team only and used solely to respond to your request. See our Privacy Policy for full details.",
  },
];


function ContactPage() {
  const settings = useSiteSettings();
  const socialProfiles = [
    { label: "LinkedIn", href: settings?.social_linkedin, icon: Linkedin },
    { label: "Facebook", href: settings?.social_facebook, icon: Facebook },
    { label: "X", href: settings?.social_twitter, icon: XIcon },
    { label: "Telegram", href: settings?.social_telegram, icon: TelegramIcon },
  ].filter((profile) => profile.href);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a Conversation"
        subtitle="Talk to the BoxCharge team about merchant services, integration, or partner discussions. Typical response within one business day."
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        primaryCta={{ label: "Send an Inquiry", href: "#apply" }}
        cmsSlug="contact"
      />

      <CmsHtmlBody slug="contact">
      {/* Channels */}
      <Section eyebrow="How to reach us" title="Pick the channel that fits">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, t, b, c, href }) => (
            <a
              key={t}
              href={href}
              className="glass gradient-border card-lift block rounded-2xl p-6"
            >
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-3 font-semibold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{b}</p>
              <div className="mt-3 text-sm text-primary">{c}</div>
            </a>
          ))}
        </div>
      </Section>

      {socialProfiles.length > 0 && (
        <Section
          eyebrow="Connect"
          title="Follow BoxCharge"
          subtitle="Follow our official profiles for company news, payment insights, and product updates."
          className="!pt-0"
        >
          <div className="flex flex-wrap gap-3">
            {socialProfiles.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-3 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </a>
            ))}
          </div>
        </Section>
      )}

      {/* Form */}
      <ApplyForm />

      {/* What happens next */}
      <Section eyebrow="What happens after you submit" title="Your inquiry, step by step">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {timeline.map((s) => (
            <li key={s.n} className="glass gradient-border relative rounded-2xl p-6">
              <div className="font-display text-3xl font-semibold text-primary/70">
                0{s.n}
              </div>
              <div className="mt-2 font-semibold">{s.t}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Inline FAQ */}
      <Section eyebrow="Quick answers" title="Before you submit">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqs} />
        </div>
      </Section>

      {/* Trust band */}
      <section className="border-y border-border/60 bg-card/30 py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Clock,
                t: "Typical response",
                b: "Within 1 business day for most inquiries.",
              },
              {
                icon: ShieldCheck,
                t: "Data handled with care",
                b: "Inquiry data is used only to respond to your request.",
              },
              {
                icon: MessageSquare,
                t: "Real specialists, no bots",
                b: "Replies come from a boxchrge.com address — never automated.",
              },
            ].map(({ icon: Icon, t, b }) => (
              <div key={t} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="text-xs text-muted-foreground">{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </CmsHtmlBody>
    </>
  );
}
