import { Dropdown } from "flowbite-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Status } from "../types";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [filter, setFilter] = useState<string | null>(status);

  const handleFilter = (status: string) => {
    setFilter(status);
    if (status) {
      searchParams.set("status", status);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("status");
      setSearchParams(searchParams);
    }
  };

  return (
    <Dropdown label={filter || "Default"} dismissOnClick={true} size="sm">
      <Dropdown.Item onClick={() => handleFilter("")}>Default</Dropdown.Item>
      {Object.keys(Status).map((option) => (
        <Dropdown.Item key={option} onClick={() => handleFilter(option)}>
          {option}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
