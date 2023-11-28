'use client';

import { Spinner } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  FeatureGroup,
  MapContainer,
  TileLayer,
} from 'react-leaflet';

import MarkerCluster from '@/modules/map/components/MarkerCluster';
import EditFilterLayer from '@/modules/map/components/EditFilterLayer';

import GeoFilterMapProps from '@/modules/map/types/GeoFilterMapProps';
import Deployment from '@/common/types/deployment';

export default function GeoFilterMap({
  setFilter,
  apiPath,
  initialBounds,
  setCsvData,
}: GeoFilterMapProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<Deployment[] | null>(null);

  const markersLayer = useRef<any>(null);
  const rectLayer = useRef<any>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      if (apiPath && apiPath.length > 0) {
        setCsvData(null);
        setLoading(true);
        const deployments: Deployment[] = await fetch(apiPath, {
          method: 'GET',
        }).then((res) => res.json());

        setMarkers(deployments);
        setLoading(false);

        if (setCsvData) {
          const csvRows = await fetch('/api/deployments/csv', {
            method: 'POST',
            body: JSON.stringify(deployments.map((point) => point.nid)),
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
        <MarkerCluster
          markers={markers}
          layer={markersLayer}
          setLayer={(layer) => { markersLayer.current = layer; }}
        />
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
