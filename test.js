class App {
    constructor() {
        const words = [
            "java",
            "javascript",
            "python",
            "pascal",
            "ruby",
            "perl",
            "swift",
            "kotlin",
        ];
        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex];
        const guessBtn = document.getElementById("guessBtn");
        console.log(selectedWord);
        const inputElement = document.getElementById("letter-input");
    
        // Geting random word from the list
        let randomIndex = Math.floor(Math.random() * words.length);
        let selectedWord = words[randomIndex];
        console.log(selectedWord);

        // To store the already guessed letters
        let guessedlist = [];
        guessBtn.addEventListener('click', () => {
            window.parent?.postMessage(
                { type: 'setWord', data: { newCounter: Number(score + 1) } },
                '*'
            );
        });

        // For initial display Word
        let displayWord = "";
        for (let i = 0; i < selectedWord.length; i++) {
            displayWord += "_ ";
        }
        document.getElementById("displayWord").textContent = displayWord;
      
        // Function to check Guessed letter
     
    }
}
    
new App();