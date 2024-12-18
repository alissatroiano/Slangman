![Slangman Logo](https://i.im.ge/2024/12/15/zPdSOy.logo.png)

## Inspiration

Slangman is an English slang word & phrase game influenced by the classic game, "Hangman". Slangman's humorous (and sometimes explicit) dictionary is a collection of English slang words and terms that are commonly used by Millenials & Gen Z's on the internet and casual settings. 

I was inspired to build Slangman for this hackathon because I believe the fun, anonymous nature of Reddit's platform makes it the perfect place to host a game like this. I'm somewhat new - and freshly addicted - to Reddit myself, and I often don't understand what certain words, terms, and phrases mean. I have already learned a lot of new slang just from testing this, and I think it will be a fun learning experience for boomers and anyone that isn't up-to-current with the latest slang.

## What it does

Using Devvit's Menu actions, Slangman does the following: 
- Allows users to create a post containing a new Slangman game, by selecting 'Create Slangman Post'.
- Notifies users they have successfully created a new game post, by displaying a toast reading, 'Created Slangman post!'.

Once the post has been generated, users may perform the following actions:
- Read directions on the initial screen, by clicking 'Directions'.
- Trigger the game webview, by clicking 'Play'.

Once the game webview is triggered, users can do the following with Slangman:
- Use the hint as a guide
- Enter individual letters by clicking on the text input field and typing the letter they want to guess.
- Start over, or choose a new word, by clicking the 'New Word' button.
- When the game is over, users may choose to Play Again by clicking on the, 'Play Again' button.

On the backend, regarding data:
- Slangman's GitHub repository has been configured using GitHub Actions, so moderators will automatically be able to update the dataset remotely for competitions and events.

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

- [Devvit CLI](https://developers.reddit.com/docs/dev_guide) was used to:
    - [X] Login to Reddit from my local environment:  `devvit login`
    - [X] Create a new Reddit App using Webview template: `devvit new --template web-view-post`
    - [X] Run playtests throughout development: `devvit playtest r/slangman`
    - [X] Update new versions: `devvit upload`

##### Webviews

Because I am new to Devvit and wanted to create a working program and test it thoroughly before the Hackathon deadline, I  decided to use **[Devvit Webviews](https://developers.reddit.com/docs/webviews)**. 

I chose this template because it made it easy for me to use familiar technolgoies, including HTML, CSS, and JavaScript, for the core functionality of my game.

#### Game Logic 

The following tools were used to build Slangman:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - was used to build out the game's core functionality.
  
- [HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) - markup was used to build a layout for the game to render. 

- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) was used to update layout structure and style the game.

#### Version Control

- [Git](https://git-scm.com/doc) was used for version control management during local development

- [GitHub](https://github.com) was used to host the project repository/codebase.

#### Data

Due to time constraints and Devvit experience level, this version of Slangman will rely on GitHub Actions and Google Apps Scripts to update the dataset for competitions and events.

Data is sent from Google as **.cvs** and programmatically converted to **.json**. 

#### Data Sources

The game's current dataset (or dictionary) of words was compiled using the following sources:

- [Urban Dictionary Words and Definitions](https://www.kaggle.com/datasets/therohk/urban-dictionary-words-dataset)

- [Gen Z Words and Phrases Dataset](https://www.kaggle.com/datasets/tawfiayeasmin/gen-z-words-and-phrases-dataset)

- [Dictionary.com Slang Dictionary](https://www.dictionary.com/e/slang/)

- [Urban Dictionary Terms Dataset](https://www.kaggle.com/datasets/athontz/urban-dictionary-terms)

## Challenges I ran into

Some of the challenges I ran into while building Slangman:

#### Fonts

- I am generally used to using a CDN import or installing fontpacks locally to render fonts. I understand I cannot use a CDN to import fonts into a Devvit App, but I tried local import and a few other methods using JavaScript and was unsuccessful. Because I needed to test and document the game, I had to put this task aside for future releases.

#### Time Constraints

- Unfortunately, I found out about this Hackathon when it was already ongoing. I therefore didn't have much time to get a team together or build a more robust application. Because of these facts, I kept Slangman simple while still making it fun and appropriate for Reddit.

#### TypeScript Experience

- While I am adept in JavaScript and popular JS frameworks, including React, I am quite new to TypeScript. Because of this, I chose to use webviews, so I could build a functioning game on time while still learning how to create and configure Devvit Apps for Reddit.
  
## Accomplishments that I'm proud of

#### MVP 
- [X] Getting a solid MVP up and running while working with Devvit for the first time:
    - While this may not be my most robust application, it achieves it's primary goals for an MVP. I am brand-new to both Typescript and Devvit, so I consider this an achievement.

#### Slangman Behavior

I'm proud of the custom JavaScript functionality I wrote to render Slangman's body parts and/or animations based on the selected word's length and user guesses.

I did not want to define an overwhelming project scope, but I also wanted to make this game unique for Reddit. While I didn't get to finish it entirely, I had some fun animating 'Slangman' based on selected word length and the user's remaining guesses.

#### App Landing Page & Logo

UX Design is very important to me. Because I found out about this Hackathon while it was already going on - and because I am new to Devvit - I didn't get to put as much effort into the game's frontend appearance as I would have liked.
  
That said, I am very proud of the logo I designed for the game's landing page. When a user creates a new Slangman post, this is the first thing they will see, so it's important that it looks clean, professional, and inviting.

## What I learned

1. Just because I'm a JavaScript whiz and I am adept in popular frameworks, like React, does not mean I will be an immediate expert in TypeScript or Devvit's tools.

2. When you upload an App to Devvit, an app account is also automatically created! (.. so, there is nobody stalking you or your app - it's just what it does)

3. You can not use assets from CDN imports within a Devvit App.

4. The styles defined in my regular .css sheet are not going to have any bearing on post size, dimensions, or the way the post preview looks.

5. Columns and layout adjustments for Posts must be achieved using @devvit/kit, not a stylesheet.

## What's next for Slangman

#### Bi-Weekly Competitions

- Devvit scheduler will be implemented to automatically import new datasets for Slangman competitions.
- Competitions & Challenges will be announced on [r/Slangman](https://www.reddit.com/r/slangman/)

#### Country Dropdown

- The country dropdown will allow users to select versions of the game in other languages (example: Singlish Slangman will use a dataset of Singaporean Slang, or Singlish).
- JavaScript will be used to change the  dataset based on the language the user selects.

#### Moderator Dictionary Tools

- Mod Tools will be updated using Typescript and the Devvit API to allow moderators to edit the word dictionary form directly from Reddit's Platform.

#### Dark/Light Mode Toggle

- The Dark/Light Mode Toggle will allow users to select color themes based on their own accessibility preferences (dark mode, light mode, high contrast).

**Note:** Slangman was originally created using package [distratech](https://developers.reddit.com/apps/distratech). During judging, this package will be updated so new versions/releases can be tested without disqualifying Slangman from the hackathon.