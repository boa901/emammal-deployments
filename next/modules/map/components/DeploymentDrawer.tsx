'use client';

import { Button, Table } from 'flowbite-react';

export default function DeploymentDrawer({ isOpen, setOpen }) {
  return (
    <div className={`h-full transition-all duration-500 ${isOpen ? 'w-1/5' : 'w-0 pointer-events-none'}`}>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex-grow flex justify-center items-center">
            <h3>Deployment</h3>
          </div>
          <Button onClick={(e) => {
            setOpen(false);
            e.currentTarget.blur();
          }}
          >
            Close
          </Button>
        </div>
        <div className="flex flex-row">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Species</Table.HeadCell>
              <Table.HeadCell>Count</Table.HeadCell>
            </Table.Head>
          </Table>
        </div>
      </div>
    </div>
  );
}
