import { Container, Typography } from "@mui/material";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to the Bookstore!
      </Typography>
      <Typography>
        Browse our collection and find your next favorite book.
      </Typography>
    </Container>
  );
};

export default Home;
