import jwtDecode from "jwt-decode";

export type TokenType = {
    id: number;
    tokenVersion: number;
    sessionId: string;
    iat: number;
    exp: number;
};

export const checkToken = (token?: string | null): boolean => {
    if (!token) {
        return true;
    }

    try {
        const { exp } = jwtDecode(token) as TokenType;
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
};
