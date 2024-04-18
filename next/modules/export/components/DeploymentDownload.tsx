'use client';

import {
  Spinner,
  Tooltip,
} from 'flowbite-react';
import { CSVLink } from 'react-csv';

export default function DeploymentDownload({ deploymentData, fileName }): React.ReactNode {
  return deploymentData ? (
    <div>
      {deploymentData.length > 0 ? (
        <CSVLink
          data={deploymentData}
          filename={fileName}
        >
          <button type="button" className="text-cyan-700 hover:underline">
            deployment_metadata.csv
          </button>
        </CSVLink>
      ) : (
        <Tooltip content="No deployment data available">
          <button type="button" className="text-cyan-700 opacity-50 select-none">
            deployment_metadata.csv
          </button>
        </Tooltip>
      )}
    </div>
  ) : (
    <div className="flex w-full content-center justify-center">
      <Spinner />
    </div>
  );
}
