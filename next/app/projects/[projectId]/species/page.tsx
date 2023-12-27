'use client';

import { Spinner, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { projectId: string } }) {
  const [data, setData] = useState<{
    species: string,
    name: string,
    count: number,
  }[] | null>(null);
  const [sortedColumn, setSortedColumn] = useState({ column: 'count', asc: false });

  useEffect(() => {
    const fetchSpecies = async () => {
      const species = await fetch(`/api/projects/${params.projectId}/species`, {
        method: 'GET',
      }).then((res) => res.json());

      setData(species.map((sighting) => ({
        species: sighting.species,
        name: sighting.name,
        count: parseInt(sighting.count, 10),
      })).sort((a, b) => (
        b.count - a.count
      )));
    };

    fetchSpecies();
  }, []);

  const sortTable = (key, asc) => {
    if (data && data.length > 1) {
      const newData = data.sort((a, b) => {
        const fieldA = a[key];
        const fieldB = b[key];

        if (asc) {
          if (fieldB < fieldA) {
            return 1;
          }
          if (fieldB > fieldA) {
            return -1;
          }
        } else {
          if (fieldB > fieldA) {
            return 1;
          }
          if (fieldB < fieldA) {
            return -1;
          }
        }
        return 0;
      });
      setData([...newData]);
      setSortedColumn({ column: key, asc });
    }
  };

  const handleSortEvent = (column) => {
    if (column === sortedColumn.column) {
      sortTable(column, !sortedColumn.asc);
    } else {
      sortTable(column, true);
    }
  };

  return (
    <>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="w-1/3" onClick={() => handleSortEvent('name')}>Species</Table.HeadCell>
          <Table.HeadCell className="w-1/3" onClick={() => handleSortEvent('species')}>Scientific Name</Table.HeadCell>
          <Table.HeadCell className="w-1/3" onClick={() => handleSortEvent('count')}>Count</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data?.map((row) => (
            <Table.Row key={row.species}>
              <Table.Cell className="w-1/3">{row.name}</Table.Cell>
              <Table.Cell className="w-1/3">{row.species}</Table.Cell>
              <Table.Cell className="w-1/3">{row.count}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {!data && (
        <div className="w-full aspect-[2/1] grid place-content-center bg-gray-200">
          <Spinner size="xl" />
        </div>
      )}
    </>
  );
}
