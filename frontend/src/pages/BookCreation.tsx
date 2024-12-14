import { FC } from "react";
import Stack from "@mui/material/Stack";
import BookstoreTitle from "../components/BookstoreTitle";
import { createEntity } from "../api/ApiUtils";
import { BookFormData } from "../api/BookFormData";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import BookDataForm from "../components/BookDataForm";

const BookCreation: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <BookstoreTitle>Register a new Book</BookstoreTitle>
      <BookDataForm
        onSuccess={async (bookFormData) => {
          const id = await createEntity<BookFormData>("books", bookFormData);
          navigate(`/books/details/${id}`, {
            state: { message: "Book successfully registered!" },
          });
        }}
        buttonIcon={<AddIcon />}
        buttonText={"Save"}
      />
    </Stack>
  );
};

export default BookCreation;
