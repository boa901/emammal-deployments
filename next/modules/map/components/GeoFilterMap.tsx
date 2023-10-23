/* eslint-disable no-underscore-dangle */

'use client';

import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  FeatureGroup,
  MapContainer,
  Rectangle,
  TileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';

import getLatLngs from '@/modules/map/utils/getLatLngs';
import GeoFilterMapProps from '@/modules/map/types/GeoFilterMapProps';

export default function GeoFilterMap({
  filterBounds,
  setFilter,
  apiPath,
  mapping,
  initialBounds,
}: GeoFilterMapProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      if (apiPath && apiPath.length > 0) {
        setLoading(true);
        const points: any[] = await fetch(apiPath, {
          method: 'GET',
        }).then((res) => res.json());

        const markerComponents: React.ReactNode = points.map(mapping);
        setMarkers(markerComponents);
        setLoading(false);
      }
    };

    fetchPoints();
  }, [apiPath]);

  return (
    <div>
      <MapContainer center={[0, 0]} zoom={2.25} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {markers}
        </MarkerClusterGroup>
        {initialBounds && Object.keys(initialBounds).length > 0
          && filterBounds === initialBounds && (
            <Rectangle
              bounds={[
                [parseFloat(initialBounds.maxLat), parseFloat(initialBounds.minLng)],
                [parseFloat(initialBounds.minLat), parseFloat(initialBounds.maxLng)],
              ]}
              color="#3388ff"
              opacity={0.5}
              fillColor="#3388ff"
              fillOpacity={0.2}
            />
        )}
        <FeatureGroup>
          <EditControl
            position="topleft"
            draw={{
              circle: false,
              polygon: false,
              polyline: false,
              marker: false,
              circlemarker: false,
            }}
            onCreated={(e) => {
              setFilter(getLatLngs(e.layer._bounds));
            }}
            onDeleted={() => {
              setFilter(null);
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
