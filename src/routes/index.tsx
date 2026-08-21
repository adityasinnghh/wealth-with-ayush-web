import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import ayushStage from "@/assets/ayush-stage.jpg";
import learnDesk from "@/assets/learn-desk.jpg";
import community from "@/assets/community.jpg";
import { createRazorpayOrder } from "@/lib/razorpay-order";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wealth with Ayush | High-Income Skills & Online Courses" },
      {
        name: "description",
        content:
          "Wealth with Ayush teaches high-income skills — digital products, freelancing, content creation, ads and the stock market — with lifetime access, live sessions and mentorship.",
      },
      { property: "og:title", content: "Wealth with Ayush | High-Income Skills & Online Courses" },
      {
        property: "og:description",
        content:
          "Learn practical money-making skills online: freelancing, affiliate marketing, ads, content creation and more. Lifetime access, expert trainers, live mentorship.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Courses", href: "#courses" },
  { label: "Packages", href: "#packages" },
  { label: "Mentors", href: "#mentors" },
  { label: "FAQ", href: "#faq" },
  { label: "Enroll", href: "#enroll" },
];

const courses = [
  "10 Ways To Grow Your YouTube",
  "Adobe Photoshop",
  "Adobe Premiere Pro",
  "Advance WordPress",
  "Business Negotiation",
  "Canva Mastery",
  "Content Creation",
  "Excel Course",
  "Facebook Ads",
  "Google Ads",
  "How To Build Your First Start Up",
  "First 1000 Sales In Affiliate Marketing",
  "How To Make Your 1st 1 Crore",
  "Freelance Journey With Wix",
  "Instagram Wealth Mastery",
  "Job Interview",
  "Personality Development",
  "Public Speaking",
  "Python For Beginners",
  "Social Success",
  "Stock Market",
  "The Ultimate Affiliate Marketing Blueprint",
  "VN Video Editing",
];

// Words that cycle through the hero headline. "EARNING." matches the
// original static copy so the very first paint is unchanged.
const heroVerbs = ["EARNING.", "FREELANCING.", "INVESTING.", "CREATING.", "SCALING."];

// A stock-ticker-style strip under the hero — reinforces the
// "wealth / stock market" positioning instead of a generic gradient bar.
const tickerItems = [
  "Freelancing",
  "Content Creation",
  "Stock Market",
  "Facebook Ads",
  "Affiliate Marketing",
  "YouTube Growth",
  "Google Ads",
  "Video Editing",
];

const packages = [
  { id: "slot-holding", name: "Slot Holding", category: "Starter", was: "₹ 3,000", now: "₹ 2,000", amount: 200000 },
  { id: "expert-wave", name: "Expert Wave", category: "Skills", was: "₹ 7,000", now: "₹ 5,000", amount: 500000 },
  { id: "finance-wave", name: "Finance Wave", category: "Finance", was: "₹ 11,000", now: "₹ 9,500", amount: 950000 },
  { id: "creator-wave", name: "Creator Wave", category: "Creator", was: "₹ 20,000", now: "₹ 16,000", amount: 1600000 },
  { id: "tech-wave", name: "Tech Wave", category: "Technology", was: "₹ 29,000", now: "₹ 20,000", amount: 2000000 },
];

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const mentors = [
  { name: "Ayush Parmar", role: "Founder / Content Creator" },
  { name: "Kartik Kaushik", role: "Digital Marketing Expert" },
  { name: "Harsh Vikal", role: "Business Consultant" },
  { name: "Sumit Sengar", role: "Sales Coach" },
  { name: "Sagar Poonia", role: "Public Speaker" },
  { name: "Er. Lakhan Lal Gupta", role: "Software Engineer" },
  { name: "Sahil Vashist", role: "Video Editor" },
  { name: "Gautam Sharma", role: "Photoshop Trainer" },
];

