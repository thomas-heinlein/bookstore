import { FC } from "react";
import BookstoreTitle from "../components/BookstoreTitle";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router";
import BookDataForm from "../components/BookDataForm";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { editEntity, query } from "../api/ApiUtils";
import { BookFormData } from "../api/BookFormData";
import { useNavigate } from "react-router-dom";
import BookstoreQuery from "../components/BookstoreQuery";
import { useQueryClient } from "@tanstack/react-query";

const BookEdit: FC = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!id) {
    return null;
  }

  return (
    <BookstoreQuery
      queryKey={["books", id]}
      queryFn={() => query(`books/${id}`)}
    >
      {({ data }) => (
        <Stack spacing={3}>
          <BookstoreTitle>Edit book entry</BookstoreTitle>
          <BookDataForm
            onSuccess={async (bookFormData) => {
              await editEntity<BookFormData>("books", Number(id), bookFormData);
              queryClient.removeQueries({
                queryKey: ["books", id],
                exact: true,
              });
              navigate(`/books/details/${id}`, {
                state: { message: "Book successfully edited!" },
              });
            }}
            buttonIcon={<ModeEditIcon />}
            buttonText={"Save"}
            defaultValues={data}
          />
        </Stack>
      )}
    </BookstoreQuery>
  );
};

export default BookEdit;
