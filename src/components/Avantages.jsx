import { motion } from "framer-motion";

export default function Avantages() {
  const avantages = [
    "Expertise pointue en IA et No-Code",
    "Accompagnement personnalisé de A à Z",
    "ROI mesurable et rapide",
    "Support technique continu 7j/7",
    "Solutions adaptées aux PME/Startups",
    "Innovation technologique permanente"
  ];

  const stats = [
    { value: "95%", label: "Satisfaction client" },
    { value: "150+", label: "Projets livrés" },
    { value: "40%", label: "Gain de temps" },
    { value: "24/7", label: "Support disponible" }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 lg:px-8">
        {/* Bloc gauche - Avantages */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-4 sm:mb-6">
            Nos avantages
          </h3>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Pourquoi ArchiAtech ?</h2>
          <ul className="space-y-3 sm:space-y-5 text-gray-800 text-base sm:text-lg leading-relaxed">
            {avantages.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start space-x-4 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="group-hover:text-red-600 transition">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Bloc droit - Statistiques avec fond rouge */}
        <motion.div
          className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl sm:rounded-3xl"></div>
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Gagnez jusqu'à 40% de temps</h3>
            <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Nos clients constatent en moyenne une réduction de 40% du temps consacré aux tâches répétitives.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-white">{stat.value}</div>
                  <div className="text-white/80 text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
