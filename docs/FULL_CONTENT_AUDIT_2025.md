# Full Content Audit — Ultra Sufficient for Exam-Only Study

**Date:** 13 February 2025  
**Purpose:** Validate whether every subject has enough content for students to use **only this app** to study and pass with flying colours.  
**Scope:** All subjects in `gcseScope.ts` and featured hubs.

---

## Executive Summary

| Category | Subject | Ultra Sufficient? | Verdict |
|----------|---------|-------------------|---------|
| **Maths** | Maths (Higher & Foundation) | ✅ Yes | 345 golden questions; full paper + topic drills; full spec coverage |
| **Maths** | Further Maths | ❌ No | Placeholder only — no content |
| **Maths** | Statistics | ❌ No | Placeholder only — no content |
| **Science** | Biology | ✅ Yes | 20 concepts, 22 questions, 6 practicals, 17 misconceptions; all 7 AQA topics |
| **Science** | Chemistry | ✅ Yes | 13 concepts, 12 questions, 3 practicals, 9 misconceptions; all 10 AQA topics |
| **Science** | Physics | ✅ Yes | 11 concepts, 9 questions, 5 practicals, 6 misconceptions; all 8 AQA topics |
| **Science** | Combined Science | ⚠️ Partial | In scope; Science Lab offers Biology/Chemistry/Physics only — no Combined-specific flow |
| **English** | English Language | ✅ Yes | 8 reading + 10 writing tasks; full examiner packs; Paper 1 & 2 |
| **English** | English Literature | ✅ Yes | 15 tasks; Macbeth, ACC, J&H, AIC; seen/unseen poetry; full GuidePost packs |
| **English** | Vocab Lab | ⚠️ Partial | Spell mode works; meaning-from-word, use-in-sentence, upgrade-word not in UI |
| **Humanities** | History | ✅ Yes | All 16 AQA options; timeline, key terms, concept cards, quick checks, source/interpretation labs, question lab, historic environment |
| **Humanities** | Geography | ⚠️ Adequate | 18 concepts, 35 key terms, 18 quick checks, 5 skills, 3 issue scenarios, 5 fieldwork, 16 question lab; all 17 sections; below ideal density |
| **Humanities** | Religious Studies | ⚠️ Adequate | 7 religions, 8 themes; belief concepts, scripture cards, contrasting views, quick check, short answer, extended writing; coverage present but depth varies |
| **Social** | Business Studies | ⚠️ Adequate | 33 concepts, 75 glossary, 43 quick checks, 5 case studies, 7 calculations, 18 evaluation prompts; post-audit improvements; still gaps vs 130+ glossary target |
| **Social** | Psychology | ⚠️ Adequate | A-level spec (7182); 15 topics; concepts, key studies, quick checks, study evaluator, issues & debates, research methods, question lab; thin on option topics |
| **Social** | Health & Social Studies | ⚠️ Adequate | 4 units; concepts, terms, life stages, quick checks, case studies, investigation scaffolds, care values; Edexcel spec; Units 3 & 4 lighter |
| **Social** | Computer Science | ⚠️ Adequate | AQA 8525; 8 units; concepts, terms, quick checks, algorithm lab, calculation lab, logic lab, SQL lab, question lab; structure complete |
| **Languages** | French | ❌ No | In gcseScope; no dedicated hub or content |
| **Languages** | Spanish | ❌ No | In gcseScope; no dedicated hub or content |

**Overall verdict:**  
- **Ultra sufficient (exam-only study viable):** Maths, Biology, Chemistry, Physics, English Language, English Literature, History  
- **Adequate (usable but would benefit from more content):** Geography, Religious Studies, Business Studies, Psychology, Health, Computer Science  
- **Not sufficient:** Further Maths, Statistics, French, Spanish  
- **Partial / structural gaps:** Combined Science (no dedicated flow), Vocab Lab (spell-only)

---

## 1. Maths Mastery

### 1.1 Maths (Edexcel GCSE)