const faqs = [
  {
    q: "What is Wealth with Ayush?",
    a: "Wealth with Ayush is an ed-tech platform that teaches high-income skills like digital product selling, freelancing, content creation, ads management and more — helping students, freelancers and entrepreneurs earn money online.",
  },
  {
    q: "Who can join Wealth with Ayush?",
    a: "Anyone — whether you're a student, job-seeker, working professional or entrepreneur — who wants to learn practical skills to make money online. No prior experience is needed.",
  },
  {
    q: "What makes it different from other online courses?",
    a: "We don't just teach theory. We provide step-by-step training, real examples, sales funnels, ads strategies, live sessions and mentorship to help you start earning quickly.",
  },
  {
    q: "How long will I have access after joining?",
    a: "You get lifetime access to all modules, updates and recorded sessions once you enroll.",
  },
  {
    q: "Can I really earn money after learning here?",
    a: "Yes. Thousands of our students are already earning through freelancing, product sales and social media. Your earnings depend on your effort and consistency.",
  },
  {
    q: "How can I pay for the courses?",
    a: "You can pay via UPI, Debit/Credit Card, Net Banking or international payment gateways.",
  },
  {
    q: "Do you provide refunds?",
    a: "We provide value-packed programs at affordable prices. Since all content is digital and instantly accessible, refunds are generally not available — but our support team resolves any issue you face.",
  },
];

const journey = [
  {
    title: "Learn With Experts",
    text: "Gain knowledge directly from industry practitioners who earn from the skills they teach.",
  },
  {
    title: "Learn Anything",
    text: "Master any subject from our diverse catalogue — tech, business, creative and finance.",
  },
  {
    title: "Get An Online Certificate",
    text: "Earn a verifiable certificate for every program you complete.",
  },
  {
    title: "Comprehensive Learning",
    text: "Recorded modules, live sessions, templates and community support in one place.",
  },
];

