import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    ApolloLink,
    Observable,
    HttpLink,
    split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { onError } from "apollo-link-error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { REACT_APP_SERVER_ORIGIN } from "@env";
import Index from "./src/Index";

export default function App() {
    const cache = new InMemoryCache({});

    const requestLink = new ApolloLink(
        (operation, forward) =>
            new Observable((observer) => {
                let handle: any;
                Promise.resolve(operation)
                    .then((operation) => {
                        if (accessToken) {
                            operation.setContext({
                                headers: {
                                    authorization: `bearer ${accessToken}`,
                                },
                            });
                        }
                    })
                    .then(() => {
                        handle = forward(operation).subscribe({
                            next: observer.next.bind(observer),
                            error: observer.error.bind(observer),
                            complete: observer.complete.bind(observer),
                        });
                    })
                    .catch(observer.error.bind(observer));

                return () => {
                    if (handle) handle.unsubscribe();
                };
            })
    );

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

    const client = new ApolloClient({
        link: ApolloLink.from([
            new TokenRefreshLink({
                accessTokenField: "accessToken",
                isTokenValidOrUndefined: () => {
                    if (!accessToken) {
                        return true;
                    }

                    try {
                        const { exp } = jwtDecode<JwtPayload>(accessToken);
                        if (Date.now() >= exp! * 1000) {
                            return false;
                        } else {
                            return true;
                        }
                    } catch {
                        return false;
                    }
                },
                fetchAccessToken: () => {
                    return fetch(REACT_APP_SERVER_ORIGIN, {
                        method: "POST",
                        credentials: "include",
                    });
                },
                handleFetch: (token) => {
                    
                },
                handleError: (err) => {
                    console.warn(
                        "Your refresh token is invalid. Try to relogin."
                    );
                    console.error(err);
                },
            }),
            onError(({ graphQLErrors, networkError }) => {
                console.log(graphQLErrors);
                console.log(networkError);
            }) as any,
            requestLink,
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
