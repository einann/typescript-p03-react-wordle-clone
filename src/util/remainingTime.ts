import { getStorageItem } from "./storageOperations";

const timeFormatter = (hourTime: number) => {
    const decimal = hourTime - Math.floor(hourTime);
    const minutes = Math.floor(+decimal.toFixed(2)*60);
    Math.floor(hourTime)
    return Math.floor(hourTime) + " saat" + " " + minutes + " dakika";
}

export const getRemainingTime = () => {
    if (getStorageItem("expDate")) {
        const strgDate = getStorageItem("expDate")!;
        const diff = strgDate - new Date().getTime();
        const hoursDiff = timeFormatter(diff/60000/60);
        return hoursDiff;
      }
}