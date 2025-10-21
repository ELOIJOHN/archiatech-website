import React from 'react';
import { blogPosts } from '../data/blog';
import { ArrowRight } from 'lucide-react';

export default function BlogSection() {
  return (
    <section id="blog" className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="text-[#E60023] font-semibold text-xs sm:text-sm uppercase tracking-wider">Notre Blog</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 sm:mt-3 mb-3 sm:mb-4">Actualités & Analyses</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Suivez nos dernières publications sur l'IA, l'automatisation et la transformation digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.slug} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
              <div className="p-6 flex-grow">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{post.description}</p>
              </div>
              <div className="p-6 bg-gray-50">
                <a href={`/blog/${post.slug}`} className="font-semibold text-[#E60023] hover:text-red-700 flex items-center">
                  Lire la suite <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
