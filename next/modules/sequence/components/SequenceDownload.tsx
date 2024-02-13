'use client';

import { Spinner } from 'flowbite-react';

export default function SequenceDownload({ sequenceData }): React.ReactNode {
  return sequenceData ? (
    <>{`You are about to download ${sequenceData.length} sequence data records. Are you sure you would like to proceed?`}</>
  ) : (
    <div className="flex w-full h-full content-center justify-center">
      <Spinner />
    </div>
  );
}
