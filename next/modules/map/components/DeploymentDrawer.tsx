'use client';

import { Spinner, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function DeploymentDrawer({ isOpen, deployment }) {
  const [speciesData, setSpeciesData] = useState<{
    species: string,
    name: string,
    count: number,
  }[] | null>();
  const [projectData, setProjectData] = useState<{
    name: string,
    nid: number,
  } | null>();

  useEffect(() => {
    if (deployment) {
      const fetchDeployment = async () => {
        const deploymentData = await fetch(`/api/deployments/${deployment.nid}`, {
          method: 'GET',
        }).then((res) => res.json());

        setSpeciesData(deploymentData.species);
        setProjectData(deploymentData.project[0]);
      };

      fetchDeployment();
    } else {
      setSpeciesData(null);
      setProjectData(null);
    }
  }, [deployment]);

  return (
    <div className={`h-full transition-all duration-500 overflow-x-hidden ${isOpen ? 'w-1/5 mr-2' : 'w-0 pointer-events-none'}`}>
      {deployment ? (
        <>
          {projectData ? (
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex-grow flex flex-wrap justify-center items-center">
                  <h3 className="my-2 font-semibold text-center">
                    {`${projectData.name}: ${deployment.label}`}
                  </h3>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_SITE_HOST}/node/${projectData.nid}`}
                  className="text-cyan-700 hover:underline"
                >
                  Project Page
                </a>
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="w-1/2">Species</Table.HeadCell>
                  <Table.HeadCell className="w-1/2">Count</Table.HeadCell>
                </Table.Head>
                <Table.Body className="overflow-y-scroll">
                  {speciesData ? (
                    <>
                      {speciesData.length > 0 ? (
                        speciesData.map((row) => (
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
                          <Spinner />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          ) : (
            <div className="h-full grid justify-items-center items-center">
              <Spinner size="xl" />
            </div>
          )}
        </>
      ) : (
        <div className="h-full grid justify-items-center items-center">
          <div>No deployment selected</div>
        </div>
      )}
    </div>
  );
}
