import { HttpLink } from "@apollo/client";
import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
import { cookies } from "next/headers";

export const getServerClient = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            },
            fetch,
        }),
    });
};
