"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomWordsPerRound = void 0;
const randomWords = require("random-words");
function randomWordsPerRound(amount) {
    const words = randomWords(amount);
    let wordData = [];
    let count = 0;
    words.forEach((word) => {
        wordData.push({ word: word,
            key: count,
            location: Math.floor(Math.random() * 60) + 20 + "vw",
            destroyed: false,
            dangerWord: Math.floor(Math.random() * 70) % 4 === 0 ? true : false,
        });
        count++;
    });
    return wordData;
}
exports.randomWordsPerRound = randomWordsPerRound;
