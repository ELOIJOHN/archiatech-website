import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SEOOptimizer = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ArchiAtech",
    "description": "Solutions d'intelligence artificielle et d'automatisation pour transformer votre entreprise",
    "url": "https://www.archiatech.com",
    "logo": "https://www.archiatech.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-7-83-82-93-10",
      "contactType": "customer service",
      "email": "contact@archiatech.com",
      "availableLanguage": ["French", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "sameAs": [
      "https://www.linkedin.com/company/archiatech",
      "https://twitter.com/archiatech"
    ],
    "services": [
      {
        "@type": "Service",
        "name": "Automatisation des Workflows",
        "description": "RPA, connecteurs API, et solutions no-code pour optimiser vos processus métiers",
        "provider": {
          "@type": "Organization",
          "name": "ArchiAtech"
        }
      },
      {
        "@type": "Service", 
        "name": "Conseil & Intégration IA",
        "description": "Solutions d'intelligence artificielle sur mesure pour votre entreprise",
        "provider": {
          "@type": "Organization",
          "name": "ArchiAtech"
        }
      },
      {
        "@type": "Service",
        "name": "Support & Déploiement IT",
        "description": "Installation, configuration et déploiement de postes de travail",
        "provider": {
          "@type": "Organization",
          "name": "ArchiAtech"
        }
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte l'automatisation des processus ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos solutions d'automatisation commencent à partir de 2000€/mois pour les petites entreprises et s'adaptent selon vos besoins spécifiques. Nous proposons des devis personnalisés pour chaque projet."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps faut-il pour voir des résultats ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les premiers résultats sont généralement visibles dès les 2-4 premières semaines. Le ROI complet est généralement atteint en 3-6 mois selon la complexité du projet."
        }
      },
      {
        "@type": "Question",
        "name": "Proposez-vous une garantie sur vos solutions ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nous garantissons 99.9% de disponibilité de nos solutions et offrons un support technique 24/7. Nous nous engageons également sur le ROI de nos solutions."
        }
      },
      {
        "@type": "Question",
        "name": "Vos solutions sont-elles compatibles avec nos systèmes existants ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument ! Nous nous adaptons à tous les systèmes existants et créons des connecteurs personnalisés si nécessaire. L'intégration se fait sans interruption de service."
        }
      }
    ]
  };

  useEffect(() => {
    // Add structured data to page
    const addStructuredData = (data, type) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      script.id = `structured-data-${type}`;
      document.head.appendChild(script);
    };

    addStructuredData(structuredData, 'organization');
    addStructuredData(faqData, 'faq');

    // Track page views for analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('[id^="structured-data-"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <Helmet>
      {/* Meta Tags Optimisés */}
      <title>ArchiAtech - Solutions IA & Automatisation | Transformez votre entreprise</title>
      <meta name="description" content="ArchiAtech révolutionne votre entreprise avec l'IA et l'automatisation. RPA, connecteurs API, solutions no-code. ROI garanti en 3-6 mois. Contactez-nous !" />
      <meta name="keywords" content="automatisation, intelligence artificielle, RPA, IA, no-code, low-code, workflow, processus métier, transformation digitale, ArchiAtech" />
      
      {/* Open Graph */}
      <meta property="og:title" content="ArchiAtech - Solutions IA & Automatisation" />
      <meta property="og:description" content="Transformez votre entreprise avec nos solutions d'IA et d'automatisation. ROI garanti, support 24/7. Démonstration gratuite !" />
      <meta property="og:image" content="https://www.archiatech.com/images/og-image.jpg" />
      <meta property="og:url" content="https://www.archiatech.com" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ArchiAtech" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="ArchiAtech - Solutions IA & Automatisation" />
      <meta name="twitter:description" content="Transformez votre entreprise avec l'IA et l'automatisation. ROI garanti, support 24/7." />
      <meta name="twitter:image" content="https://www.archiatech.com/images/twitter-card.jpg" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://www.archiatech.com" />
      
      {/* Language */}
      <html lang="fr" />
      
      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />
      
      {/* Business Hours */}
      <meta name="business:contact_data:street_address" content="France" />
      <meta name="business:contact_data:locality" content="France" />
      <meta name="business:contact_data:country_name" content="France" />
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />
      
      {/* Additional SEO */}
      <meta name="author" content="ArchiAtech" />
      <meta name="publisher" content="ArchiAtech" />
      <meta name="copyright" content="© 2025 ArchiAtech. Tous droits réservés." />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ArchiAtech" />
      
      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default SEOOptimizer;
