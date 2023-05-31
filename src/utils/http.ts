import { ApolloLink } from "@apollo/client";
import { checkToken } from "./util";
import { setContext } from "@apollo/client/link/context";
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
            let possibleToken = getAccessToken();
            return checkToken(
                typeof possibleToken === "object"
                    ? await possibleToken
                    : possibleToken
            );
        },
        accessTokenField: "accessToken",
        fetchAccessToken: () => {
            return fetch(REACT_APP_SERVER_ORIGIN, {
                method: "POST",
                credentials: "include",
            });
        },
        handleResponse:
            (_: any, accessTokenField: string | number) =>
            async (response: Response) => {
                const result = await response.json();
                console.log(result);
                return {
                    [accessTokenField]: result[accessTokenField],
                };
            },
        handleFetch: (accessTokenPayload: string) => {
            setAccessToken(accessTokenPayload);
        },
        handleError: (err: any) => {
            console.error(err);
        },
    }) as ApolloLink;
}

export function authContextLink(
    getAccessToken: () => Promise<string | null> | string | null
): ApolloLink {
    return setContext(async (_req: any, { headers }: any) => {
        const token = await getAccessToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            },
        };
    });
}
