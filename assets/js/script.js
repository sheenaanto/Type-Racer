   // Sample texts for each difficulty level
      function initializeSamples() {
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

        const difficultySelect = document.getElementById("difficultySelect")
        const sampleText = document.getElementById("sampleText")
        const resultLevel = document.getElementById("resultLevel")

        function randomItem(arr) {
          return arr[Math.floor(Math.random() * arr.length)]
        }

        function loadSample(level) {
          const key = String(level).toLowerCase()
          const list = texts[key] || texts.easy
          const text = randomItem(list)
          sampleText.textContent = text
          if (resultLevel)
            resultLevel.textContent = key.charAt(0).toUpperCase() + key.slice(1)
        }

        document.addEventListener("DOMContentLoaded", function () {
          // load initial sample based on current select value (or default to easy)
          const initial = difficultySelect ? difficultySelect.value : "easy"
          loadSample(initial)

          // if (difficultySelect) {
          difficultySelect.addEventListener("change", function (e) {
            loadSample(e.target.value)
          })
          // }
        })
      }
      // Initialize samples
      initializeSamples()