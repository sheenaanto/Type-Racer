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

let sampleWords = []

function loadSample() {
  const level = document.getElementById("difficultySelect").value
  const list = texts[level]
  const text = list[Math.floor(Math.random() * list.length)]
  
  sampleWords = text.split(' ')
  const sampleText = document.getElementById("sampleText")
  sampleText.innerHTML = sampleWords.map(word => `<span>${word}</span>`).join(' ')
  document.getElementById("resultLevel").textContent = level.charAt(0).toUpperCase() + level.slice(1)
}

function checkWords() {
  const typed = document.getElementById("typingInput").value.split(' ')
  const spans = document.querySelectorAll('#sampleText span')
  
  spans.forEach((span, i) => {
    span.className = ''
    if (typed[i]) {
      span.className = typed[i] === sampleWords[i] ? 'correct' : 'incorrect'
    }
  })
}

let startTime = 0

function startTimer() {
  const input = document.getElementById("typingInput")
  startTime = performance.now()
  input.value = ""
  input.focus()
  document.getElementById("startBtn").disabled = true
  document.getElementById("stopBtn").disabled = false
  document.getElementById("retryBtn").disabled = true
}

function stopTimer() {
  const seconds = (performance.now() - startTime) / 1000
  const chars = document.getElementById("typingInput").value.length
  const wpm = (chars / 5) / (seconds / 60)
  
  document.getElementById("resultTime").textContent = seconds.toFixed(2) + "s"
  document.getElementById("resultWPM").textContent = Math.round(wpm)
  document.getElementById("startBtn").disabled = false
  document.getElementById("stopBtn").disabled = true
  document.getElementById("retryBtn").disabled = false
}

function retryTest() {
  document.getElementById("typingInput").value = ""
  document.getElementById("resultTime").textContent = "0s"
  document.getElementById("resultWPM").textContent = "0"
  document.getElementById("startBtn").disabled = false
  document.getElementById("stopBtn").disabled = true
  document.getElementById("retryBtn").disabled = true
  loadSample()
}

document.addEventListener("DOMContentLoaded", function () {
  loadSample()
  document.getElementById("difficultySelect").addEventListener("change", loadSample)
  document.getElementById("startBtn").addEventListener("click", startTimer)
  document.getElementById("stopBtn").addEventListener("click", stopTimer)
  document.getElementById("retryBtn").addEventListener("click", retryTest)
  document.getElementById("typingInput").addEventListener("input", checkWords)
  document.getElementById("stopBtn").disabled = true
  document.getElementById("retryBtn").disabled = true
})
