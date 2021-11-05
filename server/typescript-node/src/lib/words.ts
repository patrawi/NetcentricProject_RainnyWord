const randomWords = require("random-words");

export interface WordObject {
  word: string;
  key: number;
  location : string;
  destroyed : boolean;
  dangerWord : boolean
}

export function randomWordsPerRound(amount: number) {
  const words: string[] = randomWords(amount);
  let wordData: WordObject[] = [];
  let count = 0;
  words.forEach((word) => {
    wordData.push({ word: word, 
                    key: count, 
                    location : Math.floor(Math.random() * 60) + 20 + "vw",
                    destroyed : false,
                    dangerWord :  Math.floor(Math.random() * 70) % 4 === 0 ? true : false,
                  });
    count++;
  });
  return wordData;
}
