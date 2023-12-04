'use client';

import { Spinner } from 'flowbite-react';
import { PieChart } from 'react-minimal-pie-chart';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ChartTooltip = dynamic(() => import('@/modules/chart/components/ChartTooltip'), { ssr: false });

export default function Page({ params }: { params: { projectId: string } }) {
  const [data, setData] = useState<{
    species: string,
    value: number,
    color: string,
  }[] | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>('');
  const [currentSegment, setCurrentSegment] = useState<number | undefined>(undefined);

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
        species: sighting.name,
        value: sighting.count,
        color: colors[i],
      })));
    };

    fetchSpecies();
  }, []);

  return data ? (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row justify-center">
        <h1 className="my-4 text-3xl font-bold">Top 10 Species Detections</h1>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-2/3">
          <div className="w-full aspect-square">
            <PieChart
              data={data}
              startAngle={-90}
              onMouseOver={(_, index) => {
                setTooltipContent(`${data[index].species}: ${data[index].value}`);
                setCurrentSegment(index);
              }}
              onMouseOut={() => {
                setTooltipContent('');
                setCurrentSegment(undefined);
              }}
            />
            <ChartTooltip content={tooltipContent} color={typeof currentSegment === 'number' ? colors[currentSegment] : ''} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {data.map((segment) => (
            <div className="w-full flex flex-row items-center mx-4 my-1" key={segment.color}>
              <div className="w-8 h-4 border-2 border-white mr-2" style={{ backgroundColor: segment.color }} />
              <div className="">{segment.species}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full aspect-square flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
}
