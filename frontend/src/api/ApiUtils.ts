import {AuthContextProps} from "react-oidc-context";

export const query = async (path: string, auth: AuthContextProps) => {
    const response = await fetch(`http://localhost:8081/api/${path}`, {
        headers: {
            authorization: `Bearer ${auth.user?.id_token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Unexpected response status: ${response.status}`);
    }

    return await response.json();
};

export const create = async <T>(path: string, objectToCreate: T, auth: AuthContextProps): Promise<number> => {
    const response = await fetch(`http://localhost:8081/api/${path}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${auth.user?.id_token}`
        },
        body: JSON.stringify(objectToCreate)
    });

    if (!response.ok) {
        throw new Error(`Unexpected response status: ${response.status}`);
    }

    return Number(response);
}