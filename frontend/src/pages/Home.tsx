import { Typography } from "@mui/material";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import BookstoreTitle from "../components/BookstoreTitle";

const Home: FC = () => {
  return (
    <Stack spacing={3}>
      <BookstoreTitle>Welcome to the Bookstore!</BookstoreTitle>
      <Typography gutterBottom align="left">
        Browse our collection and find your next favorite book.
      </Typography>
    </Stack>
  );
};

export default Home;
