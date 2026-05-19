import {
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  ExternalLink,
  Gauge,
  Layers3,
  Play,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const heroVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const calendarUrl = "https://calendar.app.google/gSMzxnWCdT8Ndj2BA";
const email = "jonathan.darmouni@gmail.com";
const phone = "06 52 98 01 91";

function SmoothLoopVideo({ src }: { src: string }) {
  const firstRef = useRef<HTMLVideoElement>(null);
  const secondRef = useRef<HTMLVideoElement>(null);
  const transitionTimeout = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const isTransitioning = useRef(false);
  const activeVideoRef = useRef<0 | 1>(0);
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0);

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;

    if (!first || !second) {
      return undefined;
    }

    const crossfadeSeconds = 1.1;
    const crossfadeMs = crossfadeSeconds * 1000;

    const playVideo = async (video: HTMLVideoElement) => {
      try {
        await video.play();
      } catch {
        // Autoplay can be blocked in unusual browser states; muted playsInline covers normal cases.
      }
    };

    const startCrossfade = () => {
      if (isTransitioning.current) {
        return;
      }

      const nextIndex = activeVideoRef.current === 0 ? 1 : 0;
      const current = activeVideoRef.current === 0 ? first : second;
      const next = nextIndex === 0 ? first : second;

      isTransitioning.current = true;
      next.currentTime = 0;
      void playVideo(next);
      activeVideoRef.current = nextIndex;
      setActiveVideo(nextIndex);

      transitionTimeout.current = window.setTimeout(() => {
        current.pause();
        current.currentTime = 0;
        isTransitioning.current = false;
      }, crossfadeMs);
    };

    const tick = () => {
      const current = activeVideoRef.current === 0 ? first : second;
      if (
        Number.isFinite(current.duration) &&
        current.duration > crossfadeSeconds + 0.5 &&
        current.currentTime >= current.duration - crossfadeSeconds
      ) {
        startCrossfade();
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    void playVideo(first);
    second.pause();
    second.currentTime = 0;
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
      }
    };
  }, [src]);

  const sharedClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <>
      <video
        ref={firstRef}
        className={`${sharedClass} transition-opacity duration-1000 ease-linear ${
          activeVideo === 0 ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={secondRef}
        className={`${sharedClass} transition-opacity duration-1000 ease-linear ${
          activeVideo === 1 ? "opacity-100" : "opacity-0"
        }`}
        src={src}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </>
  );
}

type WordSegment = {
  text: string;
  className?: string;
};

type CaseStudy = {
  title: string;
  label: string;
  problem: string;
  solution: string;
  value: string;
  tags: string[];
  href?: string;
};

type OfferStepData = {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  body: string;
};

const caseStudies: CaseStudy[] = [
  {
    title: "Swipe it",
    label: "Application iOS",
    problem: "Des galeries photo trop lourdes, difficiles à trier sans y passer des heures.",
    solution:
      "Application iOS construite de A à Z avec tri par swipe, filtres, premium, onboarding et expérience mobile soignée.",
    value:
      "Preuve produit publique : app utilitaire iPhone/iPad, note 5,0 sur 9 avis, version 3.0 publiée le 16 mars.",
    tags: ["iOS", "Produit", "UX", "App Store"],
    href: "https://apps.apple.com/fr/app/swipe-it-photo-cleaner/id6756235144",
  },
  {
    title: "Relances factures impayées",
    label: "Automation",
    problem:
      "Les relances clients sont répétitives, sensibles et faciles à oublier quand le volume augmente.",
    solution:
      "Workflows Trigger.dev pour détecter les factures non payées, orchestrer les relances par emails personnalisés aux couleurs de la marque, et garder le suivi.",
    value:
      "Moins de tâches manuelles, plus de régularité, et une meilleure visibilité sur le cash à récupérer.",
    tags: ["Trigger.dev", "Finance", "Emailing", "Workflow"],
  },
  {
    title: "Conseiller de plateforme agréée",
    label: "Webapp métier",
    problem:
      "Une entreprise doit analyser les caractéristiques de son SI avant de choisir une plateforme agréée.",
    solution:
      "Webapp de diagnostic qui collecte les critères clés, structure l'analyse et guide la recommandation finale.",
    value:
      "Un sujet complexe devient une interface claire, réutilisable et compréhensible par les décideurs.",
    tags: ["Webapp", "SI", "Conseil", "DSCG"],
  },
  {
    title: "nevos.fr",
    label: "Site web",
    problem: "Créer une présence web claire, crédible et exploitable commercialement.",
    solution:
      "Conception et développement d'un site vitrine adapté à l'identité de marque et aux objectifs business.",
    value:
      "Capacité à livrer une interface propre, responsive et alignée sur une activité réelle.",
    tags: ["Web", "Brand", "Responsive"],
    href: "https://nevos.fr",
  },
  {
    title: "intheboxparis.com",
    label: "Site web",
    problem:
      "Vendre en ligne et gérer le site au quotidien sans dépendre d'un développeur.",
    solution:
      "Site sur mesure avec espace administrateur sécurisé (login), gestion du contenu, paiement en ligne via Stripe pour que les clients réservent et règlent directement, et gestion des emails de SAV personnalisés aux couleurs de la marque.",
    value:
      "Un site vitrine devenu outil de vente autonome, opérable par l'équipe.",
    tags: ["Web", "Admin", "Stripe", "Email SAV"],
    href: "https://intheboxparis.com",
  },
];

const offerSteps: OfferStepData[] = [
  {
    icon: Gauge,
    eyebrow: "01",
    title: "Audit du process",
    body:
      "On part d'une tâche qui coûte du temps : relances, documents, reporting, qualification, suivi client. Je cartographie le flux et la valeur à gagner.",
  },
  {
    icon: Workflow,
    eyebrow: "02",
    title: "Automation + webapp",
    body:
      "Je construis l'automatisation avec une interface simple, adaptée aux couleurs et aux habitudes de votre entreprise.",
  },
  {
    icon: Bot,
    eyebrow: "03",
    title: "IA utile, pas gadget",
    body:
      "L'IA sert le métier : extraction, rédaction, classement, contrôle, analyse. Chaque action reste traçable et compréhensible.",
  },
  {
    icon: Layers3,
    eyebrow: "04",
    title: "Maintenance légère",
    body:
      "Une fois livré, le système peut évoluer avec vos outils, vos règles et vos volumes sans refaire tout le projet.",
  },
];

function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  stable = false,
}: {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  stable?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLast = index === words.length - 1;
        const offset = reduce ? 0 : 34;
        const asteriskRoom =
          showAsterisk && isLast ? "pr-[0.62em] -mr-[0.54em]" : "pr-[0.08em]";
        return (
          <span
            key={`${word}-${index}`}
            className={`overflow-hidden pb-[0.22em] -mb-[0.22em] ${asteriskRoom}`}
          >
            <motion.span
              className="relative inline-block"
              initial={{ y: stable ? 0 : offset }}
              animate={isInView || stable ? { y: 0 } : { y: offset }}
              transition={{
                duration: 0.9,
                delay: index * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
              {showAsterisk && isLast ? (
                <sup className="absolute -right-[0.35em] top-[0.45em] text-[0.24em] text-accent">
                  *
                </sup>
              ) : null}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function WordsPullUpMultiStyle({
  segments,
  className = "",
  justify = "center",
}: {
  segments: WordSegment[];
  className?: string;
  justify?: "center" | "start";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const offset = reduce ? 0 : 26;
  const words = useMemo(
    () =>
      segments.flatMap((segment) =>
        segment.text.split(" ").map((word) => ({
          word,
          className: segment.className,
        })),
      ),
    [segments],
  );

  return (
    <div ref={ref} className={`flex flex-wrap ${justify === "start" ? "justify-start" : "justify-center"} ${className}`}>
      {words.map(({ word, className: wordClassName }, index) => (
        <span
          key={`${word}-${index}`}
          className="overflow-hidden pb-[0.2em] -mb-[0.2em] pr-[0.22em]"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: offset }}
            animate={isInView ? { y: 0 } : { y: offset }}
            transition={{
              duration: 0.85,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.25"],
  });

  return (
    <p
      ref={ref}
      className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-primary md:text-base"
    >
      {text.split("").map((letter, index) => {
        const start = index / text.length - 0.08;
        const end = index / text.length + 0.04;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span key={`${letter}-${index}`} style={{ opacity }}>
            {letter}
          </motion.span>
        );
      })}
    </p>
  );
}

function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:text-base ${className} ${
        isPrimary
          ? "bg-primary text-black shadow-[0_10px_30px_-12px_rgba(222,219,200,0.5)] hover:gap-4 hover:shadow-[0_14px_40px_-12px_rgba(143,232,210,0.45)]"
          : "border border-primary/25 bg-black/20 text-primary backdrop-blur hover:border-primary/50 hover:bg-primary/[0.14]"
      }`}
    >
      <span>{children}</span>
      <span
        className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
          isPrimary ? "bg-black text-primary" : "bg-primary text-black"
        }`}
      >
        <ArrowRight size={18} />
      </span>
    </a>
  );
}

function Hero() {
  const navItems = [
    ["Profil", "#profil"],
    ["Méthode", "#methode"],
    ["Réalisations", "#realisations"],
    ["Contact", "#contact"],
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="h-svh bg-black md:p-6">
      <div className="relative h-full overflow-hidden bg-ink shadow-glow md:rounded-[2rem]">
        <SmoothLoopVideo src={heroVideoUrl} />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/85" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(143,232,210,0.20),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.55)]" />

        <nav className="absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 rounded-b-2xl border-x border-b border-white/[0.06] bg-black/85 px-5 py-2.5 backdrop-blur-md md:block md:rounded-b-3xl md:px-9 md:py-3">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="whitespace-nowrap text-[10px] transition-colors hover:text-[#E1E0CC] sm:text-xs md:text-sm"
                style={{ color: "rgba(225, 224, 204, 0.75)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-black/70 backdrop-blur-md md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-primary transition-all duration-300 ${
                menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>

        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="px-8 py-3 text-3xl font-medium text-primary/80 transition-colors hover:text-[#E1E0CC]"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6 sm:px-8 sm:pb-9 md:px-10 md:pb-12 lg:pb-14">
          <div className="max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-primary/75 sm:mb-4 md:mb-5">
              <span>DSCG</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>Automatisations IA · Webapps métier</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>PME et dirigeants</span>
            </div>

            <h1
              className="text-[11vw] font-medium leading-[0.83] text-[#E1E0CC] sm:text-[10vw] md:text-[9vw] lg:text-[7.6vw] xl:text-[7vw]"
              aria-label="Jonathan Darmouni"
            >
              <WordsPullUp text="Jonathan Darmouni" stable />
            </h1>

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl text-balance text-sm leading-tight text-primary/80 sm:mt-5 sm:text-lg md:mt-6 md:text-xl"
            >
              J'automatise vos process métier avec des webapps IA simples à
              utiliser.
            </motion.p>

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex flex-wrap gap-3 sm:mt-6"
            >
              <CTAButton href={calendarUrl}>Prendre un appel</CTAButton>
              <CTAButton
                href="#realisations"
                variant="ghost"
                className="hidden sm:inline-flex"
              >
                Voir les réalisations
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const credentials = [
    { value: "Développement", label: "Sites web, webapps et applications" },
    { value: "Automatisation", label: "n8n · Trigger.dev · workflows" },
    { value: "IA appliquée", label: "Agents IA, extraction, rédaction" },
    { value: "Gestion & finance", label: "Formation DSCG" },
  ];

  return (
    <section id="profil" className="relative bg-black px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex items-center gap-4 md:mb-20"
        >
          <span className="h-px w-10 bg-accent/70" />
          <span className="text-xs font-bold uppercase tracking-[0.26em] text-accent">
            Profil
          </span>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:items-center">
          <div>
            <WordsPullUpMultiStyle
              justify="start"
              className="text-3xl leading-[1.03] text-[#E1E0CC] sm:text-4xl md:text-5xl lg:text-[3.3rem]"
              segments={[
                { text: "Je construis des outils qui parlent", className: "" },
                {
                  text: "le langage du métier,",
                  className: "font-light text-primary/60",
                },
                { text: "pas seulement celui de la tech.", className: "" },
              ]}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-12"
            >
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-primary/55">
                Compétences
              </p>
              <div className="grid grid-cols-2 gap-2.5">
              {credentials.map((c) => (
                <div
                  key={c.value}
                  className="rounded-2xl border border-primary/[0.14] bg-gradient-to-b from-[#181818] to-[#0f0f0f] p-4 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30"
                >
                  <p className="text-base font-semibold leading-tight text-[#E1E0CC] sm:text-lg">
                    {c.value}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-primary/65">{c.label}</p>
                </div>
              ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="flex flex-col gap-5"
          >
            <p className="text-base leading-relaxed text-primary/75">
              Mon avantage, c'est la combinaison : une formation DSCG pour
              comprendre vos enjeux de gestion, et les compétences techniques
              pour automatiser de A à Z : workflows, agents IA, webapps métier.
            </p>
            <p className="text-base leading-relaxed text-primary/75">
              Je ne vends pas des automatisations IA compliquées, mais de vraies
              solutions concrètes et faciles à prendre en main par vos équipes
              métier, avec une interface aux couleurs de votre entreprise.
            </p>
            <p className="text-base leading-relaxed text-primary/75">
              Je comprends vos process avant de les toucher. Le résultat : des
              systèmes utiles, que vos équipes peuvent réellement utiliser.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function OfferStep({
  step,
  index,
}: {
  step: OfferStepData;
  index: number;
}) {
  const Icon = step.icon;
  const isLast = index === offerSteps.length - 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="flex items-center">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/25 bg-[#0c1a16] text-accent">
          <Icon size={17} />
        </span>
        {!isLast && (
          <span className="mx-3 hidden h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent lg:block" />
        )}
      </div>

      <span className="mt-7 block select-none text-[3.5rem] font-bold leading-none text-primary/[0.22] tabular-nums">
        {step.eyebrow}
      </span>

      <h3 className="mt-1 text-xl font-medium leading-snug text-[#E1E0CC]">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-primary/60">{step.body}</p>
    </motion.article>
  );
}

function Offer() {
  return (
    <section id="methode" className="relative bg-black px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex items-center gap-4 md:mb-20"
        >
          <span className="h-px w-10 bg-accent/70" />
          <span className="text-xs font-bold uppercase tracking-[0.26em] text-accent">
            Méthode
          </span>
        </motion.div>

        <div className="mb-16 grid gap-10 lg:mb-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <WordsPullUpMultiStyle
            justify="start"
            className="text-3xl leading-[1.03] text-[#E1E0CC] sm:text-4xl md:text-5xl"
            segments={[
              { text: "Une méthode simple :", className: "" },
              {
                text: "audit, automation, interface.",
                className: "text-primary/60",
              },
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm leading-relaxed text-primary/75 md:text-base"
          >
            Je transforme une friction opérationnelle en système clair : une
            logique automatisée, une interface webapp, et des règles adaptées à
            votre activité.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {offerSteps.map((step, index) => (
            <OfferStep key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return { ref, shown };
}

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useRevealOnce<HTMLDivElement>();
  const visible = reduce || shown;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${y}px)`,
        transition: reduce
          ? undefined
          : `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const isFeatured = index === 0;

  if (isFeatured) {
    return (
      <Reveal delay={index * 100} className="md:col-span-2">
      <article
        className="group flex h-full flex-col rounded-2xl border border-primary/[0.14] bg-gradient-to-b from-[#1b1b1b] to-[#121212] p-6 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {study.label}
            </span>
            <h3 className="mt-3 text-4xl leading-none text-[#E1E0CC] sm:text-5xl">
              {study.title}
            </h3>
          </div>
          {study.href && (
            <a
              href={study.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ouvrir ${study.title}`}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-black transition-transform duration-300 hover:scale-110"
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>

        <p className="mt-6 max-w-lg text-sm leading-relaxed text-primary/75">
          {study.solution}
        </p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-primary/[0.14] bg-black px-5 py-4">
            <div>
              <p className="text-2xl font-bold leading-none text-[#E1E0CC]">5,0</p>
              <p className="mt-1 text-xs text-primary/60">9 avis · App Store</p>
            </div>
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-base leading-none">★</span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/[0.14] bg-primary/[0.04] px-3 py-1 text-xs text-primary/75"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
      </Reveal>
    );
  }

  return (
    <Reveal delay={index * 100}>
    <article
      className="group flex h-full flex-col rounded-2xl border border-primary/[0.14] bg-gradient-to-b from-[#191919] to-[#121212] p-5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
          {study.label}
        </span>
        {study.href ? (
          <a
            href={study.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Ouvrir ${study.title}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-black transition-transform duration-300 hover:scale-110"
          >
            <ExternalLink size={14} />
          </a>
        ) : (
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black text-primary/55">
            <Sparkles size={14} />
          </span>
        )}
      </div>

      <h3 className="mt-4 text-2xl leading-snug text-[#E1E0CC]">{study.title}</h3>

      <div className="my-5 h-px bg-primary/[0.14]" />

      <div className="flex flex-col gap-3 text-sm leading-relaxed">
        <p className="text-primary/60">{study.problem}</p>
        <p className="text-primary/90">{study.solution}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-primary/[0.14] px-3 py-1 text-xs text-primary/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
    </Reveal>
  );
}

