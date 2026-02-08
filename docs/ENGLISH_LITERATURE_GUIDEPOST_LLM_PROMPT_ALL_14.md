# Full one-shot prompt: Generate all 14 Literature GuidePost packs

Copy everything below the line into an LLM in one go. It will produce full packs (checklist, mark scheme, step-by-step method, model answers 4/6/8/9) for all 14 tasks that currently lack them.

---

You are an expert GCSE English Literature examiner. Produce a **full GuidePost pack** for each of the 14 tasks listed below. Each pack has four parts:

1. **checklistItems**: Array of 10–14 Grade 9 tickable items. Each item: `{ "id": "{TASK_ID}-1", "label": "I...", "ao": "AO1"|"AO2"|"AO3" }`. ids use numbers 1,2,3... Cover: argument/focus, evidence (short embedded quotes), methods (language/structure, link to focus), context (woven in), Grade 9 thinking (alternative interpretations, critical voice).

2. **markSchemeDetail**: Single string. Include AO1 (12 marks): what top-band does vs weak (focus, quotations, argument). AO2 (12 marks): methods with purpose, structure/form, terminology vs listing/ignoring structure. AO3 (6 marks) for poetry/set text: context woven in vs bolted on. End with "Weak: ..." listing weak habits. Use \n for newlines.

3. **stepByStepMethod**: Single string. Time-boxed steps (e.g. Step 1 (2 min): ... Step 2 (5 min): ... Step 4 (30 min): write ... Step 5 (5 min): upgrade). Total ~45 min. Be specific to the question.

4. **modelAnswers**: Object with keys grade4, grade6, grade8, grade9. Each value is a string (multiple paragraphs with \n\n). Length: ~200–350 words for 4, up to ~350–400 for 9. Short embedded quotations only. Grade 4: clear, simple, some method. Grade 6: clear argument, named techniques. Grade 8: sustained argument, strong AO2, context linked. Grade 9: perceptive, conceptual, critical voice, alternative interpretation where appropriate, context deepens argument. For comparison tasks, both poems in every paragraph.

**Standards:** Examiner-faithful (what examiners reward, not vague advice). No "quote → technique → effect" formula. Link methods to the question focus. Context woven in, not bolted on.

---

**TASKS TO DO (all 14):**

1. **P-S01** | seen-single | How does the poet present power in Ozymandias? | power | Ozymandias (Shelley) | N/A
2. **P-S03** | seen-single | How does the poet present memory in Kamikaze? | memory | Kamikaze (Garland) | N/A
3. **P-C02** | seen-comparison | Compare how conflict is presented in Exposure and Bayonet Charge. | conflict | Exposure (Owen), Bayonet Charge (Hughes) | N/A
4. **P-C03** | seen-comparison | Compare how identity is explored in Checking Out Me History and Kamikaze. | identity | Checking Out Me History (Agard), Kamikaze (Garland) | N/A
5. **UP-02** | unseen-analysis | How does the poet use language and structure to create a sense of tension? | language and structure, tension | Unseen poem | N/A
6. **UP-C02** | unseen-comparison | Compare how imagery is used in both poems. | imagery | Two unseen poems | N/A
7. **M-03** | text | How does Shakespeare present guilt in the play as a whole? | guilt | Macbeth | whole
8. **ACC-01** | text | How does Dickens present Scrooge as selfish in this extract? | Scrooge, selfishness | A Christmas Carol | extract
9. **ACC-02** | text | How does Dickens present the theme of redemption? | redemption | A Christmas Carol | whole
10. **ACC-03** | text | How does Dickens use the character of the Cratchits to convey his message? | Cratchits, message | A Christmas Carol | whole
11. **JH-01** | text | How does Stevenson present Hyde as frightening? | Hyde, fear | Jekyll and Hyde | both
12. **JH-02** | text | How does Stevenson explore duality through Jekyll? | duality, Jekyll | Jekyll and Hyde | whole
13. **AIC-01** | text | How does Priestley present responsibility in the play? | responsibility | An Inspector Calls | whole
14. **AIC-02** | text | How does Priestley use the Inspector to convey his ideas? | Inspector, ideas | An Inspector Calls | whole

---

**OUTPUT FORMAT:**

Produce one JSON object. Key = task ID (e.g. "P-S01", "M-03"). Value = one pack object with exactly these keys: checklistItems, markSchemeDetail, stepByStepMethod, modelAnswers.

Example shape:

{
  "P-S01": {
    "checklistItems": [ { "id": "P-S01-1", "label": "I define what power means in this question", "ao": "AO1" }, ... ],
    "markSchemeDetail": "AO1 (12 marks): ...\nAO2 (12 marks): ...\nAO3 (6 marks): ...\n\nWeak: ...",
    "stepByStepMethod": "Step 1 (2 min): ...\nStep 2 (5 min): ...\n...",
    "modelAnswers": { "grade4": "...", "grade6": "...", "grade8": "...", "grade9": "..." }
  },
  "P-S03": { ... },
  ...
}

If your output length limit makes one JSON with all 14 impossible, output the 14 packs as 14 separate sections instead. Label each section with the task ID (e.g. ## P-S01). In each section give: checklistItems (JSON array), markSchemeDetail (string), stepByStepMethod (string), modelAnswers (object with grade4, grade6, grade8, grade9). Then I can combine them.

Do all 14 tasks. Start with the JSON object (or the first section) now.
