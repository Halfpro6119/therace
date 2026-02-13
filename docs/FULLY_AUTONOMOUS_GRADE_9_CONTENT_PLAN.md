# Fully Autonomous Grade 9 Content Plan

**Date:** 13 February 2025  
**Purpose:** Content-only roadmap to make each subject **fully autonomous** — a student can use only this app to achieve Grade 9 in their GCSEs.  
**Scope:** All subjects in `gcseScope.ts` and featured hubs.  
**Focus:** Content depth, breadth, and sophistication — no UI/UX changes.

---

## 1. Executive Summary

| Subject | Exam Board | Spec | Current State | Target for Grade 9 |
|--------|------------|------|---------------|--------------------|
| **Maths** | Edexcel | 1MA1 | Ultra sufficient | Maintain; add Further Maths & Statistics |
| **Biology** | AQA | 8461 | Ultra sufficient | Maintain; add stretch content |
| **Chemistry** | AQA | 8462 | Ultra sufficient | Maintain; add stretch content |
| **Physics** | AQA | 8463 | Ultra sufficient | Maintain; add stretch content |
| **Combined Science** | AQA | 8464/8465 | Partial | Add 6-paper flow + combined-specific content |
| **English Language** | AQA | 8700 | Ultra sufficient | Maintain |
| **English Literature** | AQA | 8702 | Ultra sufficient | Add more poetry + optional texts |
| **History** | AQA | 8145 | Ultra sufficient | Maintain |
| **Geography** | AQA | 8035 | Adequate | Major expansion (see §4) |
| **Religious Studies** | AQA | 8062 | Adequate | Major expansion (see §5) |
| **Business Studies** | AQA / Edexcel | 8132 / 1BS0 | Adequate | Major expansion (see §6) |
| **Psychology** | AQA | 8182 (GCSE) | ⚠️ Mismatch | Align to GCSE 8182; expand content |
| **Health & Social Care** | Edexcel | 2HS01/2HS02 | Adequate | Expand Units 3–4 |
| **Computer Science** | AQA / OCR | 8525 / J277 | Adequate | Align spec; expand per unit |
| **French** | AQA | 8658 | None | Full build (see §10) |
| **Spanish** | AQA | 8698 | None | Full build (see §10) |
| **Further Maths** | Edexcel | — | None | Full build or remove |
| **Statistics** | AQA / Edexcel | — | None | Full build or remove |
| **Vocab Lab** | — | — | Partial | Complete all modes |

---

## 2. Exam Board Landscape (UK GCSE)

### 2.1 Major Boards

| Board | Typical Subjects | Notes |
|-------|------------------|------|
| **AQA** | Sciences, English, History, Geography, RS, Psychology, MFL, Business (8132) | Largest; most humanities/sciences |
| **Edexcel (Pearson)** | Maths, Further Maths, Business (1BS0), Health & Social Care | Strong in maths, vocational |
| **OCR** | Computer Science (J277), Geography (B), History (B) | Alternative specs for many subjects |
| **WJEC** | Health & Social Care (new 2026) | Wales-focused; some England centres |

### 2.2 Spec Alignment for This App

| Subject | Primary Spec | Alternative | Recommendation |
|---------|--------------|-------------|----------------|
| Maths | Edexcel 1MA1 | AQA 8300 | Keep Edexcel (current) |
| Sciences | AQA 8461/62/63 | Edexcel, OCR | Keep AQA |
| English | AQA 8700/8702 | Edexcel, OCR | Keep AQA |
| History | AQA 8145 | Edexcel, OCR | Keep AQA |
| Geography | AQA 8035 | Edexcel A, OCR B | Keep AQA |
| Religious Studies | AQA 8062 | Edexcel, OCR | Keep AQA |
| Business | AQA 8132 | Edexcel 1BS0 | **Align to AQA** (implementation plan); or support both |
| Psychology | AQA 8182 (GCSE) | — | **Align to GCSE 8182** (audit says A-level 7182 — fix) |
| Health | Edexcel 2HS01/02 | WJEC | Keep Edexcel |
| Computer Science | AQA 8525 | OCR J277 | **Align to AQA 8525** (new spec 2025); gcseScope says OCR — reconcile |
| French / Spanish | AQA 8658/8698 | Edexcel, OCR | AQA (new MFL spec 2025) |

### 2.3 Grade 9 Content Principles (Ofqual / Exam Boards)

Grade 9 requires:
- **Comprehensive knowledge** across full specification
- **Sustained, coherent argument** and evaluation
- **Application to unfamiliar contexts**
- **Precise use of specialist terminology**
- **Synthesis** across topics
- **Nuanced analysis** (not just description)

