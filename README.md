<a id="top"></a>

# TypeRacer

A simple, responsive typing speed test that lets users practice typing passages at different difficulty levels, with live accuracy feedback and results for time and words per minute (WPM).

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How To Use](#how-to-use)
- [Key Behaviors](#key-behaviors)
- [Tech Stack](#tech-stack)
- [Notes & Troubleshooting](#notes--troubleshooting)
- [Roadmap Ideas](#roadmap-ideas)
- [Credits](#credits)

## Features

[Back to top](#top)

- Difficulty levels: Easy, Medium, Hard (random passage per retry, no immediate repeats)
- Auto-start on typing: timer begins on the first keystroke
- Stop on Enter: press Enter to finish and record results
- Live accuracy feedback: words turn blue when correct, red when incorrect
- Results panel: displays selected level, elapsed time (seconds), and WPM
- Retry flow: loads a new passage in the same difficulty and resets the test
- Fully client-side: HTML, CSS, JavaScript, Bootstrap 5 (CDN)

## Project Structure

[Back to top](#top)

```
Type-Racer/
├─ index.html
├─ README.md
└─ assets/
	 ├─ css/
	 │  └─ style.css
	 └─ js/
			└─ script.js
```

## Getting Started

[Back to top](#top)

You can open `index.html` directly in a browser, but using a local server is recommended so all features (like the Bootstrap bundle) work consistently.

### Run with Python (Windows PowerShell)

1. Open PowerShell in the project folder
2. Start a local server:

```powershell
python -m http.server 8000
```

3. Open http://127.0.0.1:8000/ in your browser

If you use a different port, update the URL accordingly.

## How To Use

[Back to top](#top)

1. Select a difficulty from the dropdown
2. Start typing in the textbox (timer starts automatically)
3. Press Enter to stop the test
4. See your Level, Time (in seconds), and WPM in the Results panel
5. Click Retry to load a new sentence at the same difficulty and try again

## Key Behaviors

[Back to top](#top)

- Live feedback: as you type, each word in the sample text is compared to your input word-by-word
  - Correct words: blue
  - Incorrect words: red
- WPM calculation: based on total characters typed, using the standard 5-characters-per-word formula
- Retry: clears the input, resets results, and loads a new random passage at the current difficulty (avoids immediate repeats when possible)

## Tech Stack

[Back to top](#top)

- HTML5, CSS3, JavaScript (no frameworks)
- Bootstrap 5 via CDN (layout and modal)

## Notes & Troubleshooting

[Back to top](#top)

- If styles look off, ensure you have an internet connection for the Bootstrap CDN.
- The Instructions modal is moved to `document.body` at runtime to avoid container clipping.
- If Enter inserts a new line instead of stopping, ensure the Bootstrap JS bundle isn’t interfering and that `script.js` loads after the DOM.

## Roadmap Ideas

[Back to top](#top)

- Real-time per-character highlighting and caret alignment
- Accuracy percentage and error counts
- Personal best history (localStorage)
- Shareable results and leaderboard
- Mobile keyboard optimizations and better screen-reader support

## Credits

[Back to top](#top)

Built as a practice project to learn DOM manipulation, event handling, and basic UX for typing tests.
