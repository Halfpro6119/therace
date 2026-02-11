# AQA GCSE Computer Science (8525) — Full Implementation Plan

**Purpose:** Make learning effective and engaging so students cover all test topics and build computational thinking, programming, and theoretical knowledge required by AQA assessment objectives.  
**Specification:** AQA GCSE Computer Science 8525 (linear; first teaching September 2025, exams from 2027).  
**Date:** February 2025.

---

## 1. AQA Computer Science Topic List (Summary)

### 1.1 Assessment Structure

| Paper | Title | Duration | Marks | Content assessed |
|-------|--------|----------|-------|------------------|
| **Paper 1** | Computational thinking and programming skills | 2 hours | 90 | 3.1 Fundamentals of algorithms, 3.2 Programming |
| **Paper 2** | Computing concepts | 1 hour 45 mins | 90 | 3.3 Data representation, 3.4 Computer systems, 3.5 Networks, 3.6 Cyber security, 3.7 Relational databases & SQL, 3.8 Ethical, legal and environmental impacts |

**Assessment:** MCQ, short answer, longer answer, extended response. Synoptic questions may draw from across the specification. Paper 1 includes programming in C#, Python 3, or VB.NET.

---

### 1.2 Unit Overview

| Unit | Title | Paper | Key content |
|------|------|-------|--------------|
| **3.1** | Fundamentals of algorithms | 1 | Representing algorithms, efficiency, linear/binary search, merge/bubble sort |
| **3.2** | Programming | 1 | Data types, concepts, arithmetic/relational/Boolean ops, data structures, I/O, string handling, subroutines, robust testing |
| **3.3** | Fundamentals of data representation | 2 | Number bases, binary/hex conversion, units, binary arithmetic, character encoding, images, sound, compression |
| **3.4** | Computer systems | 2 | Hardware/software, Boolean logic, OS types, translators, systems architecture, memory, storage |
| **3.5** | Fundamentals of computer networks | 2 | LAN/WAN/PAN, protocols, TCP/IP model, security methods |
| **3.6** | Cyber security | 2 | Threats (social engineering, malware, pharming, etc.), penetration testing, detection/prevention |
| **3.7** | Relational databases and SQL | 2 | Tables, keys, records, SELECT/INSERT/UPDATE/DELETE |
| **3.8** | Ethical, legal and environmental impacts | 2 | Privacy, autonomous vehicles, implants, hacking, cloud, mobile, etc. |

---

## 2. Full AQA Topic List (By Unit)

### 2.1 Unit 3.1 — Fundamentals of algorithms

| Sub-topic | Content |
|-----------|---------|
| **3.1.1** Representing algorithms | Algorithm, decomposition, abstraction; pseudo-code, flowcharts, program code; inputs, processing, outputs; trace tables; purpose of simple algorithms |
| **3.1.2** Efficiency of algorithms | Multiple algorithms for same problem; compare time efficiency |
| **3.1.3** Searching algorithms | Linear search (mechanics); binary search (mechanics); compare and contrast |
| **3.1.4** Sorting algorithms | Merge sort (mechanics); bubble sort (mechanics); compare and contrast |

### 2.2 Unit 3.2 — Programming

| Sub-topic | Content |
|-----------|---------|
| **3.2.1** Data types | Integer, real, Boolean, character, string |
| **3.2.2** Programming concepts | Variable/constant declaration, assignment, iteration, selection, subroutine; definite (FOR) and indefinite (WHILE/REPEAT/DO) iteration; nested selection/iteration; meaningful identifiers |
| **3.2.3** Arithmetic operations | Addition, subtraction, multiplication, real division, integer division (DIV), remainder (MOD) |
| **3.2.4** Relational operations | Equal to, not equal to, less than, greater than, less than or equal to, greater than or equal to |
| **3.2.5** Boolean operations | NOT, AND, OR |
| **3.2.6** Data structures | Arrays (1D and 2D), records |
| **3.2.7** Input/output | Keyboard input, display output |
| **3.2.8** String handling | Length, position, substring, concatenation; character ↔ character code; string ↔ integer/real conversion |
| **3.2.9** Random number generation | Use random number generation |
| **3.2.10** Subroutines | Procedures and functions; parameters; return values; local variables; structured approach; advantages |
| **3.2.11** Robust and secure programming | Data validation, authentication routines; testing (normal, boundary, erroneous data); syntax vs logic errors |

