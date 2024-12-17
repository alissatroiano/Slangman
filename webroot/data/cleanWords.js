const fs = require('fs');

// Load your JSON data
const data = require('./words.json');

// Function to replace the word in the hint with "this word"
function replaceWordInHints(wordsData) {
    return wordsData.map(entry => {
        const wordRegex = new RegExp(entry.word, 'gi'); // Case-insensitive replacement
        entry.hint = entry.hint.replace(wordRegex, "this word");
        return entry;
    });
}

// Replace words in the hints
const updatedData = replaceWordInHints(data);

// Write the updated data back to a file
fs.writeFileSync('updated_words.json', JSON.stringify(updatedData, null, 2));

console.log("Hints updated and saved to 'updated_words.json'.");
