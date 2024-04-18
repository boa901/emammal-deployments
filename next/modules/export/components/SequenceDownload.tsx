'use client';

import {
  Spinner,
  Tooltip,
} from 'flowbite-react';
import { CSVLink } from 'react-csv';

export default function SequenceDownload({ sequenceData, modalError, fileName }): React.ReactNode {
  return sequenceData ? (
    <div>
      {sequenceData.length > 0 ? (
        <CSVLink
          data={sequenceData}
          filename={fileName}
        >
          <button type="button" className="text-cyan-700 hover:underline">
            {`${fileName}.csv`}
          </button>
        </CSVLink>
      ) : (
        <Tooltip content="No sequences for selected deployments.">
          <button type="button" className="text-cyan-700 opacity-50 select-none">
            {`${fileName}.csv`}
          </button>
        </Tooltip>
      )}
    </div>
  ) : (
    <div>
      {modalError ? (
        <Tooltip content={modalError}>
          <button type="button" className="text-cyan-700 opacity-50 select-none">
            {`${fileName}.csv`}
          </button>
        </Tooltip>
      ) : (
        <div className="flex w-full content-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