### 2.3 Unit 3.3 — Fundamentals of data representation

| Sub-topic | Content |
|-----------|---------|
| **3.3.1** Number bases | Decimal, binary, hexadecimal; why computers use binary; why hex is used |
| **3.3.2** Converting between bases | Binary ↔ decimal ↔ hexadecimal (0–255) |
| **3.3.3** Units of information | Bit, byte; kilo, mega, giga, tera (decimal prefixes) |
| **3.3.4** Binary arithmetic | Add up to 3 binary numbers (max 8 bits); binary shift; multiplication/division by powers of 2 |
| **3.3.5** Character encoding | 7-bit ASCII, Unicode; character ↔ code conversion; grouping/sequence |
| **3.3.6** Representing images | Pixel, bitmap size (width × height), colour depth; file size formula; binary ↔ bitmap conversion |
| **3.3.7** Representing sound | Analogue → digital; sampling rate, sample resolution; file size formula |
| **3.3.8** Data compression | Huffman coding (tree, bits); RLE (frequency/data pairs) |

### 2.4 Unit 3.4 — Computer systems

| Sub-topic | Content |
|-----------|---------|
| **3.4.1** Hardware and software | Define hardware and software; relationship |
| **3.4.2** Boolean logic | Truth tables for NOT, AND, OR, XOR; logic circuits; Boolean expressions (A.B+C̅ notation) |
| **3.4.3** Software classification | System vs application software; OS functions (processor, memory, I/O, applications, security); utility programs |
| **3.4.4** Programming languages and translators | Low-level vs high-level; machine code vs assembly; interpreter, compiler, assembler; when to use each |
| **3.4.5** Systems architecture | CPU (ALU, control unit, clock, registers, bus); Fetch-Execute cycle; RAM, ROM, cache, register; main vs secondary storage; volatile/non-volatile; SSD vs magnetic; cloud storage; embedded systems |

### 2.5 Unit 3.5 — Fundamentals of computer networks

| Sub-topic | Content |
|-----------|---------|
| **3.5.1** Networks | Definition; advantages/disadvantages; LAN, WAN, PAN; wired vs wireless |
| **3.5.2** Protocols | TCP/IP, HTTP, HTTPS, SMTP, IMAP; purpose of common protocols |
| **3.5.3** Network security | Firewall, MAC address filtering, encryption, authentication |
| **3.5.4** TCP/IP model | Application, transport, internet, link layers; which protocols operate at which layer |

### 2.6 Unit 3.6 — Cyber security

| Sub-topic | Content |
|-----------|---------|
| **3.6.1** Fundamentals | Define cyber security; main purposes |
| **3.6.2** Threats | Social engineering (blagging, phishing, shouldering); malware (virus, trojan, spyware); pharming; weak/default passwords; misconfigured access; removable media; unpatched software |
| **3.6.2** Penetration testing | Definition; insider vs external attack simulation |
| **3.6.3** Detection and prevention | Biometrics, password systems, CAPTCHA, email confirmations, automatic updates |

### 2.7 Unit 3.7 — Relational databases and SQL

| Sub-topic | Content |
|-----------|---------|
| **3.7.1** Relational databases | Database concept; table, record, field, primary key, foreign key; data redundancy/inconsistency |
| **3.7.2** SQL | SELECT, FROM, WHERE, ORDER BY; INSERT INTO; UPDATE; DELETE FROM (queries up to 2 tables) |

### 2.8 Unit 3.8 — Ethical, legal and environmental impacts

