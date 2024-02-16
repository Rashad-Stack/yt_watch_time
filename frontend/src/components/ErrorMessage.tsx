import { Button } from "flowbite-react";

type Props = {
  message: string;
};
export default function ErrorMessage({ message }: Props) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform space-y-4">
      <div className="flex items-center gap-4">
        <img src="/icons8-error-50.png" alt="Error" />
        <h4 className="text-lg font-medium text-red-400">{message}</h4>
      </div>
      <Button onClick={() => window.location.reload()} className="mx-auto">
        Reload
      </Button>
    </div>
  );
}
