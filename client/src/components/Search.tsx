import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type Input = {
  query: string;
};

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm<Input>();

  const onSearch: SubmitHandler<Input> = ({ query }) => {
    if (query) {
      searchParams.set("query", query);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("query");
      setSearchParams(searchParams);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSearch)}>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow border-0"
          placeholder="Search by phone"
          {...register("query")}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
    </form>
  );
}