| Sub-topic | Content |
|-----------|---------|
| **3.8.1** Impacts | Ethical, legal, environmental impacts of digital technology; data privacy; exam topics: autonomous vehicles, computer implants, wearables, hacking, cloud storage, wireless, mobile, cyber security |

---

## 3. Design Principles for Effective & Engaging Learning

- **Align with AQA:** Every activity must map to spec content. Paper 1 focuses on computational thinking and programming; Paper 2 on theory and SQL.
- **Programming first:** Paper 1 requires design, write, test and refine program code; students need practical experience. Use in-browser or simulated environments where possible.
- **AQA pseudo-code:** Exam questions use AQA standard pseudo-code. Students must recognise and produce it; exam questions may require pseudo-code, program code, or flowchart.
- **Trace tables:** Trace tables and visual inspection are essential for algorithm understanding. Provide interactive trace tables.
- **Test data types:** Normal, boundary, erroneous—practise selecting and justifying test data.
- **Calculations:** Binary/hex conversion, bitmap file size, sound file size, Huffman compression—all need calculation practice.
- **Logic and circuits:** Truth tables and Boolean expressions are core; visual logic circuit builder.
- **SQL practice:** Students must write and refine SQL; support SELECT, INSERT, UPDATE, DELETE.
- **Cross-topic links:** Synoptic assessment means topics interconnect (e.g. binary in data representation underpins logic elsewhere).
- **Reuse app patterns:** Mirror Science Lab / Business Hub—concept → flashcard → quick check → questions; progress and gating; config-driven content.

---

## 4. Proposed Learning Hub: “Compute Lab”

- **Entry:** From Subjects page, “Computer Science” links to `/compute-lab` (new hub, parallel to Science Lab / Business Hub). Add to `subjectGroups.ts` as a featured hub.
- **Structure:** Two main strands—**Paper 1** (algorithms + programming) and **Paper 2** (theory + SQL). Optional filter by unit (3.1–3.8).
- **Learning modes:** Concept-first, then terminology, then application (trace tables, code, questions, calculations).

---

## 5. Learning Modes (Effective & Engaging)

### 5.1 Concept Lab (Learn)

- **Purpose:** Build understanding before terminology and exam-style questions.
- **Content per concept:** Core idea (1–2 sentences), optional visual (e.g. flowchart, logic diagram, CPU diagram), common misconception, and “change scenarios” (e.g. “If we double the sampling rate, how does file size change?”).
- **Coverage:** At least one concept per sub-topic (3.1.1–3.8.1); more for dense sub-topics (e.g. 3.2 programming concepts, 3.4 architecture).
- **Engagement:** Short scenarios (“A program needs to sort 1000 items. Which algorithm would you choose and why?”); links to real-world examples.

### 5.2 Glossary / Flashcard Mode

- **Purpose:** Learn definitions and key terms so application and extended answers are precise.
- **Content:** Term → definition; optional “in context” sentence; link to unit/sub-topic.
- **Modes:** Classic flip card; “type the term” or “match term–definition”; confidence rating (like Science Lab) for spaced repetition.
- **Coverage:** Full spec glossary (algorithm, decomposition, abstraction, variable, subroutine, primary key, malware, etc.).
- **Engagement:** Group by unit or by theme (“Programming terms”, “Data representation terms”).

### 5.3 Algorithm Lab (Trace Tables & Flowcharts)

- **Purpose:** Build fluency in tracing and interpreting algorithms.
- **Content:** Given pseudo-code or flowchart, trace step-by-step; fill in trace table; determine output or purpose.
- **Formats:**  
  - Interactive trace table (fill in variable values as algorithm runs).  
  - “What is the output?” after N iterations.  
  - “Which search/sort would use fewer comparisons?”  
  - Drag-and-drop (order steps of merge sort).
- **Coverage:** Linear/binary search, merge/bubble sort; simple programs with loops and selection.
- **Engagement:** Step-through animation; reveal one step at a time.

