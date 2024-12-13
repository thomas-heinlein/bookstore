import { getAuth } from "../AuthProvider";

export const query = async (path: string) => {
  const auth = getAuth();
  const response = await fetch(`http://localhost:8081/api/${path}`, {
    headers: {
      authorization: `Bearer ${auth.user?.id_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }

  return await response.json();
};

export const create = async <T>(
  path: string,
  objectToCreate: T,
): Promise<number> => {
  const auth = getAuth();

  const response = await fetch(`http://localhost:8081/api/${path}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${auth.user?.id_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectToCreate),
  });

  if (!response.ok) {
    throw new Error(`Unexpected response status: ${response.status}`);
  }

  return Number(response);
};
