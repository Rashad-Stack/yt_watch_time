import { useMutation } from "@apollo/client";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { handleError } from "../lib/handleError";
import { GET_POINTS, SEND_POINTS } from "../lib/query";
import { Points, Status } from "../types";

type Props = {
  points: Points;
};

export default function ApproveButton({ points }: Props) {
  const [sendPoints, { loading }] = useMutation(SEND_POINTS, {
    refetchQueries: [{ query: GET_POINTS }],
  });
  const { _id, isApproved, status } = points || {};

  function handleSendPoints(status: Status) {
    toast.promise(
      sendPoints({
        variables: {
          pointId: _id,
          status,
        },
      }),
      {
        loading: "sending...",
        success: ({ data }) => data.sendPointsToUser.message,
        error: (error) => handleError(error),
      },
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        disabled={loading || isApproved}
        size="sm"
        onClick={() => handleSendPoints(Status.Approved)}
        className="w-28"
        color={status === Status.Approved ? "success" : "green"}
      >
        {loading ? (
          <span className="flex items-center gap-4">
            <span className="loading loading-spinner loading-xs" /> Loading
          </span>
        ) : (
          "Approved"
        )}
      </Button>
      <Button
        disabled={loading || isApproved}
        size="sm"
        onClick={() => handleSendPoints(Status.Declean)}
        color={status === Status.Declean ? "failure" : "red"}
        className="w-32"
      >
        {loading ? (
          <span className="flex items-center gap-4">
            <span className="loading loading-spinner loading-xs" /> Loading
          </span>
        ) : (
          "Decleaned"
        )}
      </Button>
    </div>
  );
}
