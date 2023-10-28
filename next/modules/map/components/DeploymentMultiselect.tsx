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
    <div className="flex flex-row items-center">
      <div className="mx-4">
        {fieldLabel}
      </div>
      <div className="mx-4 w-64">
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
