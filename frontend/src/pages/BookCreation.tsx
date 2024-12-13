import { FC } from "react";
import {
  FieldValues,
  FormContainer,
  TextareaAutosizeElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Box, Button } from "@mui/material";
import { createEntity } from "../api/ApiUtils";
import { CreateBook } from "../api/CreateBook";
import Grid from "@mui/material/Grid2";
import "dayjs/locale/en";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import BookstoreTitle from "../components/BookstoreTitle";
import { useNavigate } from "react-router-dom";

const BookCreation: FC = () => {
  const navigate = useNavigate();

  const onSuccess = async (data: FieldValues) => {
    const newBook: CreateBook = {
      name: data.name,
      isbn: data.isbn,
      author: data.author,
      genre: data.genre,
      publisher: data.publisher,
      publicationDate: data.publicationDate,
      description: data.description,
    };
    const id = await createEntity<CreateBook>("books", newBook);
    navigate(`/books/${id}`);
  };

  return (
    <Stack spacing={3}>
      <BookstoreTitle>Register a new Book</BookstoreTitle>
      <Box>
        <FormContainer onSuccess={onSuccess}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                required
                name="name"
                label="Name"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                required
                name="isbn"
                label="ISBN"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                required
                name="author"
                label="Author"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                required
                name="genre"
                label="Genre"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                required
                name="publisher"
                label="Publisher"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DatePickerElement
                required
                sx={{ width: "100% " }}
                name="publicationDate"
                label="Publication Date"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextareaAutosizeElement
                required
                fullWidth
                minRows={3}
                name="description"
                label="Description"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ md: 10 }} />
            <Grid size={{ xs: 12, md: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  startIcon={<AddIcon />}
                  type="submit"
                  variant="contained"
                >
                  Register
                </Button>
              </Box>
            </Grid>
          </Grid>
        </FormContainer>
      </Box>
    </Stack>
  );
};

export default BookCreation;
