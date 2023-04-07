import './App.css';
import { useState, useEffect } from 'react';
import { GameBox } from './components/GameBox';
import { AllResults } from './components/AllResults';
import { generateRandomWord } from './util/wordGenerator';
import { setStorageItem, getStorageItem, StorageType } from './util/storageOperations';
import { getCookie, setCookie } from 'typescript-cookie';
import { getRemainingTime } from './util/remainingTime';

const turkishSpecialKeyCodes = [73, 191, 186, 219, 220, 221, 222];
let targetWord = "";

if (getCookie("tw") === undefined) {
  targetWord = generateRandomWord();
  setCookie("tw", targetWord, { expires: 1 });
  localStorage.removeItem("results");
  setStorageItem("expDate", new Date().setDate(new Date().getDate() + 1));
}
else targetWord = getCookie("tw")!;

let defaultRes = {} as StorageType;
if (!localStorage.getItem("results")) localStorage.setItem("results", JSON.stringify(defaultRes));
if (!localStorage.getItem("allResults")) localStorage.setItem("allResults", JSON.stringify([0, 0, 0, 0, 0, 0]));

let rt = getRemainingTime();

function App() {
  const [accepted, setAccepted] = useState(false);
  const [word, setWord] = useState<string>("");
  const [currentRow, setCurrentRow] = useState(0);
  const [finalWords, setFinalWords] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(rt);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storageItem = getStorageItem("results");
    if (storageItem && Object.keys(storageItem).length > 0) {
      setFinalWords(storageItem.finalWords);
      setCurrentRow(storageItem.row + 1);
      if (storageItem.finalWords.includes(targetWord)) {
        setGameFinished(true);
      }
    }
  }, []);

  const handlePress = (e: KeyboardEvent) => {
    if (((e.which >= 65 && e.which <= 90) || turkishSpecialKeyCodes.includes(e.which))) {
      setAccepted(false)
      setWord(prev => prev.length < 5 ? prev + e.key.toLocaleUpperCase("tr-TR") : prev);
    }
    else if (e.which === 8) {
      setWord(prev => prev.length > 0 ? prev.slice(0, -1) : prev);
    }
    else if (e.which === 13) {
      setAccepted(true);
    }
  }
  useEffect(() => {
    if (accepted && word.length === 5) {
      setFinalWords(prev => [...prev, word]);
      setCurrentRow(prev => prev + 1);
      setWord("");
      if (word === targetWord) {
        setGameFinished(true);
        console.log(currentRow);

        let allResStorage = getStorageItem("allResults")!;
        allResStorage[currentRow]++;
        setStorageItem("allResults", allResStorage)
      }
      setResult();
    }
  }, [accepted]);

  useEffect(() => {
    if (!gameFinished) document.addEventListener("keydown", handlePress);
    return () => {
      document.removeEventListener("keydown", handlePress);
    }
  }, [gameFinished]);

  const setResult = () => {
    const date = new Date();
    const res = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      row: currentRow,
      finalWords: [...finalWords, word]
    }
    setStorageItem("results", res)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 60000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <>
      <div className="App">
        <div>
          <div className='new-word-time'>Bir sonraki oyuna kalan süre: {remainingTime} </div>
          <div className='word-area-container'>
            <GameBox targetWord={targetWord} word={word} finalWords={finalWords} currentRow={currentRow} gameFinished={gameFinished} />
          </div>
          <button className='all-results-button' onClick={() => setIsModalOpen(true)}>Sonuçlar</button>
        </div>
      </div>
      {isModalOpen && <AllResults setIsOpen={setIsModalOpen} /> }
    </>
  );
}

export default App;
