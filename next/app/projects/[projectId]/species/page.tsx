'use client';

import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { projectId: string } }) {
  const [data, setData] = useState<{
    species: string,
    count: number,
  }[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      const species = await fetch(`/api/projects/${params.projectId}/species`, {
        method: 'GET',
      }).then((res) => res.json());

      setData(species);
    };

    fetchSpecies();
  }, []);

  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Species</Table.HeadCell>
        <Table.HeadCell>Count</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {data?.map((row) => (
          <Table.Row key={row.species}>
            <Table.Cell>{row.species}</Table.Cell>
            <Table.Cell>{row.count}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
