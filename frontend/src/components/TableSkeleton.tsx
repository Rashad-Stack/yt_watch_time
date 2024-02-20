import { Table } from "flowbite-react";

type Props = {
  length: number;
};

export default function TableSkeleton({ length }: Props) {
  return (
    <>
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
    </>
  );
}
