'use client';

import AsyncSelect from 'react-select/async';

export default function DeploymentSpeciesFilter(
  { setFilter }: { setFilter: React.Dispatch<React.SetStateAction<string[]>> },
): React.ReactNode {
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
        const species = await fetch('/api/species', {
          method: 'GET',
        }).then((res) => res.json());

        const speciesOptions = species.map((speciesObj) => (
          { value: speciesObj.species, label: speciesObj.species }
        ));

        resolve(filterOptions(inputValue, speciesOptions));
      };
      fetcher();
    }));

  const onSelectChange = (selectedOptions) => {
    const values = selectedOptions.map((selectedOption) => selectedOption.value);
    setFilter(values);
  };

  return (
    <div className="flex flex-row items-center">
      <div className="mx-4">
        Species
      </div>
      <div className="mx-4 w-64">
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
    </div>
  );
}
