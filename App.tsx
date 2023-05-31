import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    ApolloLink,
    HttpLink,
    split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { onError } from "apollo-link-error";
import { REACT_APP_SERVER_ORIGIN } from "@env";
import Index from "./src/Index";
import { authContextLink, refreshLink } from "./src/utils/http";
import { getToken, setToken } from "./src/utils/token";

const cache = new InMemoryCache({});

const httpLink = new HttpLink({
    uri: `${REACT_APP_SERVER_ORIGIN}/graphql`,
    credentials: "include",
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: `ws://localhost:4000/graphql`,
    })
);

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

export default function App() {
    const client = new ApolloClient({
        link: ApolloLink.from([
            refreshLink(getToken, setToken),
            authContextLink(getToken),
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) => {
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${
                                locations || "not found"
                            }, Path: ${path}`
                        );
                    });

                if (networkError)
                    console.log(
                        `[Network error]: ${JSON.stringify(networkError)}`
                    );
            }) as any,
            link,
        ]),
        cache,
    });

    return (
        <ApolloProvider client={client}>
            <View>
                <Text>Square</Text>
                <Index />
                <StatusBar style="auto" />
            </View>
        </ApolloProvider>
    );
}
