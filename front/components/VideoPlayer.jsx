"use client"

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const video = videoRef.current;
        if (!video) return;

        let hls;

        if (Hls.isSupported()) {
            hls = new Hls({
                debug: true,
                xhrSetup: function(xhr) {
                    // Pour aider au débogage
                    xhr.withCredentials = false;
                }
            });

            const manifestUrl = 'http://localhost:8080/test.m3u8';

            hls.loadSource(manifestUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log("Manifest chargé avec succès!");
                video.play().catch(e => console.log('Erreur de lecture:', e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.log('HLS error:', data);
                if (data.fatal) {
                    setError(`Erreur fatale: ${data.details}`);

                    // Tentative de récupération automatique pour les erreurs réseau
                    if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                        console.log('Tentative de récupération après erreur réseau...');
                        hls.startLoad();
                    }
                }
            });
        } else {
            setError("HLS n'est pas supporté par votre navigateur");
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    return (
        <div>
            <video
                ref={videoRef}
                controls
                style={{ width: '100%', maxWidth: '800px' }}
            />

            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
        </div>
    );
}