### 5.4 Code Lab (Programming Practice)

- **Purpose:** Practise writing, testing and debugging code in exam-style context.
- **Content:**  
  - Write pseudo-code in AQA format.  
  - Write program code (Python 3 preferred for web; or C#/VB.NET if sandboxed).  
  - Convert between pseudo-code and flowchart.  
  - Identify syntax vs logic errors.
- **Coverage:** All 3.2 topics—data types, control structures, loops, subroutines, validation, authentication.
- **Engagement:** In-browser sandbox (e.g. Python via Pyodide or similar); instant feedback; test data selection.

### 5.5 Quick Check (Micro-assessments)

- **Purpose:** Check understanding before unlocking longer questions; reduce illusion of competence.
- **Formats:**  
  - Multiple choice (definition, “best” reason, “which factor…”).  
  - True/False.  
  - Short “one phrase” or “one number” (e.g. “What base is hexadecimal?” → “16”).  
  - Drag-and-drop (e.g. order TCP/IP layers; match protocol to layer).  
  - “Which two of the following…” (AO1/AO2).
- **Coverage:** At least 3–5 items per sub-topic.
- **Gating:** Unlock Code Lab / Question Lab per unit when Quick Check passed (e.g. ≥70%).

### 5.6 Calculation Lab

- **Purpose:** Practise all spec calculations with instant feedback.
- **Content:**  
  - Binary ↔ decimal ↔ hexadecimal conversion.  
  - Binary addition (up to 3 numbers).  
  - Binary shift (multiply/divide by 2).  
  - Bitmap file size: (W × H × D) / 8 bytes.  
  - Sound file size: rate × resolution × seconds.  
  - Huffman coding: bits required; compare with uncompressed ASCII.  
  - RLE: frequency/data pairs.
- **Format:** Short scenario → calculation(s) → “What is the…?” with numeric input.
- **Coverage:** 3.3.2, 3.3.4, 3.3.6, 3.3.7, 3.3.8.

### 5.7 Logic Lab (Boolean Logic & Circuits)

- **Purpose:** Practise truth tables, logic circuit diagrams, and Boolean expressions.
- **Content:**  
  - Construct truth table for given circuit (up to 3 inputs).  
  - Create logic circuit from Boolean expression.  
  - Write Boolean expression for given circuit (AQA notation: . for AND, + for OR, ⊕ for XOR, overbar for NOT).  
  - Given truth table, identify circuit.
- **Coverage:** 3.4.2.
- **Engagement:** Interactive drag-and-drop circuit builder.

### 5.8 SQL Lab

- **Purpose:** Practise writing, testing and refining SQL.
- **Content:**  
  - Given table schema, write SELECT queries (with WHERE, ORDER BY).  
  - Extract data from up to 2 tables.

  - INSERT, UPDATE, DELETE.  
  - Identify primary/foreign keys; explain redundancy.
- **Coverage:** 3.7.1, 3.7.2.
- **Engagement:** In-browser SQL runner (e.g. SQL.js or similar); sample databases.

### 5.9 Question Lab (Exam-style Questions)

- **Purpose:** Practise MCQ, short answer, longer answer, extended response.
- **Content:**  
  - Paper 1: algorithm tracing, code completion, debugging, efficiency comparison.  
  - Paper 2: theory questions, calculations, SQL, ethical/legal/environmental.
- **Coverage:** All units; mix of question types.
- **Feedback:** Mark-scheme-style breakdown.

### 5.10 Topic Overview & Revision Map

- **Purpose:** Show coverage at a glance; “start here” and “what’s next” per unit/paper.
- **Content:** Per unit: list of sub-topics with Concept, Glossary, Quick Check, Algorithm Lab, Code Lab, Calculation Lab, Logic Lab, SQL Lab, Question Lab status.
- **Engagement:** Progress bars per unit/paper; link to next recommended activity.

---

## 6. Content Plan (By Unit)

| Unit | Concepts | Glossary terms | Quick Check | Algorithm Lab | Code Lab | Calculation Lab | Logic Lab | SQL Lab | Question Lab |
|------|----------|----------------|-------------|---------------|----------|-----------------|-----------|---------|--------------|
| **3.1** Algorithms | 3–4 | 15+ | 15+ | 8–10 | — | — | — | — | 10+ |
| **3.2** Programming | 8+ | 40+ | 40+ | 5–8 | 15–20 | — | — | — | 10+ |
| **3.3** Data representation | 6+ | 25+ | 25+ | 2–3 | — | 15–20 | — | — | 10+ |
| **3.4** Computer systems | 6+ | 30+ | 25+ | — | — | — | 10–15 | — | 10+ |
| **3.5** Networks | 3+ | 15+ | 15+ | — | — | — | — | — | 5+ |
| **3.6** Cyber security | 3+ | 15+ | 15+ | — | — | — | — | — | 5+ |
| **3.7** SQL | 2+ | 10+ | 10+ | — | — | — | — | 10–15 | 5+ |
| **3.8** Ethical/legal | 2+ | 10+ | 10+ | — | — | — | — | — | 5+ |

---

## 7. Technical Implementation Outline

### 7.1 Routes and entry

- Add **Compute Lab** to `subjectGroups.ts` (new `SubjectHub`).
- Routes under `/compute-lab`: home, units, unit/:unitId, unit/:unitId/topics, unit/:unitId/concept, unit/:unitId/flashcard, unit/:unitId/algorithm-lab, unit/:unitId/code-lab, unit/:unitId/quick-check, unit/:unitId/calculation-lab, unit/:unitId/logic-lab, unit/:unitId/sql-lab, unit/:unitId/question-lab.
- Optional: `/compute-lab/paper/1` and `/compute-lab/paper/2` to filter by paper.

### 7.2 Data and types

- **Types** (e.g. `src/types/computeLab.ts`): `ComputeUnit`, `ComputeTopic`, `Concept`, `Term`, `TraceTableTask`, `CodeTask`, `QuickCheckItem`, `CalculationTask`, `LogicCircuitTask`, `SqlTask`, `QuestionItem`.
- **Config** (e.g. `src/config/computeLabData.ts`):  
  - Units and topics aligned to 3.1–3.8.  
  - Concepts (core idea, misconception, change scenarios).  
  - Glossary (term, definition, unitId/topicId).  
  - Trace table tasks (pseudo-code, initial values, expected output).  
  - Code tasks (spec, language, starter code, test cases).  
  - Quick Check items (type, question, options, correct, topicId).  
  - Calculation tasks (scenario, calculation type, inputs, expected, interpretation).  
  - Logic circuit tasks (truth table, circuit, expression).  
  - SQL tasks (schema, task, expected result).  
  - Question items (paper, topicId, type, question, mark scheme).

### 7.3 Storage and progress

- **Progress:** Per-unit or per-topic: flashcard mastery %, quick check passed, algorithm lab completed, code lab completed, calculation lab completed, logic lab completed, SQL lab completed, question lab completed.
- **Gating:** Unlock Code Lab / Question Lab when Concept + Glossary + Quick Check done for that topic/unit.
- Reuse patterns from `storage.ts` and Science Lab.

### 7.4 Specialised components

- **Code sandbox:** Python via Pyodide or Monaco + backend for syntax/execution. C#/VB.NET may require separate backend or external service.
- **SQL runner:** SQL.js in browser; sample databases (e.g. students, products, orders).
- **Logic circuit builder:** Interactive diagram (canvas/SVG) with NOT, AND, OR, XOR gates; drag-and-drop; auto-generate truth table.
- **Trace table UI:** Step-through with variable columns; highlight current line.
- **Binary/hex converter:** Interactive input with live conversion.

### 7.5 Reuse from existing codebase

- **Flashcard:** Logic and UI similar to `ScienceLabFlashcardPage`.
- **Quick Check:** Similar to `ScienceLabQuickCheckPage` and `generateQuickChecks`.
- **Concept:** Similar to `ScienceLabConceptLabPage`.
- **Question Lab:** Similar to Science Lab question types and grading.

---

## 8. Phasing (Suggested)

| Phase | Scope | Outcome |
|-------|--------|--------|
| **1** | Types + config skeleton; Compute Lab home + unit list; Concept Lab for 3.1 and 3.3 (one each) | Proof of structure; two units navigable |
| **2** | Glossary + Flashcard mode for all units; Quick Check for 3.1, 3.3, 3.4 | Learn and check flow |
| **3** | Algorithm Lab: trace tables for 3.1 (search, sort, simple programs) | Interactive trace practice |
| **4** | Calculation Lab: binary/hex, bitmap, sound, Huffman, RLE | All calculation types covered |
| **5** | Logic Lab: truth tables, circuits, Boolean expressions | 3.4.2 coverage |
| **6** | Code Lab: pseudo-code tasks; basic Python sandbox for 3.2 | Programming practice |
| **7** | SQL Lab: SELECT, INSERT, UPDATE, DELETE with sample DB | 3.7 coverage |
| **8** | Question Lab: full question bank across all units; mark-scheme feedback | Exam-style practice |
| **9** | Full content: all concepts, glossary, quick checks, labs for 3.1–3.8; gating and progress; topic map | Full spec coverage |
| **10** | Polish: Paper 1/2 filter, “next step” recommendations, accessibility | Production-ready |

---

## 9. Engagement Tactics (Summary)

- **Scenarios and cases:** Every unit uses “a program like X” or “a system like Y” so content feels applied.
- **Algorithm visualisation:** Step-through animations for search and sort; show comparisons.
- **Real-world hooks:** Where useful, mention real applications (e.g. encryption, compression, databases).
- **Cross-topic links:** “This affects data representation because…”, “Binary underpins logic.”
- **Clear path:** “Start with Concept → Glossary → Quick Check → Algorithm Lab / Code Lab / Calculation Lab / Logic Lab / SQL Lab → Question Lab” in UI.
- **Progress and gating:** Unlock harder tasks only after basics; show progress per unit and per paper.
- **Varied formats:** Mix MCQ, drag-and-drop, short text, calculations, code, trace tables, logic circuits to maintain interest.
- **Mark-scheme visibility:** Show “idea mark”, “application”, “evaluation” where applicable.

---

## 10. References

- [AQA GCSE Computer Science 8525 — Subject content](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content)
- [AQA GCSE Computer Science 8525 — Specification at a glance](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/specification-at-a-glance)
- [AQA GCSE Computer Science 8525 — Fundamentals of algorithms](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/fundamentals-of-algorithms)
- [AQA GCSE Computer Science 8525 — Programming](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/programming)
- [AQA GCSE Computer Science 8525 — Fundamentals of data representation](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/fundamentals-of-data-representation)
- [AQA GCSE Computer Science 8525 — Computer systems](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/computer-systems)
- [AQA GCSE Computer Science 8525 — Fundamentals of computer networks](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/fundamentals-of-computer-networks)
- [AQA GCSE Computer Science 8525 — Cyber security](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/cyber-security)
- [AQA GCSE Computer Science 8525 — Relational databases and SQL](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/relational-databases-and-structured-query-language-sql)
- [AQA GCSE Computer Science 8525 — Ethical, legal and environmental impacts](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification/subject-content/ethical-legal-and-environmental-impacts-of-digital-technology-on-wider-society-including-issues-of-privacy)
- In-repo: `src/config/scienceLabData.ts`, `src/config/businessHubData.ts`, `src/types/scienceLab.ts`, `src/config/subjectGroups.ts`

---

*This plan gives a complete map from the AQA Computer Science 8525 topic list and assessment structure to a structured, engaging Compute Lab that covers all test topics and aligns with the app’s existing patterns (Science Lab, Business Hub, config-driven content, progress and gating).*
