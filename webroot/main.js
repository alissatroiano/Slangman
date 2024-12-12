class App {
    constructor() {
        const output = document.querySelector('#messageOutput');
        const usernameLabel = document.querySelector('#username');
        const gameWrapper = document.querySelector('#slangmanWrapper');
        // const message = document.querySelector('#gameMsg');

        // Game state variables
        this.words = [
            { word: "delulu", hint: "Delusional or having unrealistic beliefs or expectations" },
            { word: "bussin", hint: "It's very good." },
            { word: "savage", hint: "Used to describe someone or something as fearless, bold, or ruthless. It's often used humorously or ironically to praise someone's audacity or wit" },
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
        this.message = document.getElementById("gameMsg");
        this.hangmanParts = [
            document.getElementById("head"),
            document.getElementById("body"),
            document.getElementById("right-arm"),
            document.getElementById("left-arm"),
            document.getElementById("right-leg"),
            document.getElementById("left-leg"),
        ];

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

    initializeGameUI() {
        gameWrapper.innerHTML = `
            <p id="hint"></p>
            <p id="displayWord"></p>
            <p class="wrong-letters">Wrong letters: <span id="wrong-letters"></span></p>
            <p class="remaining-guesses">Remaining guesses: <span id="remaining-guesses"></span></p>
            <input type="text" id="letter-input" maxlength="1" autofocus />
            <button id="reset-btn">Play Again</button>
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
        this.selectedWord = randomWordObj.word;
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

        // Ignore if guess is not a single letter or already guessed
        if (!/^[a-z]$/.test(guess) || this.guessedLetters.includes(guess) || this.wrongLetters.includes(guess)) {
            return;
        }

        // Process the guess
        if (this.selectedWord.includes(guess)) {
            this.guessedLetters.push(guess);
        } else {
            this.wrongLetters.push(guess);
            this.remainingGuesses--;

            if (this.wrongLetters.length <= this.hangmanParts.length) {
                this.hangmanParts[this.wrongLetters.length - 1].style.display = "flex";
            }
        }

        // Check game status
        if (this.remainingGuesses <= 0) {
            gameWrapper.innerHTML = `
        <p>Game Over! The word was: <strong>${this.selectedWord}</strong></p>
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
            gameWrapper.innerHTML = `
            <h3 class="game-win-text">Congratulations! You guessed the right word: <strong> ${this.selectedWord} </strong></h3>
             <button class="btn" id="liveReload">Play again?</button>`;
            // window.parent?.showToast(
            //     {
            //         type: 'gameWin',
            //         data: { message: `Congratulations! You guessed the word: ${this.selectedWord}` },
            //     },
            //     '*'
            // );
            let liveReload = document.querySelector("#liveReload");
            liveReload.addEventListener("click", () => {
                this.initializeGameUI();
                this.resetGame();
            });
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
