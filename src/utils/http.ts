import { ApolloLink, Observable } from "@apollo/client";
import { checkToken } from "./util";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { REACT_APP_SERVER_ORIGIN } from "@env";

export function refreshLink(
    getAccessToken: () => Promise<string | null> | string | null,
    setAccessToken: (token: string) => Promise<void> | void
): ApolloLink {
    // @ts-ignore
    return new TokenRefreshLink({
        // @ts-ignore
        isTokenValidOrUndefined: async () => {
            let possibleToken = await getAccessToken();
            return checkToken(possibleToken);
        },
        accessTokenField: "accessToken",
        fetchAccessToken: () => {
            return fetch(REACT_APP_SERVER_ORIGIN, {
                method: "POST",
                credentials: "include",
            });
        },
        handleResponse:
            (_: any, accessTokenField: string) =>
            async (response: Response) => {
                const result = await response.json();
                return {
                    [accessTokenField]: result[accessTokenField],
                };
            },
        handleFetch: (accessTokenPayload: string) => {
            setAccessToken(accessTokenPayload);
        },
        handleError: (error: any) => {
            console.error(error);
        },
    }) as ApolloLink;
}

export function authContextLink(
    getAccessToken: () => Promise<string | null> | string | null
): ApolloLink {
    return new ApolloLink(
        (operation, forward) => new Observable((observer) => {
            let handle: any;
            Promise.resolve(operation)
                .then(async (operation) => {
                    const accessToken = await getAccessToken();
                    if (accessToken) {
                        operation.setContext({
                            headers: {
                                authorization: `Bearer ${accessToken}`,
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
                if (handle)
                    handle.unsubscribe();
            };
        })
    );
}
