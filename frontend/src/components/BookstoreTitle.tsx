import { FC } from "react";
import { Divider, Typography } from "@mui/material";

const BookstoreTitle: FC = ({ children }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom align="left">
        {children}
      </Typography>
      <Divider />
    </>
  );
};

export default BookstoreTitle;
