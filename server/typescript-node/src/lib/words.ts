const randomWords = require("random-words");

export interface WordObject {
  word: string;
  key: number;
}

export function randomWordsPerRound(amount: number) {
  const words: string[] = randomWords(amount);
  let wordData: WordObject[] = [];
  let count = 0;
  words.forEach((word) => {
    wordData.push({ word: word, key: count });
    count++;
  });
  return wordData;
}
