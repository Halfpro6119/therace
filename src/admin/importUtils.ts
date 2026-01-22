import { extractTierFromAnyRow } from './tierImport';
import { Subject, Unit, Topic } from '../types';
import { db } from '../db/client';

export interface ImportPromptRow {
  subject: string;
  examBoard: string;
  unit: string;
  topic: string;
  type: 'short' | 'mcq' | 'fill' | 'match' | 'label';
  question: string;
  answers: string[];
  hint?: string;
  explanation?: string;
  calculatorAllowed?: boolean;
  drawingRecommended?: boolean;
  diagramMode?: 'auto' | 'template' | 'asset' | 'custom';
  diagramCustomJson?: string;
  diagramTemplateId?: string;
  diagramPlacement?: 'above' | 'below' | 'inline' | 'side';
  diagramCaption?: string;
  diagramAlt?: string;
  diagramParamsJson?: string;
  // Paper assignment (optional)
  paperId?: string;
  paperNumber?: number;
  // Tier assignment (optional)
  tier?: "higher" | "foundation" | null;
}


export interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  errors: ValidationError[];
  duplicates: number;
  newSubjects: string[];
  newUnits: string[];
  newTopics: string[];
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = String(value ?? "").toLowerCase().trim();
  return ['true', '1', 'yes', 'y', 'on'].includes(normalized);
}

