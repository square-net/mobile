import AsyncStorage from '@react-native-community/async-storage';

const token = "token";

export async function getItem(key: string): Promise<string | null> {
    const value = AsyncStorage.getItem(key);
    return value;
}

export async function setItem(key: string, value: string): Promise<void> {
    return AsyncStorage.setItem(key, value);
}

export async function removeItem(key: string): Promise<void> {
    return AsyncStorage.removeItem(key);
}

export const getToken = () => getItem(token);
export const removeToken = () => removeItem(token);
export const setToken = (value: string) => setItem(token, value);
