import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * A component that displays a single service card.
 * When clicked, it triggers a callback with the service's specific video URL.
 *
 * @param {object} props - The component props.
 * @param {object} props.service - The service object, containing title, description, icon, gradient, and videoUrl.
 * @param {function} props.onServiceClick - The callback function to execute when the card is clicked.
 */
function ServiceCard({ service, onServiceClick }) {
  // Destructure the service object for easier access
  const { icon, title, description, gradient, videoUrl } = service;

  // Handler to call the parent function with the specific video URL
  const handleClick = () => {
    // Ensure the callback and videoUrl exist before calling
    if (onServiceClick && videoUrl) {
      onServiceClick(videoUrl);
    }
  };

  return (
    <div
      className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      {/* Background hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Service Icon */}
      <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>

      {/* Service Title */}
      <h3 className="relative text-xl font-bold text-gray-900 mb-3">{title}</h3>

      {/* Service Description */}
      <p className="relative text-gray-600 mb-4 leading-relaxed">{description}</p>

      {/* "En savoir plus" link - the click is handled by the parent div */}
      <span className="relative text-red-600 font-semibold flex items-center group-hover:gap-2 transition-all">
        En savoir plus
        <ArrowRight className="w-4 h-4 ml-1" />
      </span>
    </div>
  );
}

export default ServiceCard;
