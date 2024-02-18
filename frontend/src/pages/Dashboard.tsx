import { useQuery } from "@apollo/client";
import { Badge, Button, Dropdown, Pagination, Table } from "flowbite-react";
import { useState } from "react";
import Empty from "../components/Empty";
import ErrorMessage from "../components/ErrorMessage";
import TableSkeleton from "../components/TableSkeleton";
import { handleError } from "../lib/handleError";
import { GET_POINTS } from "../lib/query";
import { Points } from "../types";

export default function Dashboard() {
  const [AllPoints, setAllPoints] = useState<Points[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, loading, error, refetch } = useQuery(GET_POINTS, {
    onCompleted: (data) => {
      setAllPoints(data.points.points);
    },
    variables: {
      limit,
      page: currentPage,
    },
  });

  function handleApprove() {
    console.log("Approve");
  }

  console.log(data.points.__typename);

  const { total, pages } = data?.points || {};

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <section>
      <div className="container mx-auto mt-10 max-w-5xl">
        <div className="overflow-x-auto">
          {loading ? (
            <TableSkeleton length={10} />
          ) : error ? (
            <ErrorMessage message={handleError(error)} />
          ) : total === 0 ? (
            <Empty />
          ) : (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Phone</Table.HeadCell>
                <Table.HeadCell>TrxId</Table.HeadCell>
                <Table.HeadCell>Points</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell className="flex justify-end" colSpan={2}>
                  <button
                    className="transition-transform active:scale-50"
                    onClick={() => {
                      refetch();
                    }}
                  >
                    <Badge color="success">Refresh</Badge>
                  </button>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {AllPoints.map((point) => (
                  <Table.Row
                    key={point._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {point.user.email}
                    </Table.Cell>
                    <Table.Cell>{point.phone}</Table.Cell>
                    <Table.Cell>{point.trxId}</Table.Cell>
                    <Table.Cell>{point.points}</Table.Cell>
                    <Table.Cell>{point.price} Taka</Table.Cell>
                    <Table.Cell colSpan={2} className="flex justify-end">
                      <Button
                        disabled={point.isApproved}
                        size="sm"
                        onClick={handleApprove}
                      >
                        {point.isApproved ? "Approved" : "Approve"}
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Head>
                <Table.HeadCell colSpan={7}>
                  <div className="flex justify-between">
                    <div>
                      <Dropdown
                        size="sm"
                        placement="bottom"
                        label="Limit"
                        dismissOnClick={true}
                        value={limit}
                        onSelect={(event) => {
                          console.log(event);
                        }}
                      >
                        <Dropdown.Item onClick={() => setLimit(20)}>
                          20
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setLimit(40)}>
                          40
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setLimit(50)}>
                          50
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                    <div className="flex items-center overflow-x-auto sm:justify-center">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={pages || 1}
                        onPageChange={onPageChange}
                      />
                    </div>
                  </div>
                </Table.HeadCell>
              </Table.Head>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
}
