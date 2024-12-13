import { FC } from "react";
import {
  FieldValues,
  FormContainer,
  TextareaAutosizeElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "react-oidc-context";
import { createEntity } from "../api/ApiUtils";
import { CreateBook } from "../api/CreateBook";
import Grid from "@mui/material/Grid2";
import "dayjs/locale/en";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import AddIcon from "@mui/icons-material/Add";

const BookCreation: FC = () => {
  const auth = useAuth();

  const onSuccess = (data: FieldValues) => {
    const newBook: CreateBook = {
      name: data.name,
      isbn: data.isbn,
      author: data.author,
      genre: data.genre,
      publisher: data.publisher,
      publicationDate: data.publicationDate,
      description: data.description,
    };
    createEntity<CreateBook>("books", newBook);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Register a new Book
      </Typography>
      <Box>
        <FormContainer onSuccess={onSuccess}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                name="name"
                label="Name"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                name="isbn"
                label="ISBN"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                name="author"
                label="Author"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                name="genre"
                label="Genre"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextFieldElement
                fullWidth
                name="publisher"
                label="Publisher"
                autoComplete="off"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DatePickerElement
                sx={{ width: "100% " }}
                name="publicationDate"
                label="Publication Date"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextareaAutosizeElement
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
    </>
  );
};

export default BookCreation;