| Tier | Questions per paper | Total | Full paper viable? | Topic coverage |
|------|----------------------|------|--------------------|----------------|
| Higher | 80 / 80 / 80 | 240 | ✅ Yes | 16 topics, all curriculum areas |
| Foundation | 30 / 35 / 40 | 105 | ✅ Yes | 9 topics; meets ~20–30 per paper target |

**Verdict:** ✅ **Ultra sufficient.** Full test content coverage for both tiers. Golden question bank, topic/unit specs, full-paper quizzes all in place.

### 1.2 Further Maths

**Status:** Placeholder page only. "Coming soon" message.  
**Verdict:** ❌ **Not sufficient.** No content.

### 1.3 Statistics

**Status:** Placeholder page only. "Coming soon" message.  
**Verdict:** ❌ **Not sufficient.** No content.

---

## 2. Science Lab

### 2.1 Biology, Chemistry, Physics (AQA GCSE)

| Subject | Concepts | Questions | Practicals | Equations | Misconceptions | AQA topics |
|---------|----------|-----------|------------|-----------|----------------|------------|
| Biology | 20 | 22 | 6 | 3 | 17 | 7/7 ✅ |
| Chemistry | 13 | 12 | 3 | 3 | 9 | 10/10 ✅ |
| Physics | 11 | 9 | 5 | 6 | 6 | 8/8 ✅ |

**Verdict:** ✅ **Ultra sufficient** for all three. Full test content coverage per `SCIENCE_LAB_CONTENT_COVERAGE_AUDIT.md`.

### 2.2 Combined Science

**Status:** In `gcseScope` (6 papers). Science Lab subject picker shows Biology, Chemistry, Physics only. No Combined-specific flow (e.g. 6-paper structure, combined content).  
**Verdict:** ⚠️ **Partial.** Students taking Combined can use Biology/Chemistry/Physics content, but there is no Combined-specific structure or paper mapping.

---

## 3. English Campus

### 3.1 English Language (AQA 8700)

| Content | Paper 1 | Paper 2 | Total |
|---------|---------|---------|-------|
| Section A (Reading) | 4 | 4 | 8 |
| Section B (Writing) | 5 | 5 | 10 |

All tasks have full examiner packs (checklist, mark scheme, method, Grade 4/6/8/9 models).  
**Verdict:** ✅ **Ultra sufficient.**

### 3.2 English Literature (AQA 8702)

| Content | Count | Coverage |
|---------|-------|----------|
| Seen poetry (single) | 2 | Ozymandias, Kamikaze |
| Seen poetry (comparison) | 2 | Exposure/Bayonet Charge; Checking Out Me History/Kamikaze |
| Unseen poetry | 2 | Analysis + comparison |
| Set texts | 9 | Macbeth (extract + whole), ACC, J&H, AIC |

All 15 tasks have full GuidePost packs.  
**Verdict:** ✅ **Ultra sufficient.**

### 3.3 Vocab Lab

| Mode | Status |
|------|--------|
| Spell from meaning | ✅ Implemented |
| Meaning from word | ❌ Types only; not in session UI |
| Use in sentence | ❌ Types only |
| Upgrade word | ❌ Types only |
| Common mistake hint | ❌ Stored but not shown |

**Verdict:** ⚠️ **Partial.** Spell mode is strong; other modes and common-mistake hint would improve "ultra sufficient" for vocabulary.

---

## 4. History Hub (AQA 8145)

| Element | Options | Content types | Status |
|---------|---------|---------------|--------|
| Period study | 4 | Timeline, key terms, concept cards, quick check, interpretation sets, question lab | ✅ |
| Wider world depth | 5 | Same + source sets | ✅ |
| Thematic study | 3 | Same | ✅ |
| British depth | 4 | Same + historic environment (12 sites) | ✅ |

All 16 AQA options have content. Counts per option are below implementation-plan targets but cover the spec.  
**Verdict:** ✅ **Ultra sufficient.**

---

