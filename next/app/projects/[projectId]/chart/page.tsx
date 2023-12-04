'use client';

import { Spinner, Tooltip } from 'flowbite-react';
import { PieChart } from 'react-minimal-pie-chart';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { projectId: string } }) {
  const [data, setData] = useState<{
    title: string,
    value: number,
    color: string,
  }[] | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>('');

  const colors = [
    '#FFCD56',
    '#CFD8AD',
    '#DDBBAA',
    '#779922',
    '#A87600',
    '#D9F279',
    '#775555',
    '#883311',
    '#664700',
    '#4C473D',
  ];

  useEffect(() => {
    const fetchSpecies = async () => {
      const species = await fetch(`/api/projects/${params.projectId}/species`, {
        method: 'GET',
      }).then((res) => res.json()).then((results) => results.map((result) => (
        { name: result.name, count: JSON.parse(result.count), species: result.species }
      )));

      const topSpecies = species.sort((a, b) => b.count - a.count).slice(0, 10);
      setData(topSpecies.map((sighting, i) => ({
        title: sighting.name,
        value: sighting.count,
        color: colors[i],
      })));
    };

    fetchSpecies();
  }, []);

  return data ? (
    <div className="w-full aspect-square">
      <Tooltip content={tooltipContent} arrow={false}>
        <PieChart
          data={data}
          startAngle={-90}
          onMouseOver={(_, index) => {
            setTooltipContent(`${data[index].title}: ${data[index].value}`);
          }}
          onMouseOut={() => {
            setTooltipContent('');
          }}
        />
      </Tooltip>
    </div>
  ) : (
    <div className="w-full aspect-square flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
}
