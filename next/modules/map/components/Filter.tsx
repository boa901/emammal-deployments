'use client';

import React, { useEffect, useState } from 'react';

import ProjectSpecies from '@/common/types/projectSpecies';

export default function Filter({ projectId }: { projectId: string }): React.ReactNode {
  const [options, setOptions] = useState<ProjectSpecies[]>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      const species: ProjectSpecies[] = await fetch(`/api/projects/${projectId}/species`, {
        method: 'GET',
      }).then((res) => res.json());
      setOptions(species);
    };
    fetchOptions();
  }, []);

  return options ? (
    <div className="flex flex-row items-center">
      <div className="mx-4">
        Species
      </div>
      <div className="mx-4">
        <select multiple id="species-select">
          {
            options.map((optionData: { species: string, count: number }) => (
              <option
                value={optionData.species}
                key={optionData.species}
              >
                {optionData.species}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
