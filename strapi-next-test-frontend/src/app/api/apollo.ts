import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_REACT_APP_GRAPHQL_ENDPOINT,
    headers: {
        Authorization: `Bearer ` + process.env.NEXT_PUBLIC_REACT_APP_AUTH_TOKEN,
    },
});

export const gqlClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
