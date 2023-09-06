'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';

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
  const [selectOptions, setSelectOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (optionUrl && optionUrl.length > 0) {
      setLoading(true);
      const fetchOptions = async () => {
        const nodes = await fetch(optionUrl, {
          method: 'GET',
        }).then((res) => res.json());

        const options = nodes.map((node) => (
          { value: node[optionValue], label: node[optionLabel] }
        ));

        setSelectOptions(options);
        setLoading(false);
      };

      fetchOptions();
    }
  }, [optionUrl]);

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
        <Select
          options={selectOptions}
          isMulti
          isLoading={loading}
          onChange={onSelectChange}
          menuPortalTarget={document.body}
          styles={selectStyles}
        />
      </div>
    </div>
  );
}
