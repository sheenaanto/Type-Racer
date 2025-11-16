const texts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "Typing regularly will help you become faster and more accurate.",
  ],
  medium: [
    "When coding, focus on clarity and consistency to reduce errors.",
    "Practice makes progress: short, frequent sessions beat long, rare ones.",
    "Speed increases after accuracy improves — concentrate on correct typing first.",
  ],
  hard: [
    "Sphinx of black quartz, judge my vow — punctuation and uncommon words improve dexterity.",
    "Advanced typists practice punctuation, capitalization and number sequences to simulate real text.",
    "Complex sentences with clauses, commas, and parentheses train muscle memory under pressure.",
  ],
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function loadSample(level) {
  const difficultySelect = document.getElementById("difficultySelect")
  const sampleText = document.getElementById("sampleText")
  const resultLevel = document.getElementById("resultLevel")
  const key = String(level || (difficultySelect ? difficultySelect.value : "easy")).toLowerCase()
  const list = texts[key] || texts.easy
  sampleText.textContent = randomItem(list)
  if (resultLevel) resultLevel.textContent = key.charAt(0).toUpperCase() + key.slice(1)
}

let startTime = 0
let running = false

function startTimer() {
  if (running) return

  startTime = performance.now()
  running = true
  startBtn.disabled = true
  stopBtn.disabled = false
  retryBtn.disabled = true
  typingInput.value = ""
  typingInput.focus()
}

function stopTimer() {
  if (!running) return

  const elapsed = (performance.now() - startTime) / 1000
  resultTime.textContent = elapsed.toFixed(2) + "s"
  // Placeholder simple WPM (optional future refinement)
  const chars = typingInput.value.length
  const wpm = elapsed > 0 ? (chars / 5) / (elapsed / 60) : 0
  resultWPM.textContent = Math.round(wpm)
  running = false
  startBtn.disabled = false
  stopBtn.disabled = true
  retryBtn.disabled = false
}

function retryTest() {

  running = false
  resultTime.textContent = "0s"
  resultWPM.textContent = "0"
  typingInput.value = ""
  startBtn.disabled = false
  stopBtn.disabled = true
  retryBtn.disabled = true
  loadSample()
}

document.addEventListener("DOMContentLoaded", function () {
  loadSample()
  const difficultySelect = document.getElementById("difficultySelect")

  const typingInput = document.getElementById("typingInput")
  const startBtn = document.getElementById("startBtn")
  const stopBtn = document.getElementById("stopBtn")
  const retryBtn = document.getElementById("retryBtn")
  const resultTime = document.getElementById("resultTime")
  const resultWPM = document.getElementById("resultWPM")
  stopBtn.disabled = true
  retryBtn.disabled = true
    difficultySelect.addEventListener("change", function () { loadSample() })
  startBtn.addEventListener("click", startTimer)
  stopBtn.addEventListener("click", stopTimer)
  retryBtn.addEventListener("click", retryTest)
})
