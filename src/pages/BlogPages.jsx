import React from 'react';
import PageShell, { CtaButton } from './PageShell';
import { blogPosts, getPost } from '../data/blog-posts';

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export function BlogIndex() {
  return (
    <PageShell
      eyebrow="Blog"
      title="Le blog ArchiAtech"
      intro="Conseils pratiques sur l'IA souveraine, l'automatisation et le support IT pour les PME."
    >
      <ul className="space-y-8">
        {blogPosts.map((p) => (
          <li key={p.slug} className="border-b border-gray-100 pb-8">
            <p className="text-sm text-gray-500 mb-1">
              {formatDate(p.date)} · {p.readingTime} de lecture
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <a href={`/blog/${p.slug}/`} className="hover:text-[#F70D1A]">{p.title}</a>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">{p.description}</p>
            <a href={`/blog/${p.slug}/`} className="text-[#F70D1A] font-medium hover:underline">
              Lire l'article
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}

export function BlogArticle({ slug }) {
  const post = getPost(slug);
  if (!post) return null;
  const others = blogPosts.filter((p) => p.slug !== slug);
  return (
    <PageShell eyebrow="Blog" title={post.title}>
      <p className="text-sm text-gray-500 -mt-2 mb-8">
        {formatDate(post.date)} · {post.readingTime} de lecture · Par ArchiAtech
      </p>
      {post.blocks.map((b, i) => {
        if (b.h2) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-3">{b.h2}</h2>;
        if (b.ul)
          return (
            <ul key={i} className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed mb-4">
              {b.ul.map((li) => <li key={li}>{li}</li>)}
            </ul>
          );
        return <p key={i} className="text-gray-700 leading-relaxed mb-4">{b.p}</p>;
      })}
      <div className="mt-10 mb-12">
        <CtaButton>Parlons de votre projet</CtaButton>
      </div>
      {others.length > 0 && (
        <>
          <h2 className="text-xl font-bold text-gray-900 mb-3">À lire aussi</h2>
          <ul className="space-y-2">
            {others.map((p) => (
              <li key={p.slug}>
                <a href={`/blog/${p.slug}/`} className="text-[#F70D1A] hover:underline font-medium">{p.title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </PageShell>
  );
}
