'use client';

import { Button } from 'flowbite-react';
import { useState } from 'react';
import { CSVLink } from 'react-csv';

import MapBarrel from '@/modules/map/components/MapBarrel';
import deploymentMapping from '@/modules/map/utils/deploymentMapping';

export default function Page({ searchParams }: { searchParams }) {
  const [csvData, setCsvData] = useState([]);

  return (
    <div className="container w-3/4 mx-auto flex flex-col justify-center items-center">
      <MapBarrel
        apiPath={`/api/deployments?${new URLSearchParams(searchParams).toString()}`}
        mapping={deploymentMapping}
        setCsvData={setCsvData}
      />
      {csvData && csvData.length > 0 ? (
        <CSVLink
          data={csvData}
          filename={`deployment_metadata_${new Date().toISOString().replaceAll(/[^0-9]/g, '')}`}
        >
          <Button>
            Download Deployment Data
          </Button>
        </CSVLink>
      ) : (
        <Button isProcessing>
          Download Deployment Data
        </Button>
      )}
    </div>
  );
}
