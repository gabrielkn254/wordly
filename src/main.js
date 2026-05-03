// DOM Elements
const searchForm = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")

const searchResultsBox = document.getElementById("searchResultsBox")

const searchedWord = document.getElementById("searchedWord")
const phoneticsBox = document.getElementById("phoneticsBox")
const definitionsList = document.getElementById("definitionsList")
const definitionsBox =document.getElementById("definitionsBox")

const myWordsBox = document.getElementById("myWordsBox")
const saveWordBtn = document.getElementById("saveWord")

const toggleTheme = document.getElementById("toggleTheme")
const wordlyLogo =document.getElementById("wordlyLogo")



// fetch items from local storage
const fetchMyWords = () => {
  const storedItems = localStorage.getItem("words")
  return JSON.parse(storedItems) || []
}

let myWords = fetchMyWords()

// dictionary API query
async function dictionary(query){
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
    const data = await response.json()

    return data[0]
    
  } catch (error) {
    console.error("Failed to get data", error)
    return null
  }
}

// Home page reload function
async function loadHomepage() {

  searchedWord.innerHTML = "Loading Page..."
  displayMyWords(myWords)
  const data = await dictionary("word")

    definitionsBox.style.display = "flex"
    saveWordBtn.style.display = "inline-block"
    displayResults(data)
    console.log(data)
}
loadHomepage()

// Detect page reload and display word results
if (window.performance.navigation.type === 1) {
  loadHomepage()
}

wordlyLogo.addEventListener("click", () => {
  loadHomepage()
})

// search word
searchForm.addEventListener('submit', async(event) => {
  event.preventDefault()

  // get input value
  const query = searchInput.value.trim()

  // reset input value
  searchInput.value = ""

  //searching feedback
  searchedWord.innerHTML = "Searching..."

  // valid query and catch error gracefully
  if(query){
    const data = await dictionary(query)

    if(!data){
      searchedWord.innerHTML = "Word not found"
      phoneticsBox.innerHTML = ""
      definitionsList.innerHTML = ""
      definitionsBox.style.display = "none"
      saveWordBtn.style.display = "none"

    
    }else {
      definitionsBox.style.display = "flex"
      saveWordBtn.style.display = "inline-block"
      displayResults(data)
      console.log(data)
    }
    
  }

})

// render Results
function displayResults(data){

  const word = data.word

  // run rendering functions
  searchedWord.innerHTML = `${word}`
  displayPhonetics(data.phonetics)
  displayMeanings(data.meanings)

}

// paint phonetics result box
function displayPhonetics(phonetics){

  // clear DOM element
  phoneticsBox.innerHTML = ""

  // initilize a loop to give each audio element a unique id
  let i = 0

  // iterate phonetics array and add items to phonetics box
   if(phonetics){
    phonetics.forEach((item) => {

      if(!item.text){
        return
      } else if(item.audio === ''){
          phoneticsBox.innerHTML += `
          <div class="phonetic">
            <p>${item.text}</p>
          </div>
          `
      } else {
          phoneticsBox.innerHTML += `
          <div class="phonetic">
            <button class="audio-button" id="audioButton" onclick="playAudio('audioElement${i}')">
              
              <svg>
                <use href="/assets/icons/audio.svg"></use>
              </svg>

              <audio id="audioElement${i}" src="${item.audio}">
              </audio>
            </button>
            <p>${item.text}</p>
          </div>
          `
      }
      i++
    })

   }

}

// iterate definitions result
function displayMeanings(meanings){

  //clear the DOM
  definitionsList.innerHTML = ""

  // validate value and iterate the meanings list for each part of speech
   if(meanings){
    meanings.forEach((item) => {

      //iterate idividual defines and return an array of list elements
      const defines = []
      item.definitions.forEach((item) => { 
        defines.push(`<li>
            <p>${item.definition}</p>
            <blockquote>
              Synonyms: <span>${item.synonyms.join('')}</span> <br>
              Example: <span>${item.example}</span>
            </blockquote>
          </li>`)
        
      })

      // append the part of speech item to the definitions list DOM
      definitionsList.innerHTML += `
      <div class="part-of-speech">

        <p class="part-title">/${item.partOfSpeech}/</p>
        <ol class = "meanings-list">
          ${defines.join()}
        </ol>
      </div>
      `
    })

   }

}

// Play Phonetic Audio
function playAudio(audioElement){
  const audioWord = document.getElementById(audioElement)

  audioWord.play()
}

// save word
function saveMyWords(){
  const newWord = searchedWord.textContent

  const exists = myWords.find(word => word === newWord)

  console.log(exists)
  if(!exists){
    myWords.push(newWord)
    localStorage.setItem("words", JSON.stringify(myWords))

    myWords = fetchMyWords()
    displayMyWords(myWords)
    changeSaveBtnText("✔️Saved")
  } else {
    changeSaveBtnText("Word already saved")
  }


}

// render my words
function displayMyWords(myWords){
  myWordsBox.innerHTML = ""

  if(myWords.length === 0){
    myWordsBox.innerHTML = '<li class="my-word"><span>No saved words yet</span></li>'

    return
  } 

  myWords.forEach(item => {

    const listItem = `
    <li class="my-word">
      <span>${item}</span>
      <button class="delete-word-btn" title="Delete Word">X</button>
    </li>`

    myWordsBox.innerHTML += listItem
  })

}

// change saveWordBtn textcontent
function changeSaveBtnText(text){

  saveWordBtn.textContent = text
  saveWordBtn.disabled = true
  setTimeout(() => {
    saveWordBtn.innerHTML = "🔖Save Word"
    saveWordBtn.disabled = false
  }, 3000)
}

// listen saveWordBtn click event
saveWordBtn.addEventListener("click", () => {
  saveMyWords()
})


// delete saved words
myWordsBox.addEventListener("click", (event) => {
  const isDeleteBtn = event.target.classList.contains("delete-word-btn")

  if(isDeleteBtn){
    const item = event.target.previousElementSibling
    const targetWord = item.textContent

    myWords = myWords.filter(word => word !== targetWord)

    localStorage.setItem("words", JSON.stringify(myWords))
    displayMyWords(myWords)

  }
  console.log("clicked")
})

// theme toogle
toggleTheme.addEventListener("click", () => {

    const htmlElement = document.documentElement
    let theme = htmlElement.getAttribute("data-theme")

    if (theme === "dark") {

    htmlElement.setAttribute("data-theme", "light")
    toggleTheme.innerHTML = '<svg><use href="/assets/icons/light.svg"></use></svg>'

  } else {
    htmlElement.setAttribute("data-theme", "dark")
    htmlElement["data-theme"] = "dark"

    toggleTheme.innerHTML = '<svg><use href="/assets/icons/dark.svg"></use></svg>'
  }
})

