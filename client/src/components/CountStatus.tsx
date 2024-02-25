import { Badge } from "flowbite-react";

type Props = {
  played: number;
};

export default function CountStatus({ played }: Props) {
  return (
    <>
      {played > 100 && (
        <Badge className="w-fit" color="success">
          Counted
        </Badge>
      )}
      {played === 0 && (
        <Badge className="w-fit" color="gray">
          Not Counted
        </Badge>
      )}
      {played > 0 && played < 100 && (
        <Badge className="w-fit" color="purple">
          Counting
        </Badge>
      )}
    </>
  );
}
