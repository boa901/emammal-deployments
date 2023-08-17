'use client';

import AsyncSelect from 'react-select/async';

export default function DeploymentProjectFilter(
  { setFilter }: { setFilter: React.Dispatch<React.SetStateAction<number[]>> },
): React.ReactNode {
  const filterOptions = (
    inputValue: string, projectOptions: { value: string, label: string }[],
  ) => (
    projectOptions.filter((projectOption) => (
      projectOption.label.toLowerCase().includes(inputValue.toLowerCase())
    ))
  );

  const promiseOptions = (inputValue: string) => (
    new Promise<{ value: string, label: string }[]>((resolve) => {
      const fetcher = async () => {
        const projects = await fetch('/api/projects', {
          method: 'GET',
        }).then((res) => res.json());

        const projectOptions = projects.map((project) => (
          { value: project.nid, label: project.name }
        ));

        resolve(filterOptions(inputValue, projectOptions));
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
        Projects
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
