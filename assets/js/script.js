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

// Track last chosen sample index per difficulty to avoid immediate repeats
let lastIndexByLevel = {}

let sampleWords = []
let started = false

function loadSample() {
  const level = document.getElementById("difficultySelect").value
  const list = texts[level]
  let idx = Math.floor(Math.random() * list.length)
  const prev = lastIndexByLevel[level]
  // Ensure a different sentence than the previous one (if possible)
  if (list.length > 1 && idx === prev) {
    while (idx === prev) {
      idx = Math.floor(Math.random() * list.length)
    }
  }
  lastIndexByLevel[level] = idx
  const text = list[idx]
  
  sampleWords = text.split(' ')
  const sampleText = document.getElementById("sampleText")
  sampleText.innerHTML = sampleWords.map(word => `<span>${word}</span>`).join(' ')
  document.getElementById("resultLevel").textContent = level.charAt(0).toUpperCase() + level.slice(1)
}

function checkWords() {
  if (!started) {
    startTimer()
  }
  
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
  startTime = performance.now()
  started = true
  document.getElementById("startBtn").disabled = true
  document.getElementById("stopBtn").disabled = false
  document.getElementById("retryBtn").disabled = true
}

function stopTimer() {
  if (!started) return
  
  const seconds = (performance.now() - startTime) / 1000
  const chars = document.getElementById("typingInput").value.length
  const wpm = (chars / 5) / (seconds / 60)
  
  document.getElementById("resultTime").textContent = seconds.toFixed(2) + "s"
  document.getElementById("resultWPM").textContent = Math.round(wpm)
  document.getElementById("startBtn").disabled = false
  document.getElementById("stopBtn").disabled = true
  document.getElementById("retryBtn").disabled = false
  started = false
}

function retryTest() {
  const typingInput = document.getElementById("typingInput")
  
  // Reset state
  started = false
  
  // Load new sample at same difficulty
  loadSample()
  
  // Clear and enable input
  typingInput.value = ""
  typingInput.disabled = false
  typingInput.focus()
  
  // Reset results display
  document.getElementById("resultTime").textContent = "0s"
  document.getElementById("resultWPM").textContent = "0"
  
  // Update button states
  document.getElementById("startBtn").disabled = false
  document.getElementById("stopBtn").disabled = true
  document.getElementById("retryBtn").disabled = true
}

document.addEventListener("DOMContentLoaded", function () {
  // Move modal to body to fix header/container style issues
  const modal = document.getElementById("instructionsModal")
  if (modal && modal.parentNode !== document.body) {
    document.body.appendChild(modal)
  }
  
  loadSample()
  const typingInput = document.getElementById("typingInput")
  
  document.getElementById("difficultySelect").addEventListener("change", loadSample)
  document.getElementById("startBtn").addEventListener("click", startTimer)
  document.getElementById("stopBtn").addEventListener("click", stopTimer)
  document.getElementById("retryBtn").addEventListener("click", retryTest)
  typingInput.addEventListener("input", checkWords)
  typingInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      stopTimer()
    }
  })
  document.getElementById("stopBtn").disabled = true
  document.getElementById("retryBtn").disabled = true
})
