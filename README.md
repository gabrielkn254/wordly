# Wordly- Single Page Application (SPA)
Wordly is a responsive, single page learning application that allows users to search for a word, view their definition, and save their favorite terms for future reference. It is built iwth Vanilla web technologies and integrates with [dictionary API](https://dictionaryapi.dev/)

## Features
- Search Word: search for a word definition.
- Word Definations: Get word meanings, part of speech, synonyms and example in a sentence.
- Word Pronunciation: Play voice pronunciation.
- Save words: Save words to a "My Words List" and access their definations. Users can can delete words from the list.
- Toggle Theme: Users can toogle the app theme: Light & Dark Theme.

## Technologies Used
- HTML5: Semantic markup and structure.
- CSS: Flexbox, CSS Grid & Responsive media queries.
- Javascript:
  - (Async/await and fetch API) for data fetching.
  - Event Delegation for optimized DOM event handling.
  - localStorage API for persisting user data.

## Getting Started
You only a web browser to run this application.

### installation / Execution
1. Clone the repository:

  git clone https://https://github.com/gabrielkn254/wordly

2. Navigate to the project directory:
  
  cd wordly

3. Open the index.html file in your browser.


## Project Structure
- index.html: The main HTML strcture, including the search form, word results placeholder, "My Words List".
- styles.css: All application styling.
- main.js: Core app logic handling API calls, DOM manipulation and event listeners.

## API Reference
This app relies on a free Dictionary API
 - Word Search: https://api.dictionaryapi.dev/api/v2/entries/en/{word}

 ## License
 This project is licensed under the MIT License.