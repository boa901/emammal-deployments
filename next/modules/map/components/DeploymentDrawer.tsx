'use client';

import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function DeploymentDrawer({ isOpen, setOpen, deployment }) {
  const [data, setData] = useState<{
    species: string,
    name: string,
    count: number,
  }[] | null>();

  useEffect(() => {
    if (deployment) {
      const fetchDeployment = async () => {
        const deploymentData = await fetch(`/api/deployments/${deployment}`, {
          method: 'GET',
        }).then((res) => res.json());

        setData(deploymentData);
      };

      fetchDeployment();
    } else {
      setData(null);
    }
  }, [deployment]);

  return (
    <div className={`h-full transition-all duration-500 overflow-hidden ${isOpen ? 'w-1/5 mr-2' : 'w-0 pointer-events-none'}`}>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex-grow flex justify-center items-center">
            <h3>Deployment</h3>
          </div>
          <Button
            color="light"
            outline={false}
            onClick={(e) => {
              setOpen(false);
              e.currentTarget.blur();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="w-1/2">Species</Table.HeadCell>
            <Table.HeadCell className="w-1/2">Count</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {data ? (
              <>
                {data.length > 0 ? (
                  data.map((row) => (
                    <Table.Row key={row.species}>
                      <Table.Cell className="w-1/2">{row.name}</Table.Cell>
                      <Table.Cell className="w-1/2">{row.count}</Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={2}>
                      <div className="grid justify-items-center">
                        <div>No species data for the current selection</div>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </>
            ) : (
              <Table.Row>
                <Table.Cell colSpan={2}>
                  <div className="grid justify-items-center">
                    <div>No deployments selected</div>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
