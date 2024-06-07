import './globals.css';
import './leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

import { ThemeModeScript } from 'flowbite-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><ThemeModeScript mode="light" /></head>
      <body>{children}</body>
    </html>
  );
}