Content must therefore include:
- Full spec coverage (no gaps)
- Stretch / extension material beyond grade 5
- Model answers at Grade 8/9 level
- Unfamiliar-context practice
- Evaluation and “to what extent” practice
- Common misconceptions explicitly addressed

---

## 3. Content Targets by Subject (Quantified)

### 3.1 Maths (Edexcel 1MA1)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Golden questions | 345 | 345 | 0 |
| Full paper quizzes | ✅ | ✅ | 0 |
| Topic drills | ✅ | ✅ | 0 |
| Further Maths | 0 | Full spec | Full build |
| Statistics | 0 | Full spec | Full build |

**Grade 9 focus:** Problem-solving, multi-step reasoning, unfamiliar contexts. Current content sufficient if question bank includes stretch items.

---

### 3.2 Science Lab (AQA 8461/62/63)

| Subject | Concepts | Questions | Practicals | Misconceptions | Target |
|---------|----------|-----------|------------|----------------|--------|
| Biology | 20 | 22 | 6 | 17 | Add 5–10 stretch concepts; 10+ Grade 9-style questions |
| Chemistry | 13 | 12 | 3 | 9 | Add 5 stretch concepts; 8+ Grade 9 questions |
| Physics | 11 | 9 | 5 | 6 | Add 4 stretch concepts; 8+ Grade 9 questions |

**Combined Science:** Add 6-paper structure; combined-specific questions (shorter, synoptic); map content to Papers 1–6.

---

### 3.3 English Campus (AQA 8700/8702)

| Content | Current | Target |
|---------|---------|--------|
| Language Paper 1/2 | 8 reading + 10 writing | Maintain; add 2–3 Grade 9 model answers per task |
| Literature set texts | Macbeth, ACC, J&H, AIC | Add 2–3 more optional texts (e.g. Romeo & Juliet, Pride & Prejudice) |
| Poetry | 6 tasks | Add 4–6 more seen/unseen; full anthology coverage |
| Vocab Lab | Spell only | Meaning-from-word, use-in-sentence, upgrade-word, common-mistake hint |

---

### 3.4 History Hub (AQA 8145)

| Content | Current | Target |
|---------|---------|--------|
| 16 options | Full | Maintain |
| Source/interpretation labs | ✅ | Add 2–3 Grade 9 model answers per option |
| Question lab | ✅ | Add “sustained argument” prompts |

---

### 3.5 Geography Hub (AQA 8035)

| Content Type | Current | Implementation Plan Target | Gap |
|--------------|---------|-----------------------------|-----|
| Concepts | 18 | 50+ (2–6 per section) | 32+ |
| Key terms | 35 | 300+ (full spec + case study) | 265+ |
| Quick checks | 18 | 120+ (3–5 per sub-topic) | 102+ |
| Skills tasks | 5 | 25+ (map, graph, numerical, statistical) | 20+ |
| Issue scenarios | 3 | 5 | 2 |
| Fieldwork tasks | 5 | 4–6 | 0–1 |
| Question lab | 16 | 50+ | 34+ |
| Case studies | Partial | 12+ named (LIC/NEE city, UK city, LIC/NEE country, coastal, flood, glacial, rainforest, desert/cold, etc.) | 8+ |

---

### 3.6 Religious Studies Hub (AQA 8062)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Belief concepts (per religion) | ~5 | 8–15 | 3–10 per religion |
| Scripture cards | ~35 | 60+ | 25+ |
| Contrasting views | ~10 | 30+ (6–10 per theme) | 20+ |
| Quick check | ~25 | 80+ | 55+ |
| Short answer (1–2–4–5) | Present | 15–25 per religion, 10–15 per theme | Expand |
| Extended writing (12-mark) | Present | 4–6 per religion, 3–5 per theme | Expand |
| Philosophical arguments (Theme C) | Minimal | 5 full arguments | 5 |

---

### 3.7 Business Hub (AQA 8132)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Concepts | 33 | 33+ | Met |
| Glossary | 75 | 130+ | 55 |
| Quick checks | 43 | 120+ | 77 |
| Case studies | 5 | 15–20 | 10–15 |
| Calculations | 7 | 8+ | 1 |
| Evaluation prompts | 18 | 25+ | 7 |

---

### 3.8 Psychology Hub (AQA 8182 — GCSE)

**Critical:** Audit says A-level 7182; app should target **GCSE 8182**. Content structure differs:

| GCSE 8182 Paper 1 (Cognition & Behaviour) | GCSE 8182 Paper 2 (Social Context) |
|-------------------------------------------|-----------------------------------|
| Memory | Social influence |
| Perception | Language, thought & communication |
| Development | Brain & neuropsychology |
| Research methods | Psychological problems |

