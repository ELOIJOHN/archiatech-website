import { motion as Motion, useReducedMotion } from "framer-motion";
import { Shield, Heart, Leaf, Lock, ArrowRight } from "lucide-react";

// Une idée, une phrase par engagement : le détail est sur la page « IA souveraine ».
const pilliers = [
  {
    icon: Shield,
    label: "Souverain",
    title: "Vos données, votre hébergement.",
    description: "Local, cloud privé ou européen : vous choisissez.",
    color: "#00C896",
  },
  {
    icon: Lock,
    label: "Sécurisé",
    title: "Protégé dès la conception.",
    description: "Accès limités, secrets jamais exposés, journal des automatisations.",
    color: "#F59E0B",
  },
  {
    icon: Heart,
    label: "Responsable",
    title: "Une IA encadrée.",
    description: "RGPD, validation humaine, usage expliqué à vos clients.",
    color: "#38BDF8",
  },
  {
    icon: Leaf,
    label: "Durable",
    title: "Une IA sobre.",
    description: "Le bon modèle pour chaque tâche, jamais plus gros que nécessaire.",
    color: "#4ADE80",
  },
];

export default function PilliersSection() {
  const reduce = useReducedMotion();

  return (
    <section id="pilliers" className="bg-black py-20 sm:py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* En-tête */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <img
            src="/images/logo-archiatech-hero.webp"
            alt="ArchiAtech Digital Solutions"
            width="860"
            height="600"
            loading="lazy"
            className="mx-auto w-44 sm:w-60 h-auto mb-6 select-none drop-shadow-[0_0_28px_rgba(230,0,35,0.45)]"
            draggable="false"
          />
          <p className="text-sm sm:text-base font-semibold tracking-wide text-[#ff5a6e]">Notre ADN</p>
          <h2 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-white">
            L&apos;IA qui reste
            <br />
            <span className="text-gray-500">entre vos mains.</span>
          </h2>
        </Motion.div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {pilliers.map((p, i) => (
            <Motion.div
              key={p.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={reduce ? undefined : { scale: 1.015 }}
              className="relative overflow-hidden rounded-[2rem] bg-[#111113] p-8 sm:p-10 min-h-[17rem] sm:min-h-[21rem] flex flex-col justify-between"
            >
              {/* Lueur de couleur dans le coin */}
              <div
                className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ background: p.color }}
                aria-hidden="true"
              />
              <p.icon className="relative h-12 w-12 sm:h-14 sm:w-14" style={{ color: p.color }} strokeWidth={1.4} aria-hidden="true" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: p.color }}>
                  {p.label}
                </p>
                <h3 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-tight leading-tight text-white">{p.title}</h3>
                <p className="mt-3 text-base sm:text-lg text-gray-400 leading-snug max-w-md">{p.description}</p>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Appels à l'action */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <a
            href="/contact/?objet=audit#formulaire"
            className="inline-flex items-center gap-2 rounded-full bg-[#E60023] hover:bg-[#ff1f3f] text-white font-semibold px-8 py-3.5 text-base sm:text-lg transition-colors"
          >
            Audit gratuit <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
          <a
            href="/services/ia-souveraine/"
            className="inline-flex items-center gap-1 text-[#ff5a6e] hover:text-white font-medium text-base sm:text-lg transition-colors"
          >
            Notre approche de l&apos;IA souveraine <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </Motion.div>
      </div>
    </section>
  );
}
