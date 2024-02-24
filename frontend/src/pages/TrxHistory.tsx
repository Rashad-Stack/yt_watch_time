import { useQuery } from "@apollo/client";
import { Badge, Table } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import Empty from "../components/Empty";
import ErrorMessage from "../components/ErrorMessage";
import Limit from "../components/Limit";
import Paginate from "../components/Paginate";
import TableSkeleton from "../components/TableSkeleton";
import { handleError } from "../lib/handleError";
import { GET_POINT_REQUEST } from "../lib/query";
import { formattedDate } from "../lib/utils";
import { Points } from "../types";

export default function TrxHistory() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const { data, loading, error } = useQuery(GET_POINT_REQUEST, {
    variables: {
      page: currentPage,
      limit,
    },
  });

  const { total, points, pages } = data?.pointRequest || {};

  return (
    <section>
      <div className="container mx-auto my-6 max-w-4xl">
        <h2 className="mb-4 text-lg font-bold">Transaction History</h2>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>TrxId</Table.HeadCell>
              <Table.HeadCell>Points</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {loading ? (
                <TableSkeleton length={10} />
              ) : error ? (
                <Table.Row className="h-60">
                  <Table.Cell>
                    <ErrorMessage message={handleError(error)} />
                  </Table.Cell>
                </Table.Row>
              ) : total === 0 ? (
                <Table.Row className="h-60">
                  <Table.Cell>
                    <Empty />
                  </Table.Cell>
                </Table.Row>
              ) : (
                points.map((point: Points) => (
                  <Table.Row
                    key={point._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {formattedDate(point.createdAt)}
                    </Table.Cell>
                    <Table.Cell>{point.phone}</Table.Cell>
                    <Table.Cell>{point.trxId}</Table.Cell>
                    <Table.Cell>{point.points}</Table.Cell>
                    <Table.Cell>{point.price} Taka</Table.Cell>
                    <Table.Cell>
                      {point.status === "Approve" ? (
                        <Badge className="w-fit">Pending</Badge>
                      ) : point.status === "Approved" ? (
                        <Badge className="w-fit" color="success">
                          Approved
                        </Badge>
                      ) : (
                        <Badge className="w-fit" color="failure">
                          Declined
                        </Badge>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>

            <Table.Head>
              <Table.HeadCell colSpan={7}>
                <div className="flex justify-between">
                  <Limit />
                  <div className="flex items-center overflow-x-auto sm:justify-center">
                    <Paginate pages={pages || 1} />
                  </div>
                </div>
              </Table.HeadCell>
            </Table.Head>
          </Table>
        </div>
      </div>
    </section>
  );
}
