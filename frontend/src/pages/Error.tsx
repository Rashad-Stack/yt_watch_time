import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="flex max-w-sm flex-col items-center text-center">
        <p className="rounded-full bg-cyan-50 p-3 text-sm font-medium text-cyan-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          The page you are looking for doesn't exist. Here are some helpful
          links:
        </p>
        <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
          <button className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 rtl:rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            <span onClick={() => navigate(-1)}>Go back</span>
          </button>
          <Link
            to="/"
            className="w-1/2 shrink-0 rounded-lg bg-cyan-700 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-cyan-600 sm:w-auto"
          >
            Take me home
          </Link>
        </div>
      </div>
    </section>
  );
}
