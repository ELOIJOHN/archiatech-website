import React, { useState } from 'react';
import YouTubeSync from './YouTubeSync';
import VideoManager from './VideoManager';
import VideoDatabaseTest from './VideoDatabaseTest';
import { Settings, Database, RefreshCw, TestTube } from 'lucide-react';

const VideoAdmin = () => {
  const [activeTab, setActiveTab] = useState('sync');

  const tabs = [
    {
      id: 'sync',
      label: 'Synchronisation YouTube',
      icon: RefreshCw,
      component: YouTubeSync,
      description: 'Synchroniser avec votre chaîne YouTube'
    },
    {
      id: 'manage',
      label: 'Gestion des Vidéos',
      icon: Database,
      component: VideoManager,
      description: 'Gérer votre base de données vidéos'
    },
    {
      id: 'test',
      label: 'Tests & Diagnostic',
      icon: TestTube,
      component: VideoDatabaseTest,
      description: 'Tester et diagnostiquer le système'
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#E60023] rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Administration Vidéos</h1>
              <p className="text-gray-600">Gérez votre base de données vidéos @ArchiatechMedia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-[#E60023] text-[#E60023]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description de l'onglet actif */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            <strong>{tabs.find(tab => tab.id === activeTab)?.label} :</strong>{' '}
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Composant actif */}
        {ActiveComponent && <ActiveComponent />}
      </div>

      {/* Pied de page avec informations */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Chaîne YouTube</h3>
              <p>@ArchiatechMedia</p>
              <p>ID: UCtwJ6pMNI5QndQGeJWwkvYA</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Base de données</h3>
              <p>Fichier: videos-database.json</p>
              <p>Format: JSON structuré</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">API</h3>
              <p>YouTube Data v3</p>
              <p>Synchronisation automatique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAdmin;
