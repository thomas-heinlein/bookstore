import {useAuth} from 'react-oidc-context';
import {useQuery} from '@tanstack/react-query';
import {query} from "../api/ApiUtils.ts";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Book} from '../api/Book.ts'

const columns: GridColDef<Book[number]>[] = [
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
export const BookTable: React.FC = () => {

    const auth = useAuth();

    const {isPending, error, data} = useQuery({
        queryKey: ['books'],
        queryFn: () => query("books", auth),
        retry: true,
    });

    return (error ? (
        error.message
    ) : isPending ? (
        <>Loading...</>
    ) : (
        <DataGrid
            columns={columns}
            rows={data}
            disableRowSelectionOnClick
            />
    ));
}