function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<(typeof packages)[number] | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground font-sans selection:bg-accent selection:text-white">
      <Navigation mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Hero onEnroll={() => setSelectedPackage(packages[0] ?? null)} />
      <CourseMarquee />
      <About />
      <Packages onEnroll={setSelectedPackage} />
      <Journey />
      <Mentors />
      <Stats />
      <Faq />
      <Footer onEnroll={() => setSelectedPackage(packages[0] ?? null)} />
      {selectedPackage && (
        <EnrollmentModal
          selectedPackage={selectedPackage}
          onPackageChange={setSelectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
}

function Navigation({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/60 px-4 py-5 text-white backdrop-blur-xl sm:px-6 sm:py-6 md:bg-black/20 md:mix-blend-difference">
      <a href="#" className="whitespace-nowrap font-mono text-[10px] tracking-[0.2em] uppercase text-white sm:text-xs sm:tracking-[0.3em]">
        Wealth / With Ayush
      </a>

      <div className="hidden gap-8 font-mono text-[10px] tracking-[0.18em] uppercase text-white lg:flex xl:gap-10">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-accent transition-colors">
            {link.label}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="rounded-full border border-white/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        aria-controls="wwa-mobile-menu"
      >
        {mobileOpen ? "Close" : "Menu"}
      </button>

      {mobileOpen && (
        <div id="wwa-mobile-menu" className="absolute left-0 top-full w-full border-b border-white/10 bg-[#090909]/95 px-5 py-6 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="grid grid-cols-2 gap-3 font-mono text-[10px] uppercase tracking-[0.16em]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border border-white/10 px-4 py-4 transition-colors hover:border-accent hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Respects the OS-level "reduce motion" setting so the cycling headline
// word and the ticker strip don't animate for people who've asked for that.
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

function Hero({ onEnroll }: { onEnroll: () => void }) {
  const prefersReducedMotion = useReducedMotion();
  const [verbIndex, setVerbIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const intervalId = setInterval(() => {
      setVerbIndex((current) => (current + 1) % heroVerbs.length);
    }, 2400);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  return (
    <header className="relative flex flex-col overflow-hidden sm:min-h-[86svh] lg:min-h-[82svh]">
      <style>{`
        @keyframes wwa-word-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wwa-word {
          animation: wwa-word-in 0.5s ease;
        }
        @keyframes wwa-headline-line-in {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wwa-headline-line {
          display: block;
          animation: wwa-headline-line-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .wwa-headline-line:nth-child(2) {
          animation-delay: 180ms;
        }
        @media (prefers-reduced-motion: reduce) {
          .wwa-word,
          .wwa-headline-line { animation: none; }
        }
      `}</style>

      <div className="relative flex flex-1 items-center px-5 pb-12 pt-24 sm:px-6 sm:pb-10 sm:pt-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_45%,rgba(37,99,235,0.18),transparent_30%),linear-gradient(115deg,#090909_0%,#090909_48%,#111827_100%)]" />
        <div className="absolute right-[-12%] top-1/2 -z-10 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full border border-white/10 sm:right-[-8%]" />
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-white/60 fade-up delay-100 sm:mb-6 sm:text-[10px] sm:tracking-[0.4em]">
              <span className="h-px w-8 bg-accent sm:w-12" />
              Teaching & Sharing Programs
            </div>
            <h1 className="max-w-4xl text-[clamp(2.45rem,8.5vw,6.25rem)] font-black leading-[0.98] tracking-[-0.06em] text-balance mb-5 fade-up delay-300 sm:mb-7">
              <span className="wwa-headline-line">
                NEVER STOP{" "}
                <span className="text-transparent [-webkit-text-stroke:1px_white]">LEARNING.</span>
              </span>
              <span className="wwa-headline-line mt-2 sm:mt-3">
                NEVER STOP{" "}
                <span key={verbIndex} className="wwa-word inline-block text-accent">
                  {heroVerbs[verbIndex]}
                </span>
              </span>
            </h1>
            <p className="mb-6 max-w-xl text-sm font-light leading-relaxed text-white/60 fade-up delay-400 sm:mb-8 sm:text-base">
              Every teaching and learning journey is unique. Wealth with Ayush helps you guide
              yours — with high-income skills, live mentorship and lifetime access.
            </p>
            <div className="flex flex-col items-start gap-5 fade-up delay-500 sm:flex-row sm:items-center sm:gap-6">
              <button
                type="button"
                onClick={onEnroll}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-widest text-black transition-all duration-500 hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Enroll Now
              </button>
              <a
                href="#courses"
                className="border-b border-white/20 pb-1 font-mono text-[10px] uppercase tracking-widest transition-all hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Browse {courses.length}+ Courses
              </a>
            </div>
            <div className="mt-8 flex max-w-full flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/40 sm:mt-10 sm:gap-x-8 sm:tracking-[0.24em]">
              <span>{courses.length}+ courses</span>
              <span>Lifetime access</span>
              <span>Live mentorship</span>
            </div>
          </div>

          <div className="relative scale-in delay-300 md:col-span-5 md:max-w-[24rem] md:justify-self-end md:scale-[0.97] md:origin-right">
            <img
              src={ayushStage}
              alt="Ayush teaching a live high-income skills session on stage"
              width={1024}
              height={1280}
              className="aspect-[4/3] w-full rounded-2xl object-cover object-center opacity-90 outline outline-1 -outline-offset-1 outline-white/10 sm:aspect-[16/9] md:aspect-[4/5] md:rounded-3xl"
            />
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 border border-white/15 bg-black/70 px-4 py-3 backdrop-blur-md float-soft sm:bottom-5 sm:left-5">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_currentColor]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/80">
                80K+ students already earning
              </span>
            </div>
          </div>
        </div>
      </div>

      <SkillTicker />
    </header>
  );
}

// A stock-ticker-style marquee under the hero. It's decorative and repeats
// the same list twice for a seamless loop, so it's hidden from screen
// readers — the real course list is announced properly further down.
function SkillTicker() {
  return (
    <div aria-hidden="true" className="wwa-ticker-wrap relative overflow-hidden border-y border-white/10 bg-black/40">
      <style>{`
        @keyframes wwa-ticker-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .wwa-ticker-track {
          width: max-content;
          animation: wwa-ticker-scroll 18s linear infinite;
        }
        .wwa-ticker-wrap:hover .wwa-ticker-track {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="wwa-ticker-track flex items-center gap-10 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50"
        style={{ animation: "wwa-ticker-scroll 18s linear infinite" }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-2">
            <span className="text-accent">▲</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function CourseMarquee() {
  return (
    <section id="courses" className="section-reveal px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">01 / TOP COURSES</h2>
          <p className="max-w-[30ch] font-mono text-[9px] text-muted-foreground sm:text-[10px]">
            OUR MOST POPULAR PROGRAMS, BUILT TO ELEVATE YOUR SKILLS.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
          {courses.map((course, i) => (
            <div
              key={course}
              className="hover-lift flex items-start justify-between gap-4 bg-background p-5 transition-colors hover:bg-white/5 sm:gap-6 sm:p-8"
            >
              <span className="text-sm font-medium tracking-tight">{course}</span>
              <span className="font-mono text-[10px] text-accent shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section-reveal bg-white px-5 py-20 text-black sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <img
          src={learnDesk}
          alt="Online learning workspace with course dashboard"
          width={1280}
          height={720}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover transition-transform duration-700 hover:scale-[1.02] sm:aspect-video"
        />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50 mb-6">
            About Us
          </p>
          <h2 className="mb-5 text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl">
            25 OF THE TOP COURSES, NOW IN ONE PLACE
          </h2>
          <p className="text-sm leading-relaxed text-black/70 font-light mb-8">
            Discover a curated selection of the best courses from Wealth with Ayush, covering
            technology, business, finance, creative work and personal development — with
            comprehensive content and expert instruction to help you reach your goals.
          </p>
          <ul className="mb-8 space-y-4 sm:mb-10">
            {[
              "The most world-class instructors",
              "Access your class anywhere",
              "Flexible course plans",
            ].map((item) => (
              <li key={item} className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest">
                <span className="w-6 h-px bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#packages"
            className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors rounded-full"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </section>
  );
}

function Packages({ onEnroll }: { onEnroll: (selectedPackage: (typeof packages)[number]) => void }) {
  return (
    <section id="packages" className="section-reveal px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">02 / PACKAGES</h2>
          <p className="max-w-[30ch] font-mono text-[9px] text-muted-foreground sm:text-[10px]">
            TOP-CLASS LEARNING BUNDLES ACROSS EVERY FIELD.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="hover-lift flex flex-col justify-between rounded-xl border border-white/10 p-6 transition-colors hover:bg-white/5 sm:rounded-sm sm:p-10"
            >
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest">
                <span className="text-accent">{pkg.category}</span>
                <span className="text-muted-foreground">4.8 Reviews</span>
              </div>
              <div className="mt-10 sm:mt-16">
                <h3 className="mb-4 text-2xl font-black tracking-tighter sm:text-3xl">{pkg.name}</h3>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-2xl font-bold">{pkg.now}</span>
                  <span className="text-sm line-through text-muted-foreground">{pkg.was}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onEnroll(pkg)}
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-full"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="section-reveal border-t border-white/10 px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-16">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground sm:text-[10px] sm:tracking-[0.3em]">
            How We Start The Journey
          </p>
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl">
            START YOUR LEARNING JOURNEY TODAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {journey.map((step, i) => (
            <div key={step.title} className="hover-lift rounded-xl border border-white/10 p-6 sm:rounded-sm sm:p-8">
              <span className="font-mono text-[10px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 mb-3 text-lg font-bold tracking-tight sm:mt-8 sm:text-xl">{step.title}</h3>
              <p className="text-xs text-muted-foreground font-light leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mentors() {
  return (
    <section id="mentors" className="section-reveal px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col items-start gap-4 border-b border-white/10 pb-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <h2 className="text-3xl font-black tracking-tighter sm:text-4xl">03 / MENTORS</h2>
          <p className="max-w-[30ch] font-mono text-[9px] text-muted-foreground sm:text-[10px]">
            EXPERT INSTRUCTORS, ALL IN ONE PLACE.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-3 md:gap-12">
          <img
            src={community}
            alt="Students attending a live online training session"
            width={1024}
            height={1024}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover outline outline-1 -outline-offset-1 outline-white/10 transition-transform duration-700 hover:scale-[1.02] sm:aspect-square sm:rounded-sm"
          />
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-sm overflow-hidden">
            {mentors.map((m) => (
              <div key={m.name} className="hover-lift bg-background p-5 sm:p-8">
                <h3 className="text-lg font-bold tracking-tight">{m.name}</h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                  {m.role}
                </p>
                <p className="font-mono text-[10px] text-accent mt-4">4.8 Ratings</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "80 K+", label: "Enrolled Students" },
    { value: "80 +", label: "Live Courses" },
    { value: "80 +", label: "Best Trainers" },
  ];

  return (
    <section className="section-reveal bg-white px-5 py-16 text-black sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-12">
        {stats.map((s) => (
          <div key={s.label} className="hover-lift">
            <p className="text-5xl font-black tracking-tighter sm:text-6xl">{s.value}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] mt-4 text-black/50">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="section-reveal px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
          FAQ's
        </p>
        <h2 className="mb-10 text-3xl font-black tracking-tighter sm:mb-16 sm:text-4xl md:text-5xl">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6 transition-colors hover:bg-white/[0.03]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold tracking-tight sm:gap-8 sm:text-lg">
                {f.q}
                <span className="font-mono text-accent text-sm group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ onEnroll }: { onEnroll: () => void }) {
  return (
    <footer id="enroll" className="section-reveal bg-accent px-5 py-24 text-white sm:px-6 sm:py-40">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="mb-10 text-4xl font-black tracking-tighter sm:mb-12 sm:text-6xl md:text-8xl">
          LET'S BUILD <br /> YOUR WEALTH.
        </h2>
        <button
          type="button"
          onClick={onEnroll}
          className="inline-flex items-center justify-center px-12 py-6 bg-white text-black font-mono text-sm uppercase tracking-widest hover:invert transition-all rounded-full"
        >
          Enroll Today
        </button>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/20 pt-8 font-mono text-[9px] tracking-[0.16em] uppercase sm:mt-32 sm:flex-row sm:gap-8 sm:pt-12 sm:text-[10px] sm:tracking-[0.2em]">
          <p>&copy; 2026 Wealth with Ayush</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              YouTube
            </a>
            <a href="#faq" className="hover:opacity-70 transition-opacity">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function EnrollmentModal({
  selectedPackage,
  onPackageChange,
  onClose,
}: {
  selectedPackage: (typeof packages)[number];
  onPackageChange: (selectedPackage: (typeof packages)[number]) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }
      const order = await createRazorpayOrder({
        packageId: selectedPackage.id,
        name,
        email,
        phone,
      });
      const keyId = import.meta.env["VITE_RAZORPAY_KEY_ID"];
      if (!keyId || !window.Razorpay) {
        throw new Error("Razorpay is not configured yet. Add the Razorpay key and try again.");
      }

      const checkout = new window.Razorpay({
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Wealth with Ayush",
        description: selectedPackage.name,
        order_id: order.id,
        prefill: { name, email, contact: phone },
        method: { upi: true, card: false, netbanking: false, wallet: false, emi: false, paylater: false },
        theme: { color: "#d95d39" },
        modal: { ondismiss: () => setIsLoading(false) },
      });
      checkout.open();
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start payment.");
      setIsLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-sm bg-white p-8 text-black shadow-2xl">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">Secure UPI checkout</p>
            <h2 id="enrollment-title" className="mt-3 text-3xl font-black tracking-tighter">Complete your enrollment</h2>
          </div>
          <button type="button" onClick={onClose} className="font-mono text-xs uppercase tracking-widest text-black/50 hover:text-black" aria-label="Close enrollment form">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block font-mono text-[10px] uppercase tracking-widest">Select plan<select value={selectedPackage.id} onChange={(event) => { const nextPackage = packages.find((pkg) => pkg.id === event.target.value); if (nextPackage) onPackageChange(nextPackage); }} className="mt-2 w-full border border-black/20 bg-white px-4 py-3 font-sans text-sm outline-none focus:border-accent">{packages.map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name} - {pkg.now}</option>)}</select></label>
          <div className="flex items-center justify-between border-y border-black/10 py-4">
            <span className="font-mono text-xs uppercase tracking-widest">{selectedPackage.name}</span>
            <strong className="text-xl">{selectedPackage.now}</strong>
          </div>
          <label className="block font-mono text-[10px] uppercase tracking-widest">Full name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-black/20 px-4 py-3 font-sans text-sm outline-none focus:border-accent" /></label>
          <label className="block font-mono text-[10px] uppercase tracking-widest">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-black/20 px-4 py-3 font-sans text-sm outline-none focus:border-accent" /></label>
          <label className="block font-mono text-[10px] uppercase tracking-widest">Phone number<input required pattern="[0-9]{10}" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} className="mt-2 w-full border border-black/20 px-4 py-3 font-sans text-sm outline-none focus:border-accent" /></label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={isLoading} type="submit" className="w-full bg-black px-6 py-4 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-60">{isLoading ? "Opening payment..." : "Pay with UPI"}</button>
        </form>
      </div>
    </div>
  );
}

function loadRazorpayScript() {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Could not load Razorpay checkout.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
    document.body.appendChild(script);
  });
}