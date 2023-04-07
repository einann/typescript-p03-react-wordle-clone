import { getStorageItem } from '../util/storageOperations';

type AllResultsProps = {
    setIsOpen: (param: boolean) => void;
}

export const AllResults = ({ setIsOpen }: AllResultsProps) => {
    const results = getStorageItem("allResults")!;
    const elements: JSX.Element[][] = [];
    results.forEach((res, index) => {
        for (let i = 0; i < res; i++) {
            if (elements[index]) elements[index].push(<div className='res-box-element'></div>)
            else elements[index] = [<div className='res-box-element'></div>]
        }
    });

    return (
        <div>
            <div className="ar-container">
                <button style={{ alignSelf: "flex-end", cursor: "pointer" }} onClick={() => setIsOpen(false)}>Kapat</button>
                {results.map((res, index) => {
                    return (
                        <div className='res-each-row' key={`res-${index}`}>{index + 1}. deneme: {elements[index]}</div>
                    )
                })}

            </div>
        </div>
    )
}