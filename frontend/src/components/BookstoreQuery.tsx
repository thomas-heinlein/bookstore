import { FC, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

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
    return <Typography>{error.message}</Typography>;
  }
  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children({ data })}</>;
};

export default BookstoreQuery;
