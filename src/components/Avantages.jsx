import { motion as Motion } from "framer-motion";
import { Target, Workflow, ShieldCheck, Users, MapPin, FileText } from "lucide-react";

export default function Avantages() {
  const avantages = [
    { icon: Target, titre: "Un besoin avant un outil", texte: "Nous partons de vos tâches répétitives réelles, pas d'une technologie imposée." },
    { icon: Workflow, titre: "IA et no-code, sans jargon", texte: "Automatisations n8n, agents IA, tableaux de bord : simples à utiliser et à faire évoluer." },
    { icon: ShieldCheck, titre: "Données maîtrisées", texte: "Le RGPD et l'hébergement des données sont pris en compte dès le départ." },
    { icon: Users, titre: "Accompagnement de A à Z", texte: "Audit, mise en place, prise en main de vos équipes et suivi." },
    { icon: MapPin, titre: "Proche de vous", texte: "Monaco et France : un interlocuteur unique qui connaît votre contexte." },
    { icon: FileText, titre: "Un devis clair", texte: "Périmètre et livrables écrits avant de démarrer, sans engagement." }
  ];

  const engagements = [
    { value: "Gratuit", label: "Audit de départ" },
    { value: "24 h", label: "Retour ouvré à votre demande" },
    { value: "Sur devis", label: "Sans engagement" },
    { value: "Monaco & France", label: "Zone d'intervention" }
  ];

  return (
    <section id="avantages" className="py-12 sm:py-16 md:py-24 bg-white font-inter scroll-mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 lg:px-8">
        {/* Bloc gauche - Avantages */}
        <Motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
            Nos avantages
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Pourquoi ArchiAtech ?</h2>
          <ul className="space-y-4 sm:space-y-6">
            {avantages.map((item, i) => (
              <Motion.li
                key={item.titre}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E60023] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{item.titre}</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.texte}</p>
                </div>
              </Motion.li>
            ))}
          </ul>
        </Motion.div>

        {/* Bloc droit - Statistiques avec fond rouge */}
        <Motion.div
          className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl"></div>
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Commencez par un audit gratuit</h3>
            <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Nous identifions avec vous les tâches à automatiser en priorité et vous repartez avec des pistes concrètes, sans engagement.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {engagements.map((stat, i) => (
                <Motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-white">{stat.value}</div>
                  <div className="text-white/80 text-xs sm:text-sm">{stat.label}</div>
                </Motion.div>
              ))}
            </div>
            <a
              href="/contact/?objet=audit#formulaire"
              className="mt-6 sm:mt-8 inline-flex w-full sm:w-auto justify-center items-center rounded-lg bg-white px-6 py-3 font-semibold text-[#E60023] shadow hover:bg-gray-50 transition"
            >
              Réserver mon audit gratuit
            </a>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}