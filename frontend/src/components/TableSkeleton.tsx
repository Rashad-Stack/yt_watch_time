import { Table } from "flowbite-react";

type Props = {
  length: number;
};

export default function TableSkeleton({ length }: Props) {
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Phone</Table.HeadCell>
        <Table.HeadCell>TrxId</Table.HeadCell>
        <Table.HeadCell>Points</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {Array.from({ length }).map((_, index) => (
          <Table.Row
            key={index}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <div className="skeleton h-4 w-full" />
            </Table.Cell>
            <Table.Cell>
              <div className="skeleton h-4 w-full" />
            </Table.Cell>
            <Table.Cell>
              <div className="skeleton h-4 w-full" />
            </Table.Cell>
            <Table.Cell>
              <div className="skeleton h-4 w-full" />
            </Table.Cell>
            <Table.Cell>
              <div className="skeleton h-4 w-full" />
            </Table.Cell>
            <Table.Cell>
              <div className="skeleton h-4 w-full" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
