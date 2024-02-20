import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Limit() {
  const [limit, setLimit] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilter = (limit: number) => {
    setLimit(limit);
    if (limit) {
      searchParams.set("limit", limit.toString());
      setSearchParams(searchParams);
    } else {
      searchParams.delete("limit");
      setSearchParams(searchParams);
    }
  };

  return (
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
      <Dropdown.Item onClick={() => handleFilter(20)}>20</Dropdown.Item>
      <Dropdown.Item onClick={() => handleFilter(40)}>40</Dropdown.Item>
      <Dropdown.Item onClick={() => handleFilter(50)}>50</Dropdown.Item>
    </Dropdown>
  );
}
