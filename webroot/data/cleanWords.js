import fs from 'fs/promises';

const loadJSON = async (filePath) => {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
};

// Function to replace the word in the hint with "this word"
function replaceWordInHints(wordsData) {
    return wordsData.map(entry => {
        const wordRegex = new RegExp(entry.word, 'gi'); // Case-insensitive replacement
        entry.hint = entry.hint.replace(wordRegex, "THIS WORD");
        return entry;
    });
}

const main = async () => {
    const filePath = 'webroot/data/words.json'; // Path to your JSON file
    const data = await loadJSON(filePath);

    // Replace words in the hints
    const updatedData = replaceWordInHints(data);

    // Write the updated data back to a file
    await fs.writeFile('webroot/data/words.json', JSON.stringify(updatedData, null, 2));

    console.log("Hints updated and saved to 'updated_words.json'.");
};

main().catch(err => console.error("Error:", err));
