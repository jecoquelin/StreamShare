import React from 'react';
import { ArrowRight, Heart, History, Star, Group } from 'lucide-react'; // Import relevant icon


interface BenefitsProps {
    onSignUpClick: () => void;
}

const benefits = [
    {
        icon: Heart,
        title: 'Favoris personnalisés',
        description: 'Sauvegardez vos contenus préférés pour un accès rapide.'
    },
    {
        icon: History,
        title: 'Historique de visionnage',
        description: 'Reprenez là où vous vous êtes arrêté, sur tous vos appareils.'
    },
    {
        icon: Star,
        title: 'Recommandations avancées',
        description: 'Obtenez des suggestions personnalisées basées sur vos goûts.'
    },
    {
        icon: Group,
        title: 'Communauté privée',
        description: 'Créez des groupes avec vos amis et famille pour partager facilement.'
    }
];

const Benefits: React.FC<BenefitsProps> = ({ onSignUpClick }) => {
    return (
        <section className="py-10 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto">
                <div className="text-center mb-8 fade-in">
                    <h2 className="text-4xl font-bold mb-3">
                        Pourquoi créer un compte ?
                    </h2>
                    <p className="text-lg text-gray-400 max-w-lg mx-auto">
                        Débloquez toutes les fonctionnalités et profitez d&apos;une expérience personnalisée.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="transform transition-transform duration-300 ease-in-out hover:-translate-y-1">
                            <div className="flex p-6 rounded-lg bg-gray-700 shadow-lg hover:bg-gray-600">
                                <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-full">
                                    <benefit.icon className="h-10 w-10 text-white" />
                                </div>
                                <div className="ml-4">
                                    <h4 className="text-xl font-semibold text-white">{benefit.title}</h4>
                                    <p className="text-gray-300">{benefit.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        className="flex items-center justify-center h-12 px-6 text-lg font-semibold text-white bg-red-600 rounded-lg transition-transform duration-300 hover:transform hover:scale-105"
                        onClick={onSignUpClick}
                    >
                        Créer mon compte gratuit
                        <ArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
