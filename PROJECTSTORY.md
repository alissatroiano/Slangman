![Slangman Logo](https://i.im.ge/2024/12/15/zPdSOy.logo.png)

## Inspiration

Slangman is an English slang word & phrase game influenced by the classic game, "Hangman". Slangman's humorous (and sometimes explicit) dictionary is a collection of English slang words and terms that are commonly used by Millenials & Gen Z's on the internet and casual settings. 

I was inspired to build Slangman for this hackathon because I believe the fun, anonymous nature of Reddit's platform makes it the perfect place to host a game like this. I'm somewhat new - and freshly addicted - to Reddit myself, and I often don't understand what certain words, terms, and phrases mean. I have already learned a lot of new slang just from testing this, and I think it will be a fun learning experience for boomers and anyone that isn't up-to-current with the latest slang.

## What it does

Using Devvit's Menu actions, Slangman does the following: 
- Allows users to create a post containing the game, by selecting 'Create Slangman Post'.
- Notifies users they have successfully created a new game post, by displaying a toast reading, 'Created Slangman post!'.

Once the post has been generated, users may perform the following actions:
- Read directions on the initial screen, by clicking 'Directions'.
![Directions]()
- Trigger the game webview, by clicking 'Play'
![Play Buttton]()

Once the game webview is triggered, users can do the following with Slangman:
- Use the hint as a guide
- Enter individual letters by clicking on the text input field and typing the letter they want to guess.
- Start over, or choose a new word, by clicking the 'New Word' button.
- When the game is over, users may choose to Play Again by clicking on the, 'Play Again' button.

#### Hangman vs. Slangman

##### Similarities
- Much like classic Hangman, the Hangman figurine will render a new body part with each incorrect letter the user guesses. 
- The user loses the game when the Slangman figurine is complete and they are out of guesses. 

##### Differences
- Unlike classic Hangman, Slangman is **not limited to 8 guesses**. Because a lot of Gen Z and Millenial words and phrases are abbreviated, Slangman was built with custom functionality, so the number of guesses varies based on the length of the current word.
- Slangman is animated, so he waves his arms around (in a comical cry for help from the user).

## How I built it

Slangman was built with the following tools and technologies:

#### Configurations

- [Devvit CLI](https://developers.reddit.com/docs/dev_guide) was used to login to Reddit from local CLI, make a project,  choose a template, and run playtests throughout the development process.

- Devvit **[Webviews](https://developers.reddit.com/docs/webviews)** were used to run HTML, CSS, and JavaScript within my  Reddit app.

#### Game Logic 

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) was used to build out the game's functionality.
  
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) markup was used to build a layout for the game to render. 

- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) was used to update layout structure and style the game.

#### Version Control

- [Git](https://git-scm.com/doc) was used for version control management during local development

- [GitHub](https://github.com) was used to host the project repository/codebase.

#### Data

- [JSON](https://www.json.org/json-en.html) 
  
The game's current dataset (or dictionary) of words was compiled using the following sources:

- [Urban Dictionary Words and Definitions](https://www.kaggle.com/datasets/therohk/urban-dictionary-words-dataset)

- [Gen Z Words and Phrases Dataset](https://www.kaggle.com/datasets/tawfiayeasmin/gen-z-words-and-phrases-dataset)

- [Dictionary.com Slang Dictionary](https://www.dictionary.com/e/slang/)

- [Urban Dictionary Terms Dataset](https://www.kaggle.com/datasets/athontz/urban-dictionary-terms)

## Challenges I ran into

## Accomplishments that I'm proud of

## What I learned

## What's next for Slangman
