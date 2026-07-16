import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rosario & Ignacio',
    short_name: 'Rosario & Ignacio',
    description: 'Invitación premium para el matrimonio de Rosario Vial y José Ignacio Ibieta.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6efe7',
    theme_color: '#b8a37c',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
