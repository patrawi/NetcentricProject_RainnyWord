const randomWords = require("random-words");

export function randomWordsPerRound(amount: number) {
  return randomWords(amount);
}
