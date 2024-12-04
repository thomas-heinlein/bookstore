import {useAuth} from 'react-oidc-context';
import {useQuery} from '@tanstack/react-query';
import {query} from "../api/ApiUtils.ts";

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
        JSON.stringify(data, null, 2)
    ));
}