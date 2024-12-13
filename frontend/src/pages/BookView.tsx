import { FC } from "react";
import BookstoreQuery from "./BookstoreQuery";
import { query } from "../api/ApiUtils";
import { useParams } from "react-router";
import { Card, CardContent, Stack, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";

const BookView: FC = () => {
  const { id } = useParams();

  return (
    <BookstoreQuery
      queryKey={["books", "details"]}
      queryFn={() => query(`books/${id}`)}
    >
      {({ data }) => (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {data.name}
            </Typography>

            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              gap={3}
            >
              <Stack spacing={1.5}>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>ISBN:</strong> {data.isbn}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Author:</strong> {data.author}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Genre:</strong> {data.genre}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Publisher:</strong> {data.publisher}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Publication Date:</strong> {data.publicationDate}
                </Typography>
              </Stack>

              <Box flex={1}>
                <Typography variant="subtitle1" color="textSecondary">
                  <strong>Description:</strong>
                </Typography>
                <Typography variant="body2">{data.description}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="flex-end">
              <Typography variant="body2" color="textSecondary">
                <strong>Book ID:</strong> {data.id}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </BookstoreQuery>
  );
};

export default BookView;
