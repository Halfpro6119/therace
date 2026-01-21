/**
 * Paper Assignment Utilities
 * 
 * Handles paper assignment logic during import:
 * - Resolves paper_id from paper_id, paper_number, or default
 * - Validates paper assignments
 * - Provides import summary statistics
 */

import { Paper } from '../types';

export interface PaperAssignmentResult {
  paperId: string | null;
  paperNumber: number | null;
  paperName: string | null;
  warning: string | null;
}

export interface ImportPaperStats {
  totalImported: number;
  assignedToPaper: number;
  unassigned: number;
  warnings: string[];
  byPaper: Record<number, number>; // paper_number -> count
}

/**
 * Resolve paper assignment for a single question
 * 
 * Resolution order:
 * 1. If item.paper_id provided -> use it
 * 2. Else if item.paper_number provided -> lookup paper by subject_id + paper_number
 * 3. Else if defaultPaperId provided -> use it
 * 4. Else -> paper_id remains NULL
 */
export function resolvePaperAssignment(
  item: any,
  papers: Paper[],
  subjectId: string,
  defaultPaperId: string | null
): PaperAssignmentResult {
  const result: PaperAssignmentResult = {
    paperId: null,
    paperNumber: null,
    paperName: null,
    warning: null,
  };

  // Step 1: Check for explicit paper_id
  if (item.paper_id && typeof item.paper_id === 'string') {
    const paper = papers.find(p => p.id === item.paper_id);
    if (paper) {
      result.paperId = item.paper_id;
      result.paperNumber = paper.paperNumber;
      result.paperName = paper.name;
      return result;
    } else {
      result.warning = `Invalid paper_id: ${item.paper_id}`;
      // Continue to next resolution step
    }
  }

  // Step 2: Check for paper_number
  if (item.paper_number && typeof item.paper_number === 'number') {
    const paperNum = item.paper_number;
    if (![1, 2, 3].includes(paperNum)) {
      result.warning = `Invalid paper_number: ${paperNum} (must be 1, 2, or 3)`;
      // Continue to next resolution step
    } else {
      const paper = papers.find(
        p => p.subjectId === subjectId && p.paperNumber === paperNum
      );
      if (paper) {
        result.paperId = paper.id;
        result.paperNumber = paper.paperNumber;
        result.paperName = paper.name;
        return result;
      } else {
        result.warning = `Paper ${paperNum} not found for subject ${subjectId}`;
        // Continue to next resolution step
      }
    }
  }

  // Step 3: Use default paper if provided
  if (defaultPaperId) {
    const paper = papers.find(p => p.id === defaultPaperId);
    if (paper) {
      result.paperId = defaultPaperId;
      result.paperNumber = paper.paperNumber;
      result.paperName = paper.name;
      return result;
    }
  }

  // Step 4: No paper assignment
  return result;
}

/**
 * Calculate import statistics for paper assignments
 */
export function calculatePaperStats(
  results: PaperAssignmentResult[],
  papers: Paper[]
): ImportPaperStats {
  const stats: ImportPaperStats = {
    totalImported: results.length,
    assignedToPaper: 0,
    unassigned: 0,
    warnings: [],
    byPaper: {},
  };

  // Initialize paper counts
  papers.forEach(p => {
    stats.byPaper[p.paperNumber] = 0;
  });

  // Count assignments and warnings
  results.forEach(result => {
    if (result.paperId) {
      stats.assignedToPaper++;
      if (result.paperNumber !== null) {
        stats.byPaper[result.paperNumber]++;
      }
    } else {
      stats.unassigned++;
    }

    if (result.warning) {
      stats.warnings.push(result.warning);
    }
  });

  return stats;
}

/**
 * Format paper assignment for display
 */
export function formatPaperAssignment(result: PaperAssignmentResult): string {
  if (result.paperId) {
    return `Paper ${result.paperNumber}: ${result.paperName}`;
  }
  return 'Unassigned';
}

/**
 * Get paper label for display
 */
export function getPaperLabel(paperId: string | null | undefined, papers: Paper[]): string {
  if (!paperId) return 'Unassigned';
  const paper = papers.find(p => p.id === paperId);
  return paper ? `Paper ${paper.paperNumber}` : 'Unknown';
}
