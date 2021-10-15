const randomWords = require("random-words");

export function randomWordsFirstRound(amount: number) {
  return randomWords(amount);
}

export function randomWordsSecondRound(amount: number) {
  return randomWords(amount);
}
