export type StorageType = {
    results: {
        day: number,
        month: number,
        year: number,
        row: number
        finalWords: string[],
    },
    expDate: number,
    allResults: number[]
}

export const setStorageItem = <T extends keyof StorageType>(key: T, value: StorageType[T]): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export const getStorageItem = <T extends keyof StorageType>(key: T): StorageType[T] | null => {
    return JSON.parse(window.localStorage.getItem(key) || "") as StorageType[T];
}