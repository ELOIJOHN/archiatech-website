import { motion as Motion } from "framer-motion";
import { Shield, Heart, Leaf } from "lucide-react";

const pilliers = [
  {
    icon: Shield,
    label: "Souverain",
    emoji: "🔒",
    title: "Vos données restent chez vous",
    description:
      "Déployement on-premise ou cloud privé. Aucune donnée ne quitte votre infrastructure. Vous restez maître de vos actifs numériques.",
    color: "#00C896",
  },
  {
    icon: Heart,
    label: "Responsable",
    emoji: "🤝",
    title: "IA éthique et transparente",
    description:
      "Nos modèles sont auditables, explicables et conformes RGPD. Nous construisons une IA que vous pouvez expliquer à vos clients.",
    color: "#0EA5E9",
  },
  {
    icon: Leaf,
    label: "Green",
    emoji: "🌱",
    title: "Infrastructure à faible empreinte carbone",
    description:
      "Optimisation énergétique des workloads, hébergement éco-responsable et architecture frugale. L'IA performante ne doit pas coûter la planète.",
    color: "#22C55E",
  },
];

export default function PilliersSection() {
  return (
    <section
      id="pilliers"
      className="py-16 sm:py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, #0A0A0A 0%, #111827 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span
            className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 px-4 py-1 rounded-full"
            style={{ color: "#00C896", background: "rgba(0,200,150,0.12)", border: "1px solid rgba(0,200,150,0.3)" }}
          >
            Notre ADN
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            L&apos;IA souveraine,{" "}
            <span style={{ color: "#00C896" }}>responsable</span> et durable.
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            ArchiaTech construit l&apos;IA de demain — Souverain, Responsable, Green.
          </p>
        </Motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pilliers.map((p, i) => (
            <Motion.div
              key={p.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-8 flex flex-col gap-4 group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${p.color}33`,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              whileHover={{
                borderColor: p.color,
                boxShadow: `0 0 32px ${p.color}33`,
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-2"
                style={{ background: `${p.color}1A`, color: p.color }}
              >
                <p.icon size={28} strokeWidth={1.8} />
              </div>

              {/* Badge */}
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: p.color }}
              >
                {p.emoji} {p.label}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-snug">{p.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
            </Motion.div>
          ))}
        </div>

        {/* CTA */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #00C896, #00A87A)",
              boxShadow: "0 4px 24px rgba(0,200,150,0.35)",
            }}
          >
            Démarrer avec ArchiaTech →
          </a>
        </Motion.div>
      </div>
    </section>
  );
}
