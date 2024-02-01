'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PlaceholderSelect from 'react-select';

import selectStyles from '@/modules/map/utils/selectStyles';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
  loading: () => (
    <PlaceholderSelect
      isMulti
      isLoading
    />
  ),
});

export default function DeploymentMultiselect(
  {
    setFilter,
    optionUrl,
    optionValue,
    optionLabel,
    fieldLabel,
    defaultValues,
  }: {
    setFilter: React.Dispatch<React.SetStateAction<any[]>>,
    optionUrl: string,
    optionValue: string,
    optionLabel: string,
    fieldLabel: string,
    defaultValues?: { value: any, label: string }[],
  },
): React.ReactNode {
  const [selectOptions, setSelectOptions] = useState([]);
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

  const onSelectChange = (selectedOptions: { value: any, label: string }[]) => {
    setFilter(selectedOptions.map((option) => option.value));
  };

  return (
    <div className="flex flex-row items-center mx-4">
      <div className="flex-grow-0 mr-2">
        {fieldLabel}
      </div>
      <div className="flex-grow">
        <Select
          options={selectOptions}
          defaultValue={defaultValues}
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
