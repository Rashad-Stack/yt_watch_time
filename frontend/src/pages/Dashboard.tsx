import { useQuery } from "@apollo/client";
import { Badge, Table } from "flowbite-react";
import { useSearchParams } from "react-router-dom";
import ApproveButton from "../components/ApproveButton";
import Empty from "../components/Empty";
import ErrorMessage from "../components/ErrorMessage";
import Filter from "../components/Filter";
import Limit from "../components/Limit";
import Paginate from "../components/Paginate";
import Search from "../components/Search";
import TableSkeleton from "../components/TableSkeleton";
import { handleError } from "../lib/handleError";
import { GET_POINTS } from "../lib/query";
import { formattedDate } from "../lib/utils";
import { Points } from "../types";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query");
  const status = searchParams.get("status");

  const { data, loading, error, refetch } = useQuery(GET_POINTS, {
    variables: {
      limit,
      page: currentPage,
      filter: status,
      search: query,
    },
  });

  const { total, points } = data?.points || {};

  return (
    <section>
      <div className="container mx-auto mt-10 max-w-7xl">
        <div className="overflow-x-auto">
          {
            <div>
              <div className="my-4 flex justify-end gap-5">
                <Filter />
                <Search />
              </div>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Phone</Table.HeadCell>
                  <Table.HeadCell>TrxId</Table.HeadCell>
                  <Table.HeadCell>Points</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                  <Table.HeadCell className="flex justify-end">
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
                          {point.user.email} <br />{" "}
                          <span className="text-xs text-gray-300">
                            {formattedDate(point.createdAt)} /
                            {formattedDate(point.updatedAt)}
                          </span>
                        </Table.Cell>
                        <Table.Cell>{point.phone}</Table.Cell>
                        <Table.Cell>{point.trxId}</Table.Cell>
                        <Table.Cell>{point.points}</Table.Cell>
                        <Table.Cell>{point.price} Taka</Table.Cell>
                        <Table.Cell className="flex justify-end">
                          <ApproveButton points={point} />
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
                        <Paginate />
                      </div>
                    </div>
                  </Table.HeadCell>
                </Table.Head>
              </Table>
            </div>
          }
        </div>
      </div>
    </section>
  );
}
