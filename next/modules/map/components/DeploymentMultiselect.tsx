'use client';

import AsyncSelect from 'react-select/async';
import selectStyles from '@/modules/map/utils/selectStyles';

export default function DeploymentMultiselect(
  {
    setFilter,
    optionUrl,
    optionValue,
    optionLabel,
    fieldLabel,
  }: {
    setFilter: React.Dispatch<React.SetStateAction<any[]>>,
    optionUrl: string,
    optionValue: string,
    optionLabel: string,
    fieldLabel: string
  },
): React.ReactNode {
  const filterOptions = (
    inputValue: string, options: { value: string, label: string }[],
  ) => (
    options.filter((option) => (
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    ))
  );

  const promiseOptions = (inputValue: string) => (
    new Promise<{ value: string, label: string }[]>((resolve) => {
      const fetcher = async () => {
        const nodes = await fetch(optionUrl, {
          method: 'GET',
        }).then((res) => res.json());

        const options = nodes.map((node) => (
          { value: node[optionValue], label: node[optionLabel] }
        ));

        resolve(filterOptions(inputValue, options));
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
        {fieldLabel}
      </div>
      <div className="mx-4 w-64">
        <AsyncSelect
          defaultOptions
          cacheOptions
          loadOptions={promiseOptions}
          isMulti
          onChange={onSelectChange}
          menuPortalTarget={document.body}
          styles={selectStyles}
        />
      </div>
    </div>
  );
}
