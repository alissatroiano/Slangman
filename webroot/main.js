class App {
    constructor() {
        // Game state variables
        this.words = [
            { word: "sus", hint: "Short for 'suspicious,'" },
            { word: "delulu", hint: "Delusional or having unrealistic beliefs or expectations" },
            { word: "bussin", hint: "It's very good." },
            { word: "goat", hint: "Greatest of All Time" },
        ];
        this.selectedWord = "";
        this.hint = "";
        this.remainingGuesses = 0;
        this.guessedLetters = [];
        this.wrongLetters = [];
        this.displayWord = "";

        // DOM elements
        this.letterInput = document.getElementById("letter-input");
        this.displayWordElement = document.getElementById("displayWord");
        this.hintElement = document.getElementById("hint");
        this.remainingGuessesElement = document.getElementById("remaining-guesses");
        this.wrongLettersElement = document.getElementById("wrong-letters");
        this.resetButton = document.getElementById("reset-btn");
        this.progressMsg = document.getElementById("progressMsg");
        // Bind event listeners
        this.letterInput.addEventListener("input", this.handleGuess.bind(this));
        this.resetButton.addEventListener("click", this.resetGame.bind(this));
        
        // Start the game
        this.startNewGame(); // Call startNewGame instead of resetGame here
    }

    // Method to start a new game
    startNewGame() {
        console.log("Starting a new game...");
        this.resetGame(); // Use resetGame logic to start a fresh game
    }

    // Method to reset the game
    resetGame() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        const randomWordObj = this.words[randomIndex];
        this.selectedWord = randomWordObj.word;
        this.guessLength = 3;
        this.hint = randomWordObj.hint;
        this.remainingGuesses = this.guessLength;
        this.guessedLetters = [];
        this.wrongLetters = [];
        this.updateDisplay();
    }

    // Method to handle user guesses
    handleGuess() {
        const guess = this.letterInput.value.toLowerCase();
        this.letterInput.value = ""; // Clear input field

        // Ignore invalid input or already guessed letters
        if (!guess || this.guessedLetters.includes(guess) || this.wrongLetters.includes(guess)) {
            return;
        }

        // Process the guess
        if (this.selectedWord.includes(guess)) {
            this.guessedLetters.push(guess);
        } else {
            this.wrongLetters.push(guess);
            this.remainingGuesses--;
        }

        // Check game status
        if (this.remainingGuesses <= 0) {
            alert("Game Over! The word was: " + this.selectedWord);
            this.resetGame();
            return;
        }

        if (this.getDisplayWord() === this.selectedWord) {
            alert("Congratulations! You guessed the word: " + this.selectedWord);
            this.resetGame();
            return;
        }

        // Update the display
        this.updateDisplay();
    }

    // Method to generate the display word with underscores
    getDisplayWord() {
        return this.selectedWord
            .split("")
            .map((letter) => (this.guessedLetters.includes(letter) ? letter : "_"))
            .join("");
    }

    // Method to update the DOM
    updateDisplay() {
        this.displayWordElement.textContent = this.getDisplayWord();
        this.hintElement.textContent = this.hint;
        this.remainingGuessesElement.textContent = this.remainingGuesses;
        this.wrongLettersElement.textContent = this.wrongLetters.join(", ");
    }
}

new App();