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
          <Table.HeadCell className="w-1/3" onClick={() => handleSortEvent('name')}>
            <div className="flex flex-row">
              <div>Species</div>
              {sortedColumn.column === 'name' && (
                <>
                  {sortedColumn.asc ? (
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                  )}
                </>
              )}
            </div>
          </Table.HeadCell>
          <Table.HeadCell className="w-1/3" onClick={() => handleSortEvent('species')}>
            <div className="flex flex-row">
              <div>Scientific Name</div>
              {sortedColumn.column === 'species' && (
                <>
                  {sortedColumn.asc ? (
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                  )}
                </>
              )}
            </div>
          </Table.HeadCell>
          <Table.HeadCell className="w-1/3" onClick={() => handleSortEvent('count')}>
            <div className="flex flex-row">
              <div>Count</div>
              {sortedColumn.column === 'count' && (
                <>
                  {sortedColumn.asc ? (
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                    </svg>
                  )}
                </>
              )}
            </div>
          </Table.HeadCell>
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
