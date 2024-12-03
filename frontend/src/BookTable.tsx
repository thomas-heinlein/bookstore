import { hasAuthParams, useAuth } from 'react-oidc-context';
import { useQuery } from '@tanstack/react-query';
import {useEffect, useState} from "react";

export const BookTable: React.FC = () => {

    const auth = useAuth();
    const queryFn = async () => {
        const response = await fetch('http://localhost:8081/api/books', {
            headers: {
                authorization: `Bearer ${auth.user?.id_token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return await response.json();
    };

    const {isPending, error, data} = useQuery({
        queryKey: ['books'],
        retry: true,
        queryFn
    });

    return (error ? (
        error.message
    ) : isPending ? (
        <>Loading...</>
    ) : (
        JSON.stringify(data, null, 2)
    ));
}