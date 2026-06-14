# 🇫🇷 Français MTL — French Learning App for Montreal

A fully functional web app for learning French through the 3,000 most common words, with a focus on real-life usage in Montreal.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Features

### 📖 Vocabulary
- 150+ carefully curated words from the most common French vocabulary
- Context words (le, la, de...) marked separately — taught through grammar, not flashcards
- Filter by category, difficulty level, and search by word
- Expandable cards showing example sentences and common collocations
- Track words as "learned" with progress saved to localStorage

### 🌿 Word Families
- Master key verbs (faire, avoir, prendre, aller, être) through their most common expressions
- Learn collocations: *faire du sport*, *avoir besoin de*, *prendre rendez-vous*
- Phrase chunks: ready-to-use expressions like *il y a*, *ça va*, *je voudrais*

### 💬 Sentences
- 50+ example sentences in real Montreal contexts
- **Browse mode**: see French sentences with key words highlighted, reveal translations
- **Cloze (fill in the blank)**: type missing words to practice active recall
- Grammar notes explain the structure of each sentence

### 📐 Grammar
- 10 progressive lessons from absolute beginner to intermediate
- Each lesson includes: explanation, examples table, quiz, and common mistakes
- Lessons: Greetings, -ER Verbs, Être, Avoir, Negation, Questions, Passé Composé, Imparfait, Near Future, Articles
- Quiz completion tracked with XP rewards

### 🍁 Montreal Survival French
- 28+ phrases organized into 12 real-life categories
- Every phrase includes: French, English, pronunciation hint, when to use it, and a sample dialogue
- Quebec-specific notes (dépanneur, tantôt, bienvenue = you're welcome, etc.)
- Categories: Café, Restaurant, Transit, Grocery, Pharmacy, Medical, Housing, Workplace, Directions, Quebec Expressions, Phone, Polite Phrases

### 🎯 Practice Modes
- **Flashcards**: Flip cards with mark-as-learned tracking
- **Multiple Choice**: 10-question randomized vocabulary quizzes with feedback
- **Fill in the Blank**: Type missing words from real French sentences
- **Sentence Translation**: Recall English translations, mark correct/incorrect

### 📊 Progress
- Vocabulary coverage: tracks your % of the top 3,000 French words
- Per-category vocabulary breakdown with progress bars
- Grammar lesson completion
- Quiz score history
- Daily streak counter

### ⚙️ Settings
- Dark mode toggle
- Adjustable daily word goal (5–30 words)
- Data validation tool — checks for missing translations, duplicate words, etc.
- Reset progress

## Tech Stack

- **React 19** + **Vite 8**
- **react-router-dom** for navigation (single-page state-based navigation)
- **localStorage** for progress persistence — no backend required
- Pure CSS with CSS custom properties (variables) for theming

## Project Structure

```
src/
├── data/
│   ├── vocabulary.js    # 150+ words with examples, collocations, categories
│   ├── wordFamilies.js  # Word family expressions + phrase chunks
│   ├── sentences.js     # 50+ example sentences with cloze exercises
│   ├── grammar.js       # 10 grammar lessons with quizzes
│   ├── montreal.js      # 28 Montreal survival phrases with dialogues
│   └── validation.js    # Data quality validation utilities
├── context/
│   └── AppContext.jsx   # Global state (progress, settings, dark mode)
├── hooks/
│   └── useProgress.js   # Progress tracking hook
├── pages/
│   ├── Dashboard.jsx
│   ├── Vocabulary.jsx
│   ├── WordFamilies.jsx
│   ├── Sentences.jsx
│   ├── Grammar.jsx
│   ├── Montreal.jsx
│   ├── Practice.jsx
│   ├── Progress.jsx
│   └── Settings.jsx
└── components/
    └── Sidebar.jsx
```

## Learning Philosophy

This app teaches vocabulary through **usage, not memorization**:

- Function words (le, la, de, à...) are flagged as context words and taught through grammar lessons and sentences — not isolated flashcards
- Common verbs are grouped into **word families** showing their most frequent collocations
- All vocabulary is presented with example sentences and collocations
- Montreal-specific content teaches the French you'll actually need daily in Quebec

## Data Validation

Run the built-in validator from Settings → Run Validation. It checks:
- Duplicate words
- Missing translations or example sentences
- Suspiciously short non-context words
- Grammar lessons missing quizzes or examples

## Building for Production

```bash
npm run build
```

Output goes to `dist/` — serve with any static file server.

## License

MIT
