import { FC } from "react";
import { query } from "../api/ApiUtils";
import { useParams } from "react-router";
import { Divider, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BookstoreQuery from "../components/BookstoreQuery";
import BookstoreTitle from "../components/BookstoreTitle";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

interface ViewElementProps {
  field: string;
  fieldValue: string;
}

const ViewElement: FC<ViewElementProps> = ({ field, fieldValue }) => {
  return (
    <Typography
      variant="subtitle1"
      color="textSecondary"
      gutterBottom
      align="left"
    >
      <strong>{field}:</strong> {fieldValue}
    </Typography>
  );
};

const BookView: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const message = location.state?.message;

  return (
    <BookstoreQuery
      queryKey={["books", "details", id ?? ""]}
      queryFn={() => query(`books/${id}`)}
    >
      {({ data }) => (
        <Stack spacing={3}>
          {message && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {message}
            </Alert>
          )}
          <BookstoreTitle>{data.name}</BookstoreTitle>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            gap={3}
          >
            <Stack spacing={1.5}>
              <ViewElement field={"ISBN"} fieldValue={data.isbn} />
              <ViewElement field={"Author"} fieldValue={data.author} />
              <ViewElement field={"Genre"} fieldValue={data.genre} />
              <ViewElement field={"Publisher"} fieldValue={data.publisher} />
              <ViewElement
                field={"Publication Date"}
                fieldValue={dayjs(data.publicationDate).format("MM/DD/YYYY")}
              />
              <ViewElement
                field={"Description"}
                fieldValue={data.description}
              />
            </Stack>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="flex-end">
            <Typography variant="body2" color="textSecondary">
              <strong>Book ID:</strong> {data.id}
            </Typography>
          </Box>
        </Stack>
      )}
    </BookstoreQuery>
  );
};

export default BookView;
