'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

export default function Filter({ projectId }: { projectId: string }): React.ReactNode {
  const router = useRouter();

  const [filterSpecies, setFilterSpecies] = useState<string[]>([]);

  const filterOptions = (
    inputValue: string, speciesOptions: { value: string, label: string }[],
  ) => (
    speciesOptions.filter((speciesOption) => (
      speciesOption.label.toLowerCase().includes(inputValue.toLowerCase())
    ))
  );

  const promiseOptions = (inputValue: string) => (
    new Promise<{ value: string, label: string }[]>((resolve) => {
      const fetcher = async () => {
        const species = await fetch(`/api/projects/${projectId}/species`, {
          method: 'GET',
        }).then((res) => res.json());

        const speciesOptions = species.map((speciesObj) => (
          { value: speciesObj.species, label: speciesObj.name }
        ));

        resolve(filterOptions(inputValue, speciesOptions));
      };
      fetcher();
    }));

  const onSelectChange = (selectedOptions) => {
    const values = selectedOptions.map((selectedOption) => selectedOption.value);
    setFilterSpecies(values);
  };

  const onSubmit = () => {
    if (filterSpecies.length > 0) {
      router.push(`/projects/${projectId}?species=${JSON.stringify(filterSpecies)}`);
    } else {
      router.push(`/projects/${projectId}`);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <div className="mx-4">
        Species
      </div>
      <div className="mx-4">
        <AsyncSelect
          defaultOptions
          cacheOptions
          loadOptions={promiseOptions}
          isMulti
          onChange={onSelectChange}
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        />
      </div>
      <div className="mx-4">
        <button type="button" onClick={onSubmit}>Search</button>
      </div>
    </div>
  );
}
