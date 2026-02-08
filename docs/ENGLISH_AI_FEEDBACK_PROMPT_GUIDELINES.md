# English AI Feedback – Prompt Guidelines

This document defines how AI marking for GCSE English Language writing tasks should feel and behave. Use these guidelines when integrating the actual AI API.

---

## Core Principle

**If feedback wouldn't help a student improve on the next attempt, it's not good enough yet.**

The AI should feel like an examiner – precise, constructive, and focused on *why* something works or doesn't, not just *what* the student did.

---

## 1. Band-Level Assessment

- Return a clear band (e.g. Level 1–5 for AO5, 1–5 for AO6).
- Marks must be justified – explain the rationale, not just the number.
- Compare to mark scheme descriptors: "This response reaches Level 4 because…"

---

## 2. AO Breakdown

Provide separate feedback for:

- **AO5 (Content & Organisation)**: Ideas, structure, paragraphing, audience/purpose.
- **AO6 (Technical accuracy)**: Spelling, punctuation, grammar, vocabulary.

Each AO comment should:
- State the band reached.
- Reference specific evidence from the student's text.
- Explain *why* it merits that band (or why it falls short of the next).

---

## 3. Strengths

- Name **2–4 concrete strengths** with brief evidence.
- Be specific: "Strong opening with sensory detail (e.g. '…')" not "Good opening."
- Avoid generic praise; every strength should be traceable to the text.

---

## 4. Targets (Most Important)

Targets must be **actionable** – the student should know exactly what to do on their next attempt.

### Do:
- "Embed at least one short quotation where it supports your argument."
- "Add one clear structural shift (e.g. time jump or focus change) in the middle paragraph."
- "Check apostrophes in possessive forms (its vs it's)."

### Don't:
- "Improve your vocabulary." (Too vague)
- "Work on structure." (No clear action)
- "Try to be more ambitious." (Not specific enough)

Targets should:
- Explain **why** it matters for the band.
- Point to the mark scheme when relevant.
- Be limited to 2–4 items so the student isn't overwhelmed.

---

## 5. Rewrite Suggestions

When suggesting improvements:
- Quote the student's current phrase/sentence.
- Provide a concrete upgrade with brief explanation.
- Keep suggestions aspirational, not overwhelming – e.g. 2–3 targeted upgrades rather than rewriting the whole piece.

---

## 6. Tone

- **Examiner-like**: Professional, fair, constructive.
- **Not generic**: Avoid phrases like "Good effort" or "Keep trying" without substance.
- **Encouraging but honest**: If the response is weak, say so clearly – then focus on one or two clear next steps.

---

## 7. Quality Checklist (Pre-API Integration)

Before shipping AI marking, validate:

- [ ] Do AI bands match what a teacher would say?
- [ ] Are targets actionable?
- [ ] Does feedback explain *why*, not just *what*?
- [ ] Would this help a student improve on the next attempt?

---

## 8. Example Target Format

| Bad                           | Good                                                                 |
|-------------------------------|----------------------------------------------------------------------|
| "Use more ambitious vocabulary" | "Replace 2–3 common words (e.g. 'good', 'nice') with more precise choices – e.g. 'captivating' for 'good' in your opening." |
| "Improve structure"           | "Add one clear shift in focus or time (e.g. 'Later that day…') to show structural control." |
| "Fix punctuation"             | "Add commas after introductory phrases (e.g. 'In the market, …') and check apostrophes in possessives." |

---

## 9. Model Answer Comparison

When showing model answers:
- Use Grade 4, 6, 8, 9 examples where possible.
- Annotate what makes each model hit that band.
- Ensure models feel **aspirational**, not overwhelming – students should see a path, not feel discouraged.

---

*These guidelines should be used when wiring up the real AI marking API. Until then, the simulated feedback in the app should mimic this structure and tone.*
