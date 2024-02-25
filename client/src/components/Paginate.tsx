import { Pagination } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  pages: number;
};

export default function Paginate({ pages }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

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
