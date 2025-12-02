import React from 'react';
import { Shield, Link, Search, Bot } from 'lucide-react';
import { Typography } from '@/views/components/ui/Typography';
import { CardContent } from '@/views/components/ui/Card';
import { Card } from '@/views/components/ui/Card';

const features = [
    {
        icon: Shield,
        title: 'Streaming Privé',
        description: 'Partagez en toute sécurité avec vos proches grâce à nos liens privés et chiffrés.',
    },
    {
        icon: Link,
        title: 'Liens Éphémères',
        description: 'Créez des liens temporaires qui expirent automatiquement pour une sécurité optimale.',
    },
    {
        icon: Search,
        title: 'Recherche Rapide',
        description: 'Trouvez instantanément vos films et séries grâce à notre moteur de recherche avancé.',
    },
    {
        icon: Bot,
        title: 'Recommandations IA',
        description: 'Découvrez de nouveaux contenus grâce à nos recommandations personnalisées (bientôt disponible).',
    },
];

const Features: React.FC = () => {
    return (
        <section className="py-10 bg-gray-900">
            <div className="container mx-auto">
                <div className="text-center mb-8 fade-in">
                    <h2 className="text-4xl font-bold mb-3">
                        Pourquoi choisir StreamShare ?
                    </h2>
                    <p className="text-lg text-gray-400 max-w-lg mx-auto">
                        Une plateforme conçue pour le partage sécurisé et l'expérience utilisateur optimale.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="transform transition-all duration-300 ease-in-out hover:-translate-y-1">
                            <Card className="h-full text-center p-6 bg-gray-800 shadow-md hover:shadow-lg">
                                <CardContent>
                                    <div className="flex justify-center items-center mb-4">
                                        <feature.icon className="h-16 w-16 text-red-600" />
                                    </div>
                                    <Typography variant="h3" className="mb-2 font-semibold text-white">
                                        {feature.title}
                                    </Typography>
                                    <Typography className="text-gray-400">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
