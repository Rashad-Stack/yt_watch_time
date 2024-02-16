import { PropsWithChildren } from "react";

type Props = {
  count: number;
};

export default function LoadingSkeleton({
  children,
  count,
}: PropsWithChildren<Props>) {
  return Array.from({ length: count }).map((_, index) => (
    <div key={index}>{children}</div>
  ));
}
