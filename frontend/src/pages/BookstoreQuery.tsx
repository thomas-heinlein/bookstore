import { FC, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

interface BookstoreQueryProps {
  children: (props: { data: any }) => ReactNode;
  queryKey: string[];
  queryFn: () => Promise<any>;
}

const BookstoreQuery: FC<BookstoreQueryProps> = ({
  children,
  queryKey,
  queryFn,
}) => {
  const { isPending, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    retry: true,
  });

  if (error) {
    return <>error.message</>;
  }
  if (isPending) {
    return <>Loading...</>;
  }

  return <>{children({ data })}</>;
};

export default BookstoreQuery;