function CaseStudies() {
  return (
    <section id="realisations" className="bg-black px-4 py-20 sm:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal y={10} className="mb-14 flex items-center gap-4 md:mb-16">
          <span className="h-px w-10 bg-accent/70" />
          <span className="text-xs font-bold uppercase tracking-[0.26em] text-accent">
            Réalisations
          </span>
        </Reveal>

        <div className="mb-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 md:mb-16">
          <Reveal y={20}>
            <h2 className="text-4xl leading-[1.02] text-[#E1E0CC] sm:text-5xl md:text-6xl">
              Des produits livrés,{" "}
              <span className="font-light text-primary/55">
                des workflows utiles,
              </span>{" "}
              des interfaces claires.
            </h2>
          </Reveal>
          <Reveal y={14} delay={150}>
            <p className="text-sm leading-relaxed text-primary/75 md:text-base">
              Chaque projet sert le même objectif : retirer de la friction
              opérationnelle et rendre la technologie facile à utiliser.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.title} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const checks = [
    "Identifier une tâche répétitive à automatiser",
    "Estimer le gain de temps ou de fiabilité",
    "Définir un premier prototype livrable rapidement",
  ];

  return (
    <section id="contact" className="bg-black p-4 sm:p-6">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-primary px-5 py-16 text-black sm:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(circle_at_12%_18%,#8FE8D2,transparent_32%),radial-gradient(circle_at_88%_72%,#ffffff,transparent_28%)]" />

        <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.25fr_0.75fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Play size={11} fill="currentColor" />
              Prochain projet
            </span>
            <h2 className="mt-8 max-w-3xl text-4xl leading-[0.98] sm:text-5xl md:text-[5rem]">
              Parlons d'un process{" "}
              <span className="font-light opacity-55">
                que vous ne voulez plus
              </span>{" "}
              faire à la main.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-black p-6 text-primary"
          >
            <p className="text-sm leading-relaxed text-primary/60">
              Un appel court suffit pour cadrer la mission : problème, outils,
              valeur, niveau d'automatisation et forme de l'interface.
            </p>
            <div className="my-7 space-y-4">
              {checks.map((check, i) => (
                <motion.div
                  key={check}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-black">
                    <Check size={11} />
                  </span>
                  <span className="text-primary/85">{check}</span>
                </motion.div>
              ))}
            </div>
            <CTAButton href={calendarUrl}>Prendre un appel</CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const navItems: [string, string][] = [
    ["Profil", "#profil"],
    ["Méthode", "#methode"],
    ["Réalisations", "#realisations"],
    ["Contact", "#contact"],
  ];

  return (
    <footer className="border-t border-primary/[0.12] bg-black px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <span className="text-xs text-primary/55">
          © {new Date().getFullYear()} Jonathan Darmouni
        </span>
        <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Navigation bas de page">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-xs text-primary/55 transition-colors duration-200 hover:text-primary/75"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-xs text-primary/55 sm:items-end">
          <a
            href={`mailto:${email}`}
            className="transition-colors duration-200 hover:text-primary/75"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="transition-colors duration-200 hover:text-primary/75"
          >
            {phone}
          </a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-black">
        <Hero />
        <About />
        <Offer />
        <CaseStudies />
        <Contact />
        <Footer />
      </main>
    </MotionConfig>
  );
}

export default App;
