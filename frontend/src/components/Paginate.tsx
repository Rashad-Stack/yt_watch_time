import { useQuery } from "@apollo/client";
import { Pagination } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GET_POINTS } from "../lib/query";

export default function Paginate() {
  const { data } = useQuery(GET_POINTS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const pages = data?.points?.Pages || 1;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className="flex items-center overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