| Content Type | Current (A-level?) | GCSE Target |
|--------------|-------------------|-------------|
| Concepts | ~15 | 25+ (all GCSE topics) |
| Key studies | 8 | 15+ (GCSE spec studies) |
| Quick checks | 11 | 40+ |
| Question lab | 9 | 25+ |

**Action:** Audit `psychologyHubData.ts` against AQA 8182; replace A-level content with GCSE content or add GCSE as separate path.

---

### 3.9 Health Hub (Edexcel 2HS01/02)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Concepts | 11 | 22+ | 11+ |
| Terms | 22 | 80+ | 58+ |
| Quick checks | 10 | 80+ | 70+ |
| Case studies | 4 | 12+ | 8+ |
| Investigation scaffolds | 2 | 4–6 | 2–4 |
| Unit 3–4 content | Light | Full | Major |

---

### 3.10 Compute Lab (AQA 8525)

| Unit | Concepts | Glossary | Quick Check | Algorithm/Code/Calc/Logic/SQL | Question Lab |
|------|----------|----------|-------------|-------------------------------|-------------|
| 3.1 Algorithms | 3–4 | 15+ | 15+ | 8–10 trace | 10+ |
| 3.2 Programming | 8+ | 40+ | 40+ | 15–20 code | 10+ |
| 3.3 Data representation | 6+ | 25+ | 25+ | 15–20 calc | 10+ |
| 3.4 Computer systems | 6+ | 30+ | 25+ | 10–15 logic | 10+ |
| 3.5 Networks | 3+ | 15+ | 15+ | — | 5+ |
| 3.6 Cyber security | 3+ | 15+ | 15+ | — | 5+ |
| 3.7 SQL | 2+ | 10+ | 10+ | 10–15 SQL | 5+ |
| 3.8 Ethical/legal | 2+ | 10+ | 10+ | — | 5+ |

**Note:** gcseScope lists OCR; implementation plan uses AQA 8525. Reconcile: use AQA 8525 (new spec, first teaching 2025) or OCR J277.

---

### 3.11 Languages (French, Spanish — AQA 8658/8698)

| Content Type | Target (per language) |
|--------------|------------------------|
| Vocabulary (Foundation) | 1,200+ words (spec-defined) |
| Vocabulary (Higher) | 1,700+ words |
| Grammar concepts | Full spec (tenses, agreement, structures) |
| Theme content | 3 themes × 4 topics (Identity, Local/national/global, Future) |
| Listening practice | 20+ tasks (Foundation + Higher) |
| Reading practice | 20+ tasks |
| Writing tasks | 15+ (photo, 40-word, 90-word, 150-word) |
| Speaking prep | Role-play, photo card, conversation prompts |
| Translation | English ↔ French/Spanish (sentence + passage) |

**New MFL spec (2025):** Vocabulary lists, grammar, themes defined by DfE. Align to AQA 8658 (French), 8698 (Spanish).

---

## 4. Prioritised Content Roadmap

### P0 — Critical (Blocking “fully autonomous” claim)

| # | Subject | Action | Content Scope |
|---|---------|--------|---------------|
| 1 | **Psychology** | Align to GCSE 8182 | Replace or supplement A-level content with GCSE topics (Memory, Perception, Development, Research methods; Social influence, Language, Brain, Psychological problems) |
| 2 | **Combined Science** | Add 6-paper flow | Combined-specific structure; 6 papers; synoptic combined questions |
| 3 | **French & Spanish** | Build Languages Hub | Vocab, grammar, themes, listening/reading/writing/speaking content per spec |
| 4 | **Further Maths & Statistics** | Build or remove | Either full content per spec or remove from scope |

### P1 — High Impact (Adequate → Ultra Sufficient)

| # | Subject | Action | Content Scope |
|---|---------|--------|---------------|
| 5 | **Geography** | Major expansion | +32 concepts, +265 terms, +102 quick checks, +20 skills tasks, +34 question lab, +8 case studies |
| 6 | **Religious Studies** | Major expansion | +3–10 concepts per religion, +25 scripture, +20 contrasting views, +55 quick checks, +philosophical arguments |
| 7 | **Business** | Expansion | +55 glossary, +77 quick checks, +10–15 case studies, +7 evaluation prompts |
| 8 | **Vocab Lab** | Complete modes | Meaning-from-word, use-in-sentence, upgrade-word, common-mistake hint |

### P2 — Full Coverage

