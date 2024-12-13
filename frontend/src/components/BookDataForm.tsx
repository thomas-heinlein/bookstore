import { FC, ReactNode } from "react";
import {
  FieldValues,
  FormContainer,
  TextareaAutosizeElement,
  TextFieldElement,
} from "react-hook-form-mui";
import { Box, Button } from "@mui/material";
import { BookFormData } from "../api/BookFormData";
import Grid from "@mui/material/Grid2";
import "dayjs/locale/en";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";

interface BookDataFormProps {
  onSuccess: (bookFormData: BookFormData) => void;
  buttonIcon: ReactNode;
  buttonText: string;
  defaultValues?: BookFormData;
}

const BookDataForm: FC<BookDataFormProps> = ({
  onSuccess,
  buttonIcon,
  buttonText,
  defaultValues,
}) => {
  const onSuccessInternal = (data: FieldValues) => {
    const bookFormData: BookFormData = {
      name: data.name,
      isbn: data.isbn,
      author: data.author,
      genre: data.genre,
      publisher: data.publisher,
      publicationDate: data.publicationDate,
      description: data.description,
    };
    onSuccess(bookFormData);
  };

  return (
    <Box>
      <FormContainer
        defaultValues={defaultValues}
        onSuccess={onSuccessInternal}
      >
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
              <Button startIcon={buttonIcon} type="submit" variant="contained">
                {buttonText}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </FormContainer>
    </Box>
  );
};

export default BookDataForm;
