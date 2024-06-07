'use client';

import { Tooltip } from 'flowbite-react';
import { CSVLink } from 'react-csv';

export default function DeploymentDownload({ deploymentData, fileName }): React.ReactNode {
  return (
    <div className="flex flex-col justify-center mb-2 h-4">
      {deploymentData ? (
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
        <div role="status" className="animate-pulse h-full w-full">
          <div className="h-full bg-gray-200 rounded-full w-full" />
        </div>
      )}
    </div>
  );
}
