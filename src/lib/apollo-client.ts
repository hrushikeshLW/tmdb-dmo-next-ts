import { TOKEN } from "@/common/constant";
import { ApolloLink } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});
import { SetContextLink } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const authLink = new SetContextLink(async ({ headers } = {}) => {
  const userToken = Cookies.get(TOKEN);

  let newHeaders = headers || {};

  newHeaders = {
    ...newHeaders,
    Authorization: userToken ? `Bearer ${userToken}` : "",
  };

  return {
    headers: newHeaders,
  };
});

const link = ApolloLink.from([authLink, httpLink]);

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