| # | Subject | Action | Content Scope |
|---|---------|--------|---------------|
| 9 | **Health** | Expand Units 3–4 | +11 concepts, +58 terms, +70 quick checks, +8 case studies, +2–4 investigation scaffolds |
| 10 | **Compute Lab** | Audit & expand | Per-unit content density to implementation plan targets |
| 11 | **Science (Triple)** | Add stretch | 5–10 stretch concepts per subject; 8–10 Grade 9-style questions each |
| 12 | **English Literature** | Optional expansion | More poetry; 2–3 optional set texts |

---

## 5. Exam Board Spec References (Content Creation)

| Subject | Primary Spec | Key Links |
|---------|--------------|-----------|
| Maths | Edexcel 1MA1 | [Edexcel GCSE Maths](https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html) |
| Biology | AQA 8461 | [AQA GCSE Biology](https://www.aqa.org.uk/subjects/science/gcse/biology-8461) |
| Chemistry | AQA 8462 | [AQA GCSE Chemistry](https://www.aqa.org.uk/subjects/science/gcse/chemistry-8462) |
| Physics | AQA 8463 | [AQA GCSE Physics](https://www.aqa.org.uk/subjects/science/gcse/physics-8463) |
| Combined | AQA 8464/8465 | [AQA Combined Science](https://www.aqa.org.uk/subjects/science/gcse/combined-science-trilogy-8464) |
| English Language | AQA 8700 | [AQA English Language](https://www.aqa.org.uk/subjects/english/gcse/english-language-8700) |
| English Literature | AQA 8702 | [AQA English Literature](https://www.aqa.org.uk/subjects/english/gcse/english-literature-8702) |
| History | AQA 8145 | [AQA History](https://www.aqa.org.uk/subjects/history/gcse/history-8145) |
| Geography | AQA 8035 | [AQA Geography](https://www.aqa.org.uk/subjects/geography/gcse/geography-8035) |
| Religious Studies | AQA 8062 | [AQA RS A](https://www.aqa.org.uk/subjects/religious-studies/gcse/religious-studies-a-8062) |
| Business | AQA 8132 | [AQA Business](https://www.aqa.org.uk/subjects/business/gcse/business-8132) |
| Psychology | AQA 8182 | [AQA GCSE Psychology](https://www.aqa.org.uk/subjects/psychology/gcse/psychology-8182) |
| Health | Edexcel 2HS01/02 | [Edexcel Health & Social Care](https://qualifications.pearson.com/en/qualifications/edexcel-gcses/health-and-social-care-2017.html) |
| Computer Science | AQA 8525 | [AQA Computer Science](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525) |
| French | AQA 8658 | [AQA French](https://www.aqa.org.uk/subjects/languages/gcse/french-8658) |
| Spanish | AQA 8698 | [AQA Spanish](https://www.aqa.org.uk/subjects/languages/gcse/spanish-8698) |

---

## 6. Grade 9 Content Checklist (Per Subject)

For each subject, content must include:

- [ ] **Full spec coverage** — every topic/sub-topic from specification
- [ ] **Key terms glossary** — all required terminology with definitions
- [ ] **Concept explanations** — core ideas with diagrams where helpful
- [ ] **Common misconceptions** — explicitly addressed
- [ ] **Quick check / recall** — 3–5+ items per sub-topic
- [ ] **Application practice** — case studies, scenarios, unfamiliar contexts
- [ ] **Evaluation practice** — “assess”, “evaluate”, “to what extent”
- [ ] **Model answers** — at least Grade 8/9 level for extended questions
- [ ] **Stretch content** — beyond grade 5 where spec allows
- [ ] **Option-aware** — filter by student’s chosen options (Geography, History, RS, etc.)

---

## 7. Conclusion

To make the app **fully autonomous for Grade 9**:

1. **Fix mismatches:** Psychology → GCSE 8182; Computer Science → confirm AQA 8525 vs OCR.
2. **Build from scratch:** French, Spanish, Further Maths, Statistics (or remove).
3. **Add structural gap:** Combined Science 6-paper flow.
4. **Expand adequate subjects:** Geography, RS, Business, Health, Compute to implementation-plan targets.
5. **Complete partial:** Vocab Lab all modes.
6. **Add stretch:** Science triple, History, English — Grade 9 model answers and unfamiliar-context practice.

**Estimated content effort (rough):**
- P0: 4–6 months (Languages, Combined, Psychology alignment, Further/Stats)
- P1: 3–4 months (Geography, RS, Business, Vocab)
- P2: 2–3 months (Health, Compute, Science stretch, English optional)

Content alone, with no new features, will make each subject exam-ready for Grade 9.
