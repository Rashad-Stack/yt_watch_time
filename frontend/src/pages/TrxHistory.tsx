import { Badge, Table } from "flowbite-react";
import Limit from "../components/Limit";
import Paginate from "../components/Paginate";

export default function TrxHistory() {
  return (
    <section>
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-4 text-lg font-bold">Transaction History</h2>
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
            <Table.Row>
              <Table.Cell>12/04/24</Table.Cell>
              <Table.Cell>01758214729</Table.Cell>
              <Table.Cell>TrxId 343439irejfsdjf</Table.Cell>
              <Table.Cell>100</Table.Cell>
              <Table.Cell>10</Table.Cell>
              <Table.Cell>
                <Badge className="w-fit">Pending</Badge>
              </Table.Cell>
            </Table.Row>
          </Table.Body>

          <Table.Head>
            <Table.HeadCell colSpan={7}>
              <div className="flex justify-between">
                <Limit />
                <div className="flex items-center overflow-x-auto sm:justify-center">
                  <Paginate pages={50} />
                </div>
              </div>
            </Table.HeadCell>
          </Table.Head>
        </Table>
      </div>
    </section>
  );
}
