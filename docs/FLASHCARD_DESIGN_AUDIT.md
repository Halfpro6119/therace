# Flashcard Design Audit – Science Lab

**Date:** February 2025  
**Scope:** Card structure, prompts, content generation, and learning effectiveness

---

## 1. Current Design Summary

### Card Types

| Type | Source | Front Prompt Pattern | Back Content |
|------|--------|----------------------|--------------|
| **Concept** | SCIENCE_CONCEPTS | "What is the core idea behind {topic}?" | coreIdea, keyTerms, misconceptionWarning |
| **Process chain** | concept.changeScenarios | scenario.prompt | explanation (→-separated), keyTerms |
| **Misconception** | SCIENCE_MISCONCEPTIONS | "What is wrong with this idea: \"{misconception}\"?" | correctUnderstanding, keyTerms, example |
| **Practical** | SCIENCE_PRACTICALS | "What is the purpose of {title}?" / "What are the variables in {title}?" | purpose / IV, DV, controlled |
| **Equation** | SCIENCE_EQUATIONS | "In {equation}, what does {symbol} represent?" | symbol name, unit, description |

---

## 2. Design Issues Identified

### 2.1 Concept Cards

| Issue | Impact |
|-------|--------|
| **Repetitive prompt** | Every concept uses "What is the core idea behind X?" – predictable, low discrimination |
| **Topic in prompt** | Often gives away the answer (e.g. "What is the core idea behind Diffusion?" → answer is about diffusion) |
| **No question variety** | Missing: "Why does X happen?", "How does X differ from Y?", "What happens when Z changes?" |
| **Visual underused** | `diagramId` exists but only `description` is shown; no actual diagram rendering |
| **One card per concept** | Dense coreIdea could be split into 2–3 focused cards |

### 2.2 Process Chain Cards

| Issue | Impact |
|-------|--------|
| **Arrow-only explanation** | "A → B → C" is compact but less readable; could use full sentences |
| **Same misconception on all** | Every scenario card repeats concept.commonMisconception – may not fit the scenario |
| **No reverse** | "What causes X?" exists but not "What is the result of Y?" |

### 2.3 Misconception Cards

| Issue | Impact |
|-------|--------|
| **"What is wrong" framing** | Requires meta-reasoning; "True or False: [statement]" would test recognition directly |
| **Misconception in prompt** | Good – exposes the wrong idea before correction |
| **Example placement** | Example on back is strong; could add "Why it's wrong" (whyWrong) as optional |

### 2.4 Practical Cards

| Issue | Impact |
|-------|--------|
| **Only 2 cards per practical** | Purpose + Variables. Missing: method key steps, risks, graph expectations, evaluation |
| **Hardcoded keyTerms** | `['purpose', 'investigate', 'determine']` – not extracted from content |
| **Topic = title** | practical.title used as topic; doesn't match concept topics (e.g. "Cell Biology") for filtering |
| **Generic prompts** | Same template for all – "What is the purpose of X?" |

### 2.5 Equation Cards

| Issue | Impact |
|-------|--------|
| **Symbol → meaning only** | No reverse: "What symbol represents force?" or "What is the equation for acceleration?" |
| **unitTraps unused** | Equations have unitTraps but flashcards don't surface them |
| **Rearranging unused** | rearrangingPrompts exist but no flashcard tests rearrangement |
| **One symbol per card** | Good granularity; could add equation-as-whole card |

### 2.6 extractKeyTerms

| Issue | Impact |
|-------|--------|
| **Fixed word list** | ~40 terms; misses many (e.g. "turgid", "plasmolysed", "carrier protein") |
| **Substring match** | "concentration" matches "concentration gradient" – can duplicate |
| **Returns empty** | Many cards get no key terms highlighted |
| **Not content-aware** | Doesn't extract from the actual explanation text |

---

## 3. Learning Design Principles Applied

| Principle | Current | Target |
|-----------|---------|--------|
| **One idea per card** | Mostly yes | Maintain; split dense concepts |
| **Active recall** | Prompt asks question | Strengthen with varied question types |
| **Desirable difficulty** | Low – topic often in prompt | Remove hints; use "it" instead of topic name where possible |
| **Concrete examples** | Misconceptions have examples | Add to concepts where missing |
| **Dual coding** | Visual description only | Render diagrams when diagramId present |
| **Interleaving** | Blocked by topic | Shuffle; mix card types |
| **Retrieval practice** | Read then rate | Add cloze / type-to-reveal variants |

---

## 4. Improvements Implemented

### 4.1 extractKeyTerms
- **Expanded vocabulary** – 60+ science terms (turgid, plasmolysed, carrier protein, mitosis, meiosis, etc.)
- **Longer phrases first** – "concentration gradient" before "concentration" to avoid substring duplicates
- **Unit extraction** – Regex for g, kg, mol, N, J, s, m/s², °C, V, A, Ω, Hz, etc.
- **Cap at 8 terms** – Prevents clutter on card back

### 4.2 Concept Cards
- **Varied prompts** – Rotate between "What is the core idea?", "Explain the key concept...", "What must you understand?"
- **Visual type mapping** – flow, cell, particle, energy, foodChain → diagram for type safety

### 4.3 Misconception Cards
- **True or False variant** – Every other misconception gets a second card: "True or False: [statement]"
- **Back:** "False. [correctUnderstanding]" – Tests quick recognition

### 4.4 Practical Cards
- **Purpose** – keyTerms now extracted from content (fallback to purpose/investigate/determine)
- **Risk card** – New card per practical: "What is a hazard and how do you control it?"
- **Graph card** – When graphExpectations exists: "What graph do you plot and what trend do you expect?"

### 4.5 Equation Cards
- **Reverse card** – One per equation: "What is the equation for [topic]?"
- **Unit trap card** – One per equation with unitTraps: "Why is [wrongUnit] wrong? What is correct?"
- **Back** – Full explanation from unitTraps data

### 4.6 Deferred (Future)
- **Diagram rendering** – concept.visualModel.diagramId exists but DiagramRenderer requires metadata from DB; concept IDs may not map 1:1
- **Cloze/fill-in-blank** – Would require new card type and content structure