export function parseCSV(csvText: string): ImportPromptRow[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const rows: ImportPromptRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: any = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    if (row.answers && typeof row.answers === 'string') {
      row.answers = row.answers.split('|').map((a: string) => a.trim()).filter(Boolean);
    }

    rows.push({
      subject: row.subject || '',
      examBoard: row.examboard || row.exam_board || '',
      unit: row.unit || '',
      topic: row.topic || '',
      type: row.type || 'short',
      question: row.question || '',
      answers: row.answers || [],
      hint: row.hint || undefined,
      explanation: row.explanation || undefined,
      calculatorAllowed: parseBoolean(row.calculatorallowed || row.calculator_allowed),
      drawingRecommended: parseBoolean(row.drawingrecommended || row.drawing_recommended),
      tier: extractTierFromAnyRow(row),
      paperId: (row.paper_id || row.paperid || '').trim() || undefined,
      paperNumber: (() => {
        const v = (row.paper_number || row.papernumber || '').trim();
        const n = parseInt(v, 10);
        return !isNaN(n) ? n : undefined;
      })(),
    });
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '\"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

export function validateImportRows(rows: ImportPromptRow[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const validTypes = ['short', 'mcq', 'fill', 'match', 'label'];

  rows.forEach((row, index) => {
    const rowNum = index + 2; // +2 because row 1 is headers, index starts at 0

    if (!row.subject || row.subject.trim() === '') {
      errors.push({ row: rowNum, field: 'subject', message: 'Subject is required' });
    }
    if (!row.examBoard || row.examBoard.trim() === '') {
      errors.push({ row: rowNum, field: 'examBoard', message: 'Exam board is required' });
    }
    if (!row.unit || row.unit.trim() === '') {
      errors.push({ row: rowNum, field: 'unit', message: 'Unit is required' });
    }
    if (!row.topic || row.topic.trim() === '') {
      errors.push({ row: rowNum, field: 'topic', message: 'Topic is required' });
    }
    if (!row.question || row.question.trim() === '') {
      errors.push({ row: rowNum, field: 'question', message: 'Question is required' });
    }
    if (!row.answers || row.answers.length === 0) {
      errors.push({ row: rowNum, field: 'answers', message: 'At least one answer is required' });
    }
    if (!validTypes.includes(row.type)) {
      errors.push({ row: rowNum, field: 'type', message: `Type must be one of: ${validTypes.join(', ')}` });
    }
  });

  return errors;
}

export function generatePromptHash(row: ImportPromptRow): string {
  const normalized = [
    row.subject.toLowerCase().trim(),
    row.unit.toLowerCase().trim(),
    row.topic.toLowerCase().trim(),
    row.type,
    row.question.toLowerCase().trim(),
    row.answers.map(a => a.toLowerCase().trim()).sort().join('|'),
  ].join('::');

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash.toString(36);
}

export function detectDuplicates(rows: ImportPromptRow[]): Map<string, number[]> {
  const hashMap = new Map<string, number[]>();

  rows.forEach((row, index) => {
    const hash = generatePromptHash(row);
    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash)!.push(index);
  });

  const duplicates = new Map<string, number[]>();
  hashMap.forEach((indices, hash) => {
    if (indices.length > 1) {
      duplicates.set(hash, indices);
    }
  });

  return duplicates;
}

export async function findOrCreateSubject(
  subjectName: string,
  examBoard: string,
  existingSubjects: Subject[]
): Promise<Subject> {
  const existing = existingSubjects.find(
    s => s.name.toLowerCase() === subjectName.toLowerCase() &&
         s.examBoard.toLowerCase() === examBoard.toLowerCase()
  );

  if (existing) return existing;

  const newSubject = await db.createSubject({
    name: subjectName,
    examBoard: examBoard,
    description: `${subjectName} (${examBoard})`,
    icon: '📚',
    themeColor: 'from-gray-500 to-gray-600',
  });

  existingSubjects.push(newSubject);
  return newSubject;
}

export async function findOrCreateUnit(
  unitName: string,
  subjectId: string,
  existingUnits: Unit[]
): Promise<Unit> {
  const existing = existingUnits.find(
    u => u.subjectId === subjectId && u.name.toLowerCase() === unitName.toLowerCase()
  );

  if (existing) return existing;

  const subjectUnits = existingUnits.filter(u => u.subjectId === subjectId);
  const maxOrder = subjectUnits.length > 0 ? Math.max(...subjectUnits.map(u => u.orderIndex)) : 0;

  const newUnit = await db.createUnit({
    subjectId,
    name: unitName,
    orderIndex: maxOrder + 1,
    description: unitName,
  });

  existingUnits.push(newUnit);
  return newUnit;
}

export async function findOrCreateTopic(
  topicName: string,
  unitId: string,
  subjectId: string,
  existingTopics: Topic[]
): Promise<Topic> {
  const existing = existingTopics.find(
    t => t.unitId === unitId && t.name.toLowerCase() === topicName.toLowerCase()
  );

  if (existing) return existing;

  const unitTopics = existingTopics.filter(t => t.unitId === unitId);
  const maxOrder = unitTopics.length > 0 ? Math.max(...unitTopics.map(t => t.orderIndex)) : 0;

  const newTopic = await db.createTopic({
    subjectId,
    unitId,
    name: topicName,
    orderIndex: maxOrder + 1,
    description: topicName,
  });

  existingTopics.push(newTopic);
  return newTopic;
}

export interface ImportProgress {
  phase: 'prompts' | 'quizzes';
  currentItem: string;
  processed: number;
  total: number;
  createdSubjects: string[];
  createdUnits: string[];
  createdTopics: string[];
  importedPrompts: number;
  skippedPrompts: number;
}

export async function importPrompts(
  rows: ImportPromptRow[],
  skipDuplicates: boolean = true,
  enableCalculators: boolean = false,
  metaOverwriteMode: boolean = false,
  onProgress?: (progress: ImportProgress) => void,
  defaultPaperNumber?: number
): Promise<{
  imported: number;
  skipped: number;
  updated: number;
  errors: string[];
  createdSubjects: string[];
  createdUnits: string[];
  createdTopics: string[];
  affectedSubjectIds: string[];
}> {
  const result = {
    imported: 0,
    skipped: 0,
    updated: 0,
    errors: [] as string[],
    createdSubjects: [] as string[],
    createdUnits: [] as string[],
    createdTopics: [] as string[],
    affectedSubjectIds: [] as string[],
  };

  const affectedSubjectIdsSet = new Set<string>();
  const MATHS_SUBJECT_ID = '0d9b0cc0-1779-4097-a684-f41d5b994f50';

  try {
    const subjects = await db.getSubjects();

    // Preload papers for all subjects so we can resolve paper_id quickly during import
    const papersBySubjectId = new Map<string, { byNumber: Map<number, string>; ids: Set<string> }>();
    for (const s of subjects) {
      try {
        const papers = await db.listPapersBySubject(s.id);
        const byNumber = new Map<number, string>();
        const ids = new Set<string>();
        for (const p of papers) {
          byNumber.set(p.paperNumber, p.id);
          ids.add(p.id);
        }
        papersBySubjectId.set(s.id, { byNumber, ids });
      } catch (e) {
        // ignore - papers optional
      }
    }
    const allUnits: Unit[] = [];
    const allTopics: Topic[] = [];

    for (const subject of subjects) {
      const units = await db.getUnits(subject.id);
      const topics = await db.getTopics(subject.id);
      allUnits.push(...units);
      allTopics.push(...topics);
    }

    const existingPrompts = await Promise.all(
      subjects.map(s => db.getPromptsBySubject(s.id))
    ).then(arrays => arrays.flat());

    const existingHashMap = new Map(
      existingPrompts.map(p => {
        const subject = subjects.find(s => s.id === p.subjectId);
        const unit = allUnits.find(u => u.id === p.unitId);
        const topic = allTopics.find(t => t.id === p.topicId);
        if (!subject || !unit || !topic) return ['', null];
        const hash = generatePromptHash({
          subject: subject.name,
          examBoard: subject.examBoard,
          unit: unit.name,
          topic: topic.name,
          type: p.type,
          question: p.question,
          answers: p.answers,
        });
        return [hash, p];
      }).filter(([hash]) => hash !== '')
    );

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      try {
        const hash = generatePromptHash(row);
        const existingPrompt = existingHashMap.get(hash);

        const subject = await findOrCreateSubject(row.subject, row.examBoard, subjects);
        if (!subjects.some(s => s.id === subject.id)) {
          result.createdSubjects.push(subject.name);
        }

        const unit = await findOrCreateUnit(row.unit, subject.id, allUnits);
        if (!allUnits.some(u => u.id === unit.id && result.createdUnits.includes(unit.name))) {
          result.createdUnits.push(unit.name);
        }

        const topic = await findOrCreateTopic(row.topic, unit.id, subject.id, allTopics);
        if (!allTopics.some(t => t.id === topic.id && result.createdTopics.includes(topic.name))) {
          result.createdTopics.push(topic.name);
        }

        const shouldEnableCalculator = enableCalculators && subject.id === MATHS_SUBJECT_ID;

        // Resolve paper_id for this row (strict order)
        let resolvedPaperId: string | null = null;
        const paperCache = papersBySubjectId.get(subject.id);

        // a) paperId provided
        if (row.paperId) {
          const pid = String(row.paperId).trim();
          if (pid && paperCache?.ids?.has(pid)) {
            resolvedPaperId = pid;
          } else if (pid) {
            // warning only (do not crash)
            result.errors.push(`Row ${i + 2}: Invalid paper_id ${pid}. Paper assignment skipped.`);
          }
        }

        // b) paperNumber provided
        if (!resolvedPaperId && row.paperNumber !== undefined && row.paperNumber !== null) {
          const n = parseInt(String(row.paperNumber), 10);
          if ([1,2,3].includes(n)) {
            const pid = paperCache?.byNumber?.get(n);
            if (pid) resolvedPaperId = pid;
            else result.errors.push(`Row ${i + 2}: Paper ${n} does not exist for subject ${subject.name}. Create it in Papers tab.`);
          } else {
            result.errors.push(`Row ${i + 2}: Invalid paper_number ${row.paperNumber}. Must be 1,2,3.`);
          }
        }

        // c) default paper number
        if (!resolvedPaperId && defaultPaperNumber && [1,2,3].includes(defaultPaperNumber)) {
          const pid = paperCache?.byNumber?.get(defaultPaperNumber);
          if (pid) resolvedPaperId = pid;
        }

        let meta: any = {};
        if (shouldEnableCalculator) {
          meta.calculatorAllowed = true;
        }
        if (row.calculatorAllowed !== undefined) {
          meta.calculatorAllowed = row.calculatorAllowed;
        }
        if (row.drawingRecommended !== undefined) {
          meta.drawingRecommended = row.drawingRecommended;
        }

        if (row.diagramMode === 'custom' && row.diagramCustomJson) {
          meta.diagram = {
            mode: 'custom',
            placement: row.diagramPlacement || 'above',
            caption: row.diagramCaption,
            alt: row.diagramAlt
          };

          try {
            meta.diagram.custom = JSON.parse(row.diagramCustomJson);
          } catch (e) {
            console.warn('Failed to parse diagramCustomJson:', e);
          }
        } else if (row.diagramMode && row.diagramTemplateId) {
          meta.diagram = {
            mode: row.diagramMode,
            templateId: row.diagramTemplateId,
            placement: row.diagramPlacement || 'above',
            caption: row.diagramCaption,
            alt: row.diagramAlt
          };

          if (row.diagramParamsJson) {
            try {
              meta.diagram.params = JSON.parse(row.diagramParamsJson);
            } catch (e) {
              console.warn('Failed to parse diagramParamsJson:', e);
            }
          }
        }

        if (existingPrompt) {
          if (skipDuplicates) {
            result.skipped++;

            if (onProgress) {
              onProgress({
                phase: 'prompts',
                currentItem: `Skipping duplicate: ${row.question.substring(0, 50)}...`,
                processed: i + 1,
                total: rows.length,
                createdSubjects: result.createdSubjects,
                createdUnits: result.createdUnits,
                createdTopics: result.createdTopics,
                importedPrompts: result.imported,
                skippedPrompts: result.skipped,
              });
            }
            continue;
          } else {
            const existingMeta = existingPrompt.meta || {};
            const mergedMeta: any = { ...existingMeta };

            if (metaOverwriteMode || row.calculatorAllowed !== undefined) {
              if (row.calculatorAllowed !== undefined) {
                mergedMeta.calculatorAllowed = row.calculatorAllowed;
              }
            }

            if (metaOverwriteMode || row.drawingRecommended !== undefined) {
              if (row.drawingRecommended !== undefined) {
                mergedMeta.drawingRecommended = row.drawingRecommended;
              }
            }

            if (metaOverwriteMode || (row.diagramMode && row.diagramTemplateId)) {
              if (row.diagramMode === 'custom' && row.diagramCustomJson) {
          meta.diagram = {
            mode: 'custom',
            placement: row.diagramPlacement || 'above',
            caption: row.diagramCaption,
            alt: row.diagramAlt
          };

          try {
            meta.diagram.custom = JSON.parse(row.diagramCustomJson);
          } catch (e) {
            console.warn('Failed to parse diagramCustomJson:', e);
          }
        } else if (row.diagramMode && row.diagramTemplateId) {
                mergedMeta.diagram = {
                  mode: row.diagramMode,
                  templateId: row.diagramTemplateId,
                  placement: row.diagramPlacement || 'above',
                  caption: row.diagramCaption,
                  alt: row.diagramAlt
                };

                if (row.diagramParamsJson) {
                  try {
                    mergedMeta.diagram.params = JSON.parse(row.diagramParamsJson);
                  } catch (e) {
                    console.warn('Failed to parse diagramParamsJson:', e);
                  }
                }
              } else if (metaOverwriteMode) {
                delete mergedMeta.diagram;
              }
            }

            if (shouldEnableCalculator && mergedMeta.calculatorAllowed === undefined) {
              mergedMeta.calculatorAllowed = true;
            }

            await db.updatePrompt(existingPrompt.id, {
              question: row.question,
              answers: row.answers,
              hint: row.hint,
              explanation: row.explanation,
              meta: Object.keys(mergedMeta).length > 0 ? mergedMeta : undefined,
              paperId: resolvedPaperId,
              tier: (row as any).tier ?? null,
            });

            result.updated++;
            affectedSubjectIdsSet.add(subject.id);

            if (onProgress) {
              onProgress({
                phase: 'prompts',
                currentItem: `Updating: ${row.question.substring(0, 50)}...`,
                processed: i + 1,
                total: rows.length,
                createdSubjects: result.createdSubjects,
                createdUnits: result.createdUnits,
                createdTopics: result.createdTopics,
                importedPrompts: result.imported,
                skippedPrompts: result.skipped,
              });
            }
            continue;
          }
        }

        // Create new prompt
        await db.createPrompt({
          subjectId: subject.id,
          unitId: unit.id,
          topicId: topic.id,
          type: row.type,
          question: row.question,
          answers: row.answers,
          hint: row.hint,
          explanation: row.explanation,
          meta: Object.keys(meta).length > 0 ? meta : undefined,
          paperId: resolvedPaperId,
          tier: (row as any).tier ?? null,
        });

        result.imported++;
        affectedSubjectIdsSet.add(subject.id);

        if (onProgress) {
          onProgress({
            phase: 'prompts',
            currentItem: `Importing: ${row.question.substring(0, 50)}...`,
            processed: i + 1,
            total: rows.length,
            createdSubjects: result.createdSubjects,
            createdUnits: result.createdUnits,
            createdTopics: result.createdTopics,
            importedPrompts: result.imported,
            skippedPrompts: result.skipped,
          });
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        result.errors.push(`Row ${i + 2}: ${errorMsg}`);
        console.error(`Error importing row ${i + 2}:`, error);
      }
    }

    result.affectedSubjectIds = Array.from(affectedSubjectIdsSet);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    result.errors.push(`Fatal error: ${errorMsg}`);
    console.error('Fatal import error:', error);
  }

  return result;
}

// -----------------------------
// JSON IMPORT (for ImportPage)
// -----------------------------

/**
 * Parse JSON for the Bulk Import Prompts page.
 *
 * Supports:
 * - Single object
 * - Array of objects
 * - Wrapped payload: { questions: [...] } / { prompts: [...] } / { data: [...] }
 *
 * Diagram metadata can be provided as either:
 * - diagram: { mode, templateId, placement, caption, alt, params }
 * - flat fields: diagramMode, diagramTemplateId, diagramPlacement, diagramCaption, diagramAlt, diagramParamsJson
 */
export function parseImportJsonPrompts(inputText: string): ImportPromptRow[] {
  const trimmed = String(inputText ?? '').trim();
  if (!trimmed) return [];

  let parsed: any;
  try {
    parsed = JSON.parse(trimmed);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : String(e)}`);
  }

  // unwrap common wrappers
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    if (Array.isArray(parsed.questions)) parsed = parsed.questions;
    else if (Array.isArray(parsed.prompts)) parsed = parsed.prompts;
    else if (Array.isArray(parsed.data)) parsed = parsed.data;
    else parsed = [parsed];
  }

  if (!Array.isArray(parsed)) parsed = [parsed];

  const normalizeAnswers = (answersRaw: any): string[] => {
    if (answersRaw === null || answersRaw === undefined) return [];
    if (Array.isArray(answersRaw)) {
      return answersRaw.map(a => String(a ?? '').trim()).filter(Boolean);
    }
    if (typeof answersRaw === 'number') return [String(answersRaw)];
    if (typeof answersRaw === 'string') {
      const s = answersRaw.trim();
      if (!s) return [];
      if (s.includes('|')) return s.split('|').map(x => x.trim()).filter(Boolean);
      return [s];
    }
    return [];
  };

  const rows: ImportPromptRow[] = [];

  for (const raw of parsed) {
    if (!raw || typeof raw !== 'object') continue;

    const answers = normalizeAnswers(raw.answers ?? raw.answer);

    const diagramObj = raw.diagram && typeof raw.diagram === 'object' ? raw.diagram : undefined;

    const diagramMode = String(
      diagramObj?.mode ?? raw.diagramMode ?? raw.diagram_mode ?? ''
    ).trim();

    const diagramTemplateId = String(
      diagramObj?.templateId ?? diagramObj?.template_id ?? raw.diagramTemplateId ?? raw.diagram_template_id ?? ''
    ).trim();

    const diagramPlacement = String(
      diagramObj?.placement ?? raw.diagramPlacement ?? raw.diagram_placement ?? ''
    ).trim();

    const diagramCaption = diagramObj?.caption ?? raw.diagramCaption ?? raw.diagram_caption;
    const diagramAlt = diagramObj?.alt ?? raw.diagramAlt ?? raw.diagram_alt;

    // params can be object or string; store as JSON string in diagramParamsJson
    let diagramParamsJson: string | undefined;
    const paramsRaw =
      diagramObj?.params ??
      raw.diagramParams ??
      raw.diagram_params ??
      raw.diagramParamsJson ??
      raw.diagram_params_json;

    if (paramsRaw !== undefined && paramsRaw !== null && paramsRaw !== '') {
      if (typeof paramsRaw === 'string') {
        diagramParamsJson = paramsRaw;
      } else {
        try {
          diagramParamsJson = JSON.stringify(paramsRaw);
        } catch {
          // ignore
        }
      }
    }

    // custom diagram can be object or string; store as JSON string in diagramCustomJson
    let diagramCustomJson: string | undefined;
    const customRaw = diagramObj?.custom ?? raw.diagramCustom ?? raw.diagram_custom ?? raw.diagramCustomJson ?? raw.diagram_custom_json;

    if (customRaw !== undefined && customRaw !== null && customRaw !== '') {
      if (typeof customRaw === 'string') {
        diagramCustomJson = customRaw;
      } else {
        try {
          diagramCustomJson = JSON.stringify(customRaw);
        } catch {
          // ignore
        }
      }
    }

    const row: ImportPromptRow = {
      tier: extractTierFromAnyRow(raw),
      subject: String(raw.subject ?? '').trim(),
      examBoard: String(raw.examBoard ?? raw.exam_board ?? '').trim(),
      unit: String(raw.unit ?? '').trim(),
      topic: String(raw.topic ?? '').trim(),
      type: (String(raw.type ?? 'short').trim() as any) || 'short',
      question: String(raw.question ?? raw.prompt ?? raw.text ?? '').trim(),
      answers,
      hint: raw.hint !== undefined ? String(raw.hint) : undefined,
      explanation: raw.explanation !== undefined ? String(raw.explanation) : undefined,
      calculatorAllowed: raw.calculatorAllowed !== undefined ? !!raw.calculatorAllowed : undefined,
      drawingRecommended: raw.drawingRecommended !== undefined ? !!raw.drawingRecommended : undefined,
      paperId: raw.paper_id ? String(raw.paper_id).trim() : (raw.paperId ? String(raw.paperId).trim() : undefined),
      paperNumber: (() => {
        const v = raw.paper_number ?? raw.paperNumber;
        if (v === undefined || v === null || v === '') return undefined;
        const n = parseInt(String(v), 10);
        return !isNaN(n) ? n : undefined;
      })(),
    };

    if (diagramMode && ['auto', 'template', 'asset', 'custom'].includes(diagramMode)) {
      row.diagramMode = diagramMode as any;
    }
    if (diagramTemplateId) row.diagramTemplateId = diagramTemplateId;
    if (diagramPlacement && ['above', 'below', 'inline', 'side'].includes(diagramPlacement)) {
      row.diagramPlacement = diagramPlacement as any;
    }
    if (diagramCaption !== undefined) row.diagramCaption = String(diagramCaption);
    if (diagramAlt !== undefined) row.diagramAlt = String(diagramAlt);
    if (diagramParamsJson) row.diagramParamsJson = diagramParamsJson;
    if (diagramCustomJson) row.diagramCustomJson = diagramCustomJson;

    rows.push(row);
  }

  return rows;
}
