import { allWords } from "./words";

export const generateRandomWord = () => {
    const random = generateRandomNumber(0, allWords.length);
    return allWords[random];
}

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}