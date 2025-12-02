import React from 'react';
import { Play } from 'lucide-react'; // Import relevant icon

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="flex items-center">
                        <Play className="h-8 w-8 text-red-600" />
                        <h4 className="text-4xl font-bold bg-gradient-to-r from-white to-red-600 bg-clip-text text-transparent ml-2">
                            StreamShare
                        </h4>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-gray-400 text-sm">
                            © 2024 StreamShare. Tous droits réservés.
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            Partagez vos passions, créez des souvenirs.
                        </p>
                    </div>
                </div>

                <hr className="my-4 border-gray-800" />

                <div className="text-center">
                    <p className="text-gray-400 text-sm">
                        Plateforme de streaming communautaire pour le partage privé de contenus audiovisuels.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
