/**
 * Syncs the hard-coded GCSE scope (subjects + papers) into the database.
 * Idempotent: finds by name / subject_id + paper_number and only creates when missing.
 */

import { db } from '../db/client';
import { Subject, Paper } from '../types';
import { GCSE_SCOPE_SUBJECTS } from './gcseScope';

export interface SyncResult {
  subjectsCreated: number;
  subjectsSkipped: number;
  papersCreated: number;
  papersSkipped: number;
  errors: string[];
}

export async function syncGcseScopeToDb(): Promise<SyncResult> {
  const result: SyncResult = {
    subjectsCreated: 0,
    subjectsSkipped: 0,
    papersCreated: 0,
    papersSkipped: 0,
    errors: [],
  };

  const existingSubjects = await db.getSubjects();

  for (const def of GCSE_SCOPE_SUBJECTS) {
    try {
      const existing = existingSubjects.find(
        (s) => s.name.toLowerCase() === def.name.toLowerCase()
      );

      let subject: Subject;
      if (existing) {
        subject = existing;
        result.subjectsSkipped++;
      } else {
        subject = await db.createSubject({
          name: def.name,
          examBoard: def.examBoard,
          description: def.description,
          icon: def.icon,
          themeColor: def.themeColor,
        });
        result.subjectsCreated++;
        existingSubjects.push(subject);
      }

      const existingPapers = await db.listPapersBySubject(subject.id);

      for (const paperDef of def.papers) {
        const existingPaper = existingPapers.find(
          (p) => p.paperNumber === paperDef.paperNumber
        );
        if (existingPaper) {
          result.papersSkipped++;
          continue;
        }
        await db.createPaper({
          subjectId: subject.id,
          paperNumber: paperDef.paperNumber,
          name: paperDef.name,
          calculatorAllowedDefault: paperDef.calculatorAllowedDefault,
        });
        result.papersCreated++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push(`${def.name}: ${message}`);
    }
  }

  return result;
}
