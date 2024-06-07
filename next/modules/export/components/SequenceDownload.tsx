'use client';

import { Tooltip } from 'flowbite-react';
import { CSVLink } from 'react-csv';

export default function SequenceDownload({ sequenceData, modalError, fileName }): React.ReactNode {
  return (
    <div className="flex flex-col justify-center mb-2 h-4">
      {sequenceData ? (
        <div>
          {sequenceData.length > 0 ? (
            <CSVLink
              data={sequenceData}
              filename={fileName}
            >
              <button type="button" className="text-cyan-700 hover:underline">
                sequence_data.csv
              </button>
            </CSVLink>
          ) : (
            <Tooltip content="No sequences for selected deployments.">
              <button type="button" className="text-cyan-700 opacity-50 select-none">
                sequence_data.csv
              </button>
            </Tooltip>
          )}
        </div>
      ) : (
        <div className="h-full w-full">
          {modalError ? (
            <Tooltip content={modalError}>
              <button type="button" className="text-cyan-700 opacity-50 select-none">
                sequence_data.csv
              </button>
            </Tooltip>
          ) : (
            <div role="status" className="animate-pulse h-full w-full">
              <div className="h-full bg-gray-200 rounded-full w-full" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
