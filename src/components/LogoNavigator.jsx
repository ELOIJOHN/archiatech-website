import React, { useCallback, useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Logo flottant, toujours visible : cliquer sur le logo remonte en haut de la page,
// les flèches passent à la section précédente ou suivante.
function sections() {
  return Array.from(document.querySelectorAll('main section')).filter((s) => !s.parentElement.closest('main section'));
}

export default function LogoNavigator() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 80);
      setAtBottom(window.innerHeight + y >= document.documentElement.scrollHeight - 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const go = useCallback((dir) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reduce ? 'auto' : 'smooth';
    const list = sections();
    let target = null;
    if (dir > 0) target = list.find((s) => s.getBoundingClientRect().top > 60);
    else target = [...list].reverse().find((s) => s.getBoundingClientRect().top < -24);
    if (target) {
      const nav = 72;
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - (target.id === 'hero' ? 0 : nav - 24)), behavior });
    } else {
      window.scrollBy({ top: dir * Math.round(window.innerHeight * 0.85), behavior });
    }
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });

  const btn = 'flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors';

  return (
    <div
      className="fixed left-3 sm:left-5 z-40 flex items-center gap-1 rounded-full border border-[#F70D1A]/50 bg-black/75 backdrop-blur-md pl-4 pr-1.5 py-1.5 shadow-[0_0_18px_rgba(247,13,26,0.35)]"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      role="navigation"
      aria-label="Navigation dans la page"
    >
      <button type="button" onClick={toTop} aria-label="Remonter en haut de la page" className="mr-1 flex items-center">
        <img src="/images/logo-horizontal-white.png" alt="" width="889" height="160" className="h-5 sm:h-6 w-auto select-none" draggable="false" />
      </button>
      <button type="button" onClick={() => go(-1)} disabled={atTop} aria-label="Section précédente" className={btn}>
        <ChevronUp className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => go(1)} disabled={atBottom} aria-label="Section suivante" className={btn}>
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
