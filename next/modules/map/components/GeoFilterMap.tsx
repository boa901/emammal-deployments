/* eslint-disable no-underscore-dangle */

'use client';

import {
  Button,
  Modal,
  Spinner,
} from 'flowbite-react';
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
  setCsvData,
  limit,
  setLimit,
}: GeoFilterMapProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [markers, setMarkers] = useState<React.ReactNode | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>();

  useEffect(() => {
    const fetchPoints = async () => {
      if (apiPath && apiPath.length > 0) {
        setCsvData(null);
        setLoading(true);
        const points: any[] = await fetch(apiPath, {
          method: 'GET',
        }).then((res) => res.json()).then((json) => {
          if (limit && limit > 0) {
            setTotalResults(json.length);
            const limitedResults = json.slice(0, limit);
            if (limitedResults.length === limit) {
              setModalOpen(true);
            }
            return json.slice(0, limit);
          }
          return json;
        });

        const markerComponents: React.ReactNode = points.map(mapping);
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
  }, [apiPath, limit]);

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
      <Modal
        dismissible
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        popup
      >
        <Modal.Header>Results Limited</Modal.Header>
        <Modal.Body>
          <h3>
            {
              `Would you like to load all results? There are ${totalResults} total deployments that
              fit the provided criteria.`
            }
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="gray"
              onClick={() => {
                setModalOpen(false);
                setLimit(-1);
              }}
            >
              Yes
            </Button>
            <Button color="failure" onClick={() => setModalOpen(false)}>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
