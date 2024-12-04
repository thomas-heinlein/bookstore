import {FC} from "react";
import {FormContainer, TextFieldElement} from "react-hook-form-mui";
import {Box, Button} from "@mui/material";
import Stack from '@mui/material/Stack';
import {useAuth} from "react-oidc-context";
import {create} from "../api/ApiUtils.ts";


export const BookCreation: FC = () => {

    const auth = useAuth();

    return (<>
        <Box>
            <FormContainer
                onSuccess={data =>
                    create<CreateBook>(
                    "books",
                        {name: data.name, isbn: data.isbn},
                        auth
                    )}
            >
                <Stack spacing={2}>
                    <TextFieldElement name="name" label="Name"/>
                    <TextFieldElement name="isbn" label="ISBN"/>
                    <Button type="submit" color="primary">
                        Erstellen
                    </Button>
                </Stack>

            </FormContainer>
        </Box>
    </>);
}