import {useAuth} from 'react-oidc-context';
import {useQuery} from '@tanstack/react-query';
import {query} from "../api/ApiUtils.ts";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {FC} from "react";
import {Book} from "../types/Book.ts";

const columns: GridColDef<Book>[] = [
    {
        field: 'id',
        headerName: 'ID',
        type: 'number'
    },
    {
        field: 'name',
        headerName: 'Name'
    },
    {
        field: 'isbn',
        headerName: 'ISBN'
    }
];
const BookTable: FC = () => {

    const auth = useAuth();

    const {isPending, error, data} = useQuery({
        queryKey: ['books'],
        queryFn: () => query("books", auth),
        retry: true,
    });

    if (error) {
        return error.message;
    }
    if (isPending) {
        return <>Loading...</>;
    }

    return (
        <DataGrid
            columns={columns}
            rows={data}
            disableRowSelectionOnClick
        />
    );
}

export default BookTable;