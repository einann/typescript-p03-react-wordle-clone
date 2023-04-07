import { useState, useEffect } from "react";

type GameBoxProps = {
    targetWord: string,
    word: string,
    finalWords: string[],
    currentRow: number,
    gameFinished: boolean,
}
const initRows = [
    { id: 1, fw: "" },
    { id: 2, fw: "" },
    { id: 3, fw: "" },
    { id: 4, fw: "" },
    { id: 5, fw: "" },
    { id: 6, fw: "" },
]
export const GameBox = ({ targetWord, word, finalWords, currentRow, gameFinished }: GameBoxProps) => {
    const [rows, setRows] = useState(initRows)

    useEffect(() => {
        const nextRows = rows.map(row => {
            if (row.id === currentRow) {
                return {
                    ...row,
                    fw: finalWords[row.id - 1]
                }
            }
            else return row;
        });
        setRows(nextRows)
    }, [currentRow]);

    useEffect(() => {
        if (finalWords.length) {
            const finalRows: { id: number, fw: string }[] = [];
            for (let i = 0; i < 6; i++) {
                if (finalWords[i]) finalRows.push({ id: i+1, fw: finalWords[i] });
                else finalRows.push({ id: i+1, fw: "" });
            }
            setRows(finalRows);
        }
    }, [finalWords]);

    return (
        <div>
            {rows.map(row => {
                return (
                    <div key={`${row.id}`}>
                        {
                            row["fw"] ?
                                <div className='box-container' key={`row-${row.id}`}>
                                    <div className={`box ${row.fw[0] === targetWord[0] ? 'exact' : (targetWord.includes(row.fw[0]) ? 'contains' : '')}`}>{row.fw[0]}</div>
                                    <div className={`box ${row.fw[1] === targetWord[1] ? 'exact' : (targetWord.includes(row.fw[1]) ? 'contains' : '')}`}>{row.fw[1]}</div>
                                    <div className={`box ${row.fw[2] === targetWord[2] ? 'exact' : (targetWord.includes(row.fw[2]) ? 'contains' : '')}`}>{row.fw[2]}</div>
                                    <div className={`box ${row.fw[3] === targetWord[3] ? 'exact' : (targetWord.includes(row.fw[3]) ? 'contains' : '')}`}>{row.fw[3]}</div>
                                    <div className={`box ${row.fw[4] === targetWord[4] ? 'exact' : (targetWord.includes(row.fw[4]) ? 'contains' : '')}`}>{row.fw[4]}</div>
                                </div>
                                :
                                <div className='box-container'>
                                    <div className='box'>{(row.id - 1 === currentRow && !gameFinished) ? word[0] : ""}</div>
                                    <div className='box'>{(row.id - 1 === currentRow && !gameFinished) ? word[1] : ""}</div>
                                    <div className='box'>{(row.id - 1 === currentRow && !gameFinished) ? word[2] : ""}</div>
                                    <div className='box'>{(row.id - 1 === currentRow && !gameFinished) ? word[3] : ""}</div>
                                    <div className='box'>{(row.id - 1 === currentRow && !gameFinished) ? word[4] : ""}</div>
                                </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}