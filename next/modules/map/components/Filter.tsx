'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import ProjectSpecies from '@/common/types/projectSpecies';

export default function Filter({ projectId }: { projectId: string }): React.ReactNode {
  const router = useRouter();

  const [options, setOptions] = useState<ProjectSpecies[]>(null);
  const [filterSpecies, setFilterSpecies] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const species: ProjectSpecies[] = await fetch(`/api/projects/${projectId}/species`, {
        method: 'GET',
      }).then((res) => res.json());
      setOptions(species);
    };
    fetchOptions();
  }, []);

  const onSelectChange = (event) => {
    const selectOptions = event.target.childNodes;
    const values = [];
    selectOptions.forEach((selectOption) => {
      if (selectOption.selected) {
        values.push(selectOption.value);
      }
    });
    setFilterSpecies(values);
  };

  const onSubmit = () => {
    if (filterSpecies.length > 0) {
      router.push(`/projects/${projectId}?species=${JSON.stringify(filterSpecies)}`);
    } else {
      router.push(`/projects/${projectId}`);
    }
  };

  return options ? (
    <div className="flex flex-row items-center">
      <div className="mx-4">
        Species
      </div>
      <div className="mx-4">
        <select
          multiple
          onChange={onSelectChange}
        >
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
      <div className="mx-4">
        <button type="button" onClick={onSubmit}>Search</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
