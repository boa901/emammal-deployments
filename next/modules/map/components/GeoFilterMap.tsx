'use client';

import { Spinner } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  FeatureGroup,
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import EditFilterLayer from '@/modules/map/components/EditFilterLayer';

import GeoFilterMapProps from '@/modules/map/types/GeoFilterMapProps';

export default function GeoFilterMap({
  setFilter,
  apiPath,
  mapping,
  initialBounds,
  setCsvData,
}: GeoFilterMapProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<React.ReactNode[] | null>(null);

  const rectLayer = useRef<any>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      if (apiPath && apiPath.length > 0) {
        setCsvData(null);
        setLoading(true);
        const points: any[] = await fetch(apiPath, {
          method: 'GET',
        }).then((res) => res.json());

        const markerComponents: React.ReactNode[] = points.map(mapping);
        setMarkers(markerComponents);
        setLoading(false);

        if (setCsvData) {
          const csvRows = await fetch('/api/deployments/csv', {
            method: 'POST',
            body: JSON.stringify(points.map((point) => point.nid)),
          }).then((res) => res.json());
          setCsvData(csvRows);
        }
      }
    };

    fetchPoints();
  }, [apiPath]);

  const handleMapReady = () => {
    if (initialBounds && Object.keys(initialBounds).length > 0) {
      const {
        maxLat,
        minLat,
        maxLng,
        minLng,
      } = initialBounds;
      rectLayer.current = L.rectangle(L.latLngBounds([
        parseFloat(minLat), parseFloat(minLng),
      ], [
        parseFloat(maxLat), parseFloat(maxLng),
      ]), {
        color: '#3388ff',
        opacity: 0.5,
        fillColor: '#3388ff',
        fillOpacity: 0.2,
      });
    }
  };

  return (
    <div>
      <MapContainer
        center={[0, 0]}
        zoom={2.25}
        scrollWheelZoom
        whenReady={handleMapReady}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers}
        </MarkerClusterGroup>
        <FeatureGroup>
          <EditFilterLayer
            setFilter={setFilter}
            layer={rectLayer}
            setLayer={(layer) => {
              rectLayer.current = layer;
            }}
          />
        </FeatureGroup>
      </MapContainer>
      {loading && (
        <div className="absolute bg-gray-400 opacity-50 inset-0 flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      )}
    </div>
  );
}