## 5. Geography Hub (AQA 8035)

| Content type | Count | Notes |
|--------------|-------|-------|
| Concepts | 18 | All 17 sections represented |
| Key terms | 35 | |
| Quick checks | 18 | ~1 per section |
| Skills tasks | 5 | Map, graph, numerical, statistical |
| Issue scenarios | 3 | Coastal, flood, energy |
| Fieldwork tasks | 5 | |
| Question lab | 16 | |

Implementation plan targets: more concepts per section, more key terms, 3–5 quick checks per sub-topic, more case studies.  
**Verdict:** ⚠️ **Adequate.** Structure and spec coverage present; density below ideal for "pass with flying colours" without other resources.

---

## 6. Religious Studies Hub (AQA 8062)

| Content type | Count | Notes |
|--------------|-------|-------|
| Religions | 7 | Buddhism, Christianity, Catholic Christianity, Hinduism, Islam, Judaism, Sikhism |
| Themes | 8 | A–F thematic; G, H textual (St Mark's Gospel) |
| Belief concepts | ~35 | Religion + theme coverage |
| Scripture cards | ~35 | |
| Contrasting views | ~10 | Theme A–F issues |
| Quick check | ~25+ | |
| Short answer, extended writing | Present | |

Implementation plan targets: more belief concepts per religion, more scripture, more 12-mark practice.  
**Verdict:** ⚠️ **Adequate.** Core beliefs and themes covered; depth varies by religion/theme.

---

## 7. Business Hub (AQA 8132)

| Content type | Before audit | After | Target | Gap |
|--------------|--------------|-------|--------|-----|
| Concepts | 24 | 33 | 33+ | Met |
| Glossary | 28 | 75 | 130+ | 55 |
| Quick checks | 17 | 43 | 120+ | 77 |
| Case studies | 2 | 5 | 15–20 | 10–15 |
| Calculations | 6 | 7 | 8+ | 1 |
| Evaluation prompts | 5 | 18 | 15+ | Met |

Break-even interpretation added. Critical sub-topics (Globalisation, Legislation, Procurement, Customer service, Motivation, Training, Marketing fundamentals) now have concepts.  
**Verdict:** ⚠️ **Adequate.** Usable for exam prep; glossary and quick-check expansion would strengthen "ultra sufficient."

---

## 8. Psychology Hub (AQA A-level 7182)

**Note:** Subject groups say "A-level Psychology 7182" — this is A-level, not GCSE.

| Content type | Count | Notes |
|--------------|-------|-------|
| Topics | 15 | 7 compulsory + 9 options (3 chosen) |
| Concepts | ~15 | Core topics well covered; options thinner |
| Key studies | 8 | Asch, Milgram, Loftus & Palmer, Lorenz, Harlow, Ainsworth, Pavlov, Bandura |
| Key terms | 21 | |
| Quick checks | 11 | |
| Study evaluator | 5 | |
| Issues & debates | 3 | |
| Research methods | 4 | |
| Question lab | 9 | |

Option topics (Relationships, Gender, Schizophrenia, Eating, Stress, Aggression, Forensic, Addiction) have minimal content.  
**Verdict:** ⚠️ **Adequate** for compulsory content; option topics need expansion for full A-level coverage.

---

## 9. Health Hub (Edexcel GCSE)

| Content type | Count | Notes |
|--------------|-------|-------|
| Units | 4 | Units 1–2 (single + double); 3–4 (double only) |
| Concepts | 11 | Units 1–3 |
| Terms | 22 | |
| Life stages | 6 | PIES for each |
| Quick checks | 10 | |
| Case studies | 4 | Units 1, 2, 4 |
| Investigation scaffolds | 2 | Units 2, 3 |
| Care value scenarios | Present | |

Units 3 and 4 (double award) have less content than Units 1 and 2.  
**Verdict:** ⚠️ **Adequate** for single award; double award would benefit from more Unit 3–4 content.

---

## 10. Compute Lab (AQA 8525)

| Content type | Count | Notes |
|--------------|-------|-------|
| Units | 8 | 3.1–3.8 (algorithms, programming, data, systems, networks, cyber, SQL, ethical) |
| Concepts | ~20+ | Per unit |
| Terms | Present | |
| Quick checks | Present | |
| Algorithm lab | Trace tasks | |
| Calculation lab | Present | |
| Logic lab | Present | |
| SQL lab | Present | |
| Question lab | Present | |

Structure aligns with AQA spec. Content density per unit not fully audited.  
**Verdict:** ⚠️ **Adequate.** Structure complete; content volume per unit would need verification for "ultra sufficient."

---

## 11. Languages (French, Spanish)

**Status:** Both in `gcseScope` (AQA, 4 papers each). No dedicated hub. No content (vocab, listening, reading, writing, speaking).  
**Verdict:** ❌ **Not sufficient.** No content.

---

## 12. Prioritised Recommendations

### P0 — Critical (for "ultra sufficient" claim)

1. **Further Maths & Statistics:** Either add content or remove from "Maths Mastery" marketing until ready.
2. **French & Spanish:** Either add a Languages hub with content or clarify they are out of scope for now.
3. **Combined Science:** Add a Combined-specific flow (6 papers, combined content) or explicitly state that Triple Science content serves Combined students.

### P1 — High impact

4. **Geography:** Increase concepts to 2–3 per section; quick checks to 3–5 per sub-topic; add more case studies.
5. **Religious Studies:** Expand belief concepts and scripture cards per religion; add more 12-mark practice.
6. **Business:** Expand glossary toward 130+ terms; quick checks toward 3–5 per sub-topic.
7. **Psychology:** Add content for all 9 option topics (Relationships, Gender, Cognition, Schizophrenia, Eating, Stress, Aggression, Forensic, Addiction).
8. **Vocab Lab:** Implement meaning-from-word mode; surface common-mistake hint.

### P2 — Full coverage

9. **Health:** Expand Unit 3–4 content for double award.
10. **Compute Lab:** Audit content density per unit; add concepts/questions where thin.
11. **English:** Optional: more seen poetry singles; model drills for M-01.

---

## 13. Files Referenced

| Subject | Key files |
|---------|-----------|
| Maths | `goldenMathsTopicUnitSpec.ts`, `goldenMathsQuestions.ts`, `GOLDEN_MATHS_QUESTION_LIST.md` |
| Science | `scienceLabData.ts`, `SCIENCE_LAB_CONTENT_COVERAGE_AUDIT.md` |
| English | `goldenEnglishQuestionBank.ts`, `englishExaminerPackData.ts`, `englishLiteratureGuidePostData.ts` |
| History | `historyHubData.ts`, `historyHub*Content.ts`, `HISTORY_HUB_CONTENT_COVERAGE_AUDIT.md` |
| Geography | `geographyHubData.ts` |
| Religious Studies | `religiousStudiesHubData.ts` |
| Business | `businessHubData.ts` (or equivalent), `BUSINESS_HUB_AQA_CONTENT_COVERAGE_AUDIT.md` |
| Psychology | `psychologyHubData.ts` |
| Health | `healthHubData.ts` |
| Compute | `computeLabData.ts` |
| Vocab | `VOCAB_LAB_AUDIT.md` |

---

## 14. Conclusion

**Subjects where students can realistically use only this app to study and pass with flying colours:**  
Maths (not Further/Statistics), Biology, Chemistry, Physics, English Language, English Literature, History.

**Subjects that are usable but would benefit from more content before claiming "ultra sufficient":**  
Geography, Religious Studies, Business Studies, Psychology, Health, Computer Science.

**Subjects with no or minimal content:**  
Further Maths, Statistics, French, Spanish.

**Structural gaps:**  
Combined Science (no dedicated flow), Vocab Lab (spell-only).

To make the app "ultra sufficient" for every advertised subject, the P0 and P1 recommendations should be addressed.
