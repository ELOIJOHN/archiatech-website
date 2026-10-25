import React from 'react';
import PageShell, { CtaButton } from './PageShell';

export default function NotFoundPage() {
  return (
    <PageShell title="Page introuvable" intro="Cette page n'existe pas ou a été déplacée.">
      <CtaButton href="/">Retour à l'accueil</CtaButton>
    </PageShell>
  );
}
