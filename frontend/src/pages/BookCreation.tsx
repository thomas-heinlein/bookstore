import {FC} from "react";
import {FieldValues, FormContainer, TextareaAutosizeElement, TextFieldElement} from "react-hook-form-mui";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useAuth} from "react-oidc-context";
import {create} from "../api/ApiUtils";
import {CreateBook} from "../api/CreateBook";
import Grid from '@mui/material/Grid2';
import 'dayjs/locale/en';
import {DatePickerElement} from 'react-hook-form-mui/date-pickers'

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
        create<CreateBook>(
            "books",
            newBook,
            auth
        )
    }

    return (<>
        <Typography variant="h4" gutterBottom>
            Create a new Book
        </Typography>
        <Box>
            <FormContainer
                onSuccess={onSuccess}
            >
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, md: 6}}>
                        <TextFieldElement fullWidth name="name" label="Name"/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <TextFieldElement fullWidth name="isbn" label="ISBN"/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <TextFieldElement fullWidth name="author" label="Author"/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <TextFieldElement fullWidth name="genre" label="Genre"/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <TextFieldElement fullWidth name="publisher" label="Publisher"/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                        <DatePickerElement sx={{ width: "100% " }} name="publicationDate" label="Publication Date"/>
                    </Grid>
                    <Grid size={{xs: 12, md: 12}}>
                        <TextareaAutosizeElement fullWidth name="description" label="Description"/>
                    </Grid>
                    <Grid size={{md: 10}}/>
                    <Grid size={{xs: 12, md: 2}}>
                        <Button type="submit" fullWidth variant="contained">
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </FormContainer>
        </Box>
    </>);
}

export default BookCreation;