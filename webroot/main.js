class App {
    constructor() {
        const output = document.querySelector('#messageOutput');
        const usernameLabel = document.querySelector('#username');
        const wordLabel = document.querySelector('#wordLabel');

        // Game state variables
        this.words = [
            { word: "sus", hint: "Short for 'suspicious,'" },
            { word: "delulu", hint: "Delusional or having unrealistic beliefs or expectations" },
            { word: "bussin", hint: "It's very good." },
            { word: "goat", hint: "Greatest of All Time" },
            { word: "dude", hint: "A versatile term used to address a person, often a friend or acquaintance. It's commonly associated with surfer culture but has become a mainstream slang term" },
            { word: "savage", hint: "Used to describe someone or something as fearless, bold, or ruthless. It's often used humorously or ironically to praise someone's audacity or wit" },
            { word: "fomo", hint: "acronym for 'fear of missing out,' referring to the anxiety or apprehension one feels when they think others are having enjoyable experiences without them" },
            { word: "malarkey", hint: "Nonsense or foolish talk" },
            { word: "ratchet", hint: "Low-class or trashy" }
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

        window.addEventListener('message', (ev) => {
            const { type, data } = ev.data;

            // Reserved type for messages sent via `context.ui.webView.postMessage`
            if (type === 'devvit-message') {
                const { message } = data;

                // Always output full message
                output.replaceChildren(JSON.stringify(message, undefined, 2));

                // Handle different message types
                switch (message.type) {
                    case 'initialData':
                        const { username } = message.data;
                        usernameLabel.innerText = username;
                        break;

                    case 'gameOver':
                        const { gameOverMsg } = message.data;
                        wordLabel.innerText = gameOverMsg;
                        break;

                    case 'gameWin':
                        const { gameWinMsg } = message.data;
                        wordLabel.innerHTML = gameWinMsg;
                        break;

                    default:
                        console.error(`Unknown message type: ${message.type}`);
                }
            }
        });
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
        this.guessLength = 5;
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
            // Send 'Game Over' message
            window.parent?.postMessage(
                {
                    type: 'gameOver',
                    data: { gameOverMsg: `Game Over! The word was: ${this.selectedWord}` },
                },
                '*'
            );
            this.resetGame();
            return;
        }

        if (this.getDisplayWord() === this.selectedWord) {
            // Send 'Congratulations' message
            window.parent?.postMessage(
                {
                    type: 'gameWin',
                    data: { gameWinMsg: `Congratulations! You guessed the word: ${this.selectedWord}` },
                },
                '*'
            );
            this.resetGame();
            return;
        }

        // Update the display
        this.updateDisplay();
        console.log(ev.data);

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