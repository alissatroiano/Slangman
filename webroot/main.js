class App {
    constructor() {
        const output = document.querySelector('#messageOutput');
        const usernameLabel = document.querySelector('#username');
        const gameWrapper = document.querySelector('#slangmanWrapper');
        // const message = document.querySelector('#gameMsg');

        // Game state variables
        this.words = []; // Initially empty, will be populated from JSON
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
        this.message = document.getElementById("gameMsg");
        this.hangmanParts = [
            document.getElementById("head"),
            document.getElementById("body"),
            document.getElementById("right-arm"),
            document.getElementById("left-arm"),
            document.getElementById("right-leg"),
            document.getElementById("left-leg"),
            document.getElementById("right-foot"),
            document.getElementById("left-foot")
        ];

        // Bind event listeners
        this.letterInput.addEventListener("input", this.handleGuess.bind(this));
        this.resetButton.addEventListener("click", this.resetGame.bind(this));

        // Start the game
        this.loadWords().then(() => this.startNewGame());

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
                        message.innerText = `Error: ${message.data.message}`;
                        break;

                    case 'gameWin':
                        message.innerText = `Success: ${message.data.message}`;
                        break;

                    default:
                        console.error(`Unknown message type: ${message.type}`);
                }
            }
        });
    }

    // Method to load words from JSON
    async loadWords() {
        try {
            const response = await fetch("data/words.json"); // Fetch JSON file
            if (!response.ok) throw new Error(`Failed to fetch words: ${response.status}`);
            this.words = await response.json(); // Parse JSON and assign to this.words
            console.log("Words loaded successfully:", this.words);
        } catch (error) {
            console.error("Error loading words:", error);
            alert("Failed to load word list. Please try again later.");
        }
    }

    initializeGameUI() {
        gameWrapper.innerHTML = `
        <div class="content font-primary">
                    <p id="displayWord"></p>
                    <input placeholder="Guess letter here" type="text" class="typing-input" id="letter-input" maxlength="1" />
                    <div class="details display-7">
                        <p class="hint">Hint: <span id="hint"></span></p>
                        <p class="guess-left">Remaining guesses: <span id="remaining-guesses"></span></p>
                        <p class="wrong-letter">Wrong letters: <span id="wrong-letters"></span></p>
                    </div>
                    <button id="reset-btn">New Word</button>
           
        `;

        // Re-bind DOM elements to the game
        this.letterInput = document.getElementById("letter-input");
        this.displayWordElement = document.getElementById("displayWord");
        this.hintElement = document.getElementById("hint");
        this.remainingGuessesElement = document.getElementById("remaining-guesses");
        this.wrongLettersElement = document.getElementById("wrong-letters");
        this.resetButton = document.getElementById("reset-btn");

        // Re-bind event listeners
        this.letterInput.addEventListener("input", this.handleGuess.bind(this));
        this.resetButton.addEventListener("click", this.resetGame.bind(this));
    }

    startNewGame() {
        console.log("Starting a new game...");
        this.resetGame(); // Use resetGame logic to start a fresh game
    }

    // Method to reset the game
    resetGame() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        const randomWordObj = this.words[randomIndex];
        this.selectedWord = randomWordObj.word.toLowerCase();
        this.guessLength = this.selectedWord.length;
        this.hint = randomWordObj.hint;
        this.remainingGuesses = this.guessLength;

        this.guessedLetters = [];
        this.wrongLetters = [];
        this.updateDisplay();
        this.hangmanParts.forEach(part => part.style.display = "none");
    }

    // Method to handle user guesses
    handleGuess() {
        let guess = this.letterInput.value.toLowerCase(); // Convert to lowercase
        this.letterInput.value = ""; // Clear input field

        // Ignore invalid guesses or duplicates
        if (!/^[a-z]$/.test(guess) || this.guessedLetters.includes(guess) || this.wrongLetters.includes(guess)) {
            return;
        }

        // Process the guess
        if (this.selectedWord.includes(guess)) {
            this.guessedLetters.push(guess);
        } else {
            this.wrongLetters.push(guess);
            this.remainingGuesses--;

            // Calculate parts per guess
            const totalParts = this.hangmanParts.length;
            const wordLength = this.selectedWord.length;
            const partsPerGuess = wordLength <= 6 ? 2 : 1; // Show 2 parts for short words, 1 for long words

            // Calculate total parts to show so far
            let partsToShow = this.wrongLetters.length * partsPerGuess;

            // Ensure partsToShow doesn't exceed the total available parts
            partsToShow = Math.min(partsToShow, totalParts);

            // Display the parts
            for (let i = 0; i < partsToShow; i++) {
                this.hangmanParts[i].style.display = "flex";
                this.partsToShow++;
            }

            // Animate elements if guesses exceed 8
            if (this.wrongLetters.length > 8) {
                document.getElementById("left-foot").classList.add("wave");
            }

            if (this.wrongLetters.length > 9) {
                document.getElementById("right-foot").classList.add("wave-2");
            }

            if (this.wrongLetters.length > 10) {
                document.getElementById("hangman-wrapper").classList.add("shake"); // Shake the entire wrapper
            }
        }
        // Update the display before checking for win/loss
        this.updateDisplay();

        // Check game status
        if (this.remainingGuesses <= 0) {
            gameWrapper.innerHTML = `
                <h3 class="game-win-text">☠️ Game Over! The word was: <strong>${this.selectedWord}</strong></h3>
                <button class="btn" id="liveReload">Play again?</button>
            `;

            let liveReload = document.querySelector("#liveReload");
            liveReload.addEventListener("click", () => {
                this.initializeGameUI();
                this.resetGame();
            });

            return;
        }

        if (this.getDisplayWord() === this.selectedWord) {
            // Ensure the full word is displayed before ending the game
            this.updateDisplay();

            gameWrapper.innerHTML = `
                <h3 class="game-win-text">🎉 Congratulations! You guessed the word: <strong>${this.selectedWord}</strong></h3>
                <button class="btn" id="liveReload">Play again?</button>`;

            let liveReload = document.querySelector("#liveReload");
            liveReload.addEventListener("click", () => {
                this.initializeGameUI();
                this.resetGame();
            });
            return;
        }
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
