/**
 * Coverage Dashboard Page
 * 
 * Admin interface for viewing content coverage across papers, units, topics,
 * and question types. Shows which content is missing and needs to be created.
 */

import React, { useState, useEffect } from 'react';
import { db } from '../db/client';
import { Subject, Unit, Topic, Prompt } from '../types';
import { Paper, QuestionType, CoverageSettings, SubjectCoverageSummary } from '../types/coverage';
import {
  computeSubjectCoverageSummary,
  isTaxonomyMissing,
  listMissingQuestionTypes,
} from '../utils/coverageComputation';
import { MATHS_TAXONOMY } from '../config/taxonomy/maths';
import { AlertCircle, CheckCircle, AlertTriangle, BookOpen, Zap } from 'lucide-react';

interface CoveragePageProps {
  subjectId?: string;
}

/**
 * CoveragePage - Main coverage dashboard component
 * 
 * Displays:
 * - Overall progress cards for each paper
 * - Hierarchical breakdown (Unit → Topic → Question Types)
 * - Missing content view with toggle
 * - Seed taxonomy button
 */
export function CoveragePage({ subjectId }: CoveragePageProps) {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [settings, setSettings] = useState<CoverageSettings | null>(null);
  const [coverage, setCoverage] = useState<SubjectCoverageSummary | null>(null);
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [expandedPapers, setExpandedPapers] = useState<Set<string>>(new Set());
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  // Load all data
  useEffect(() => {
    loadData();
  }, [subjectId]);

  // Compute coverage when data changes
  useEffect(() => {
    if (subject && papers.length > 0 && settings) {
      const summary = computeSubjectCoverageSummary(
        subject.id,
        subject.name,
        papers,
        units,
        topics,
        questionTypes,
        prompts,
        settings
      );
      setCoverage(summary);
    }
  }, [subject, papers, units, topics, questionTypes, prompts, settings]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      // Get subject (default to Maths for now)
      const subjects = await db.getSubjects();
      const mathsSubject = subjects.find(s => s.name === 'Maths') || subjects[0];
      if (!mathsSubject) throw new Error('No subject found');
      setSubject(mathsSubject);

      // Load all related data
      const [papersData, unitsData, topicsData, questionTypesData, promptsData, settingsData] = await Promise.all([
        db.getPapers(mathsSubject.id),
        db.getUnits(mathsSubject.id),
        db.getTopics(mathsSubject.id),
        db.getQuestionTypes(mathsSubject.id),
        db.getPromptsBySubject(mathsSubject.id),
        db.getCoverageSettings(mathsSubject.id),
      ]);

      setPapers(papersData);
      setUnits(unitsData);
      setTopics(topicsData);
      setQuestionTypes(questionTypesData);
      setPrompts(promptsData);

      // Create default settings if not found
      if (!settingsData) {
        const newSettings = await db.createCoverageSettings({
          subjectId: mathsSubject.id,
          minPromptsPerQuestionType: 10,
          minPromptsPerTopic: 50,
          minPromptsPerUnit: 200,
        });
        setSettings(newSettings);
      } else {
        setSettings(settingsData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function seedMathsTaxonomy() {
    if (!subject) return;
    try {
      setSeeding(true);
      setError(null);

      // Create papers
      const createdPapers: Paper[] = [];
      for (const paperDef of MATHS_TAXONOMY.papers) {
        const existing = papers.find(p => p.paperNumber === paperDef.paperNumber);
        if (!existing) {
          const paper = await db.createPaper({
            subjectId: subject.id,
            paperNumber: paperDef.paperNumber,
            name: paperDef.name,
            calculatorAllowedDefault: paperDef.calculatorAllowedDefault,
          });
          createdPapers.push(paper);
        } else {
          createdPapers.push(existing);
        }
      }

      // Create units and topics
      const createdUnits: Unit[] = [];
      const createdTopics: Topic[] = [];

      for (const unitDef of MATHS_TAXONOMY.units) {
        const unit = await db.createUnit({
          subjectId: subject.id,
          name: unitDef.name,
          orderIndex: unitDef.orderIndex,
          description: `${unitDef.name} unit for GCSE Maths`,
        });
        createdUnits.push(unit);

        for (const topicDef of unitDef.topics) {
          const topic = await db.createTopic({
            subjectId: subject.id,
            unitId: unit.id,
            name: topicDef.name,
            orderIndex: topicDef.orderIndex,
            description: `${topicDef.name} topic`,
          });
          createdTopics.push(topic);

          // Create question types for this topic
          for (const qtDef of topicDef.questionTypes) {
            // Determine which papers this question type applies to
            const applicablePapers = createdPapers.filter(p =>
              qtDef.tags.includes(`p${p.paperNumber}`)
            );

            // Create one question type per applicable paper (or one generic if all papers)
            if (applicablePapers.length === createdPapers.length) {
              // Generic question type for all papers
              await db.createQuestionType({
                subjectId: subject.id,
                unitId: unit.id,
                topicId: topic.id,
                typeId: qtDef.typeId,
                title: qtDef.title,
                difficultyMin: 1,
                difficultyMax: 9,
                marksMin: 1,
                marksMax: 5,
                tags: qtDef.tags,
              });
            } else {
              // Paper-specific question types
              for (const paper of applicablePapers) {
                await db.createQuestionType({
                  subjectId: subject.id,
                  paperId: paper.id,
                  unitId: unit.id,
                  topicId: topic.id,
                  typeId: `${qtDef.typeId}_p${paper.paperNumber}`,
                  title: qtDef.title,
                  difficultyMin: 1,
                  difficultyMax: 9,
                  marksMin: 1,
                  marksMax: 5,
                  tags: qtDef.tags,
                });
              }
            }
          }
        }
      }

      // Reload data
      await loadData();
      alert('✓ Maths taxonomy seeded successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seed taxonomy');
      console.error(err);
    } finally {
      setSeeding(false);
    }
  }

  const togglePaperExpanded = (paperId: string) => {
    const newSet = new Set(expandedPapers);
    if (newSet.has(paperId)) {
      newSet.delete(paperId);
    } else {
      newSet.add(paperId);
    }
    setExpandedPapers(newSet);
  };

  const toggleUnitExpanded = (unitId: string) => {
    const newSet = new Set(expandedUnits);
    if (newSet.has(unitId)) {
      newSet.delete(unitId);
    } else {
      newSet.add(unitId);
    }
    setExpandedUnits(newSet);
  };

  const getStatusIcon = (status: 'ok' | 'warning' | 'missing') => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'missing':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: 'ok' | 'warning' | 'missing') => {
    switch (status) {
      case 'ok':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'missing':
        return 'bg-red-50 border-red-200';
    }
  };

  const getStatusBadgeColor = (status: 'ok' | 'warning' | 'missing') => {
    switch (status) {
      case 'ok':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'missing':
        return 'bg-red-100 text-red-800';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading coverage data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">Error</p>
          <p className="text-red-700">{error}</p>
          <button
            onClick={loadData}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!subject || !coverage) {
    return (
      <div className="p-6">
        <p className="text-gray-600">No coverage data available</p>
      </div>
    );
  }

  const taxonomyMissing = isTaxonomyMissing(questionTypes);
  const missingTypes = listMissingQuestionTypes(papers, units, topics, questionTypes, prompts, settings!);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{subject.name} Coverage Dashboard</h1>
          <p className="text-gray-600 mt-1">Track content coverage across papers, units, and topics</p>
        </div>
        {taxonomyMissing && (
          <button
            onClick={seedMathsTaxonomy}
            disabled={seeding}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {seeding ? 'Seeding...' : 'Seed Maths Taxonomy'}
          </button>
        )}
      </div>

      {/* Taxonomy Warning */}
      {taxonomyMissing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-semibold">⚠️ Taxonomy Missing</p>
            <p className="text-yellow-700 text-sm mt-1">
              No question types defined yet. Click "Seed Maths Taxonomy" to load the default structure.
            </p>
          </div>
        </div>
      )}

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coverage.papers.map(paper => (
          <div key={paper.paperId} className={`rounded-lg border p-4 ${getStatusColor(paper.status)}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">{paper.paperName}</h3>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(paper.status)}`}>
                {paper.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Coverage</span>
                  <span className="font-semibold">{paper.averageCoveragePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      paper.averageCoveragePercentage >= 80 ? 'bg-green-500' :
                      paper.averageCoveragePercentage >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(paper.averageCoveragePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Units: <span className="font-semibold">{paper.unitsCoveredCount}/{paper.unitsCount}</span></p>
                <p>Prompts: <span className="font-semibold">{paper.promptsCount}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Total Question Types</p>
          <p className="text-2xl font-bold text-gray-900">{coverage.questionTypesCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Missing Types</p>
          <p className="text-2xl font-bold text-red-600">{coverage.missingQuestionTypesCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Total Prompts</p>
          <p className="text-2xl font-bold text-gray-900">{coverage.totalPromptsCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-600 text-sm">Topics</p>
          <p className="text-2xl font-bold text-gray-900">{coverage.topicsCount}</p>
        </div>
      </div>

      {/* Missing Content Toggle */}
      {missingTypes.length > 0 && (
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-4">
          <input
            type="checkbox"
            id="showMissingOnly"
            checked={showMissingOnly}
            onChange={(e) => setShowMissingOnly(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="showMissingOnly" className="text-gray-700 font-medium">
            Show Missing Only ({missingTypes.length} types)
          </label>
        </div>
      )}

      {/* Missing Question Types Table */}
      {missingTypes.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Missing Question Types
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {missingTypes.length} question type{missingTypes.length !== 1 ? 's' : ''} need{missingTypes.length === 1 ? 's' : ''} more prompts
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Type ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Unit</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Prompts</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Deficit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {missingTypes.map((missing) => (
                  <tr key={missing.questionTypeId} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm font-mono text-gray-900">{missing.typeId}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{missing.title}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{missing.unitName}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{missing.topicName}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-semibold">
                        {missing.currentPromptsCount}/{missing.requiredPromptsCount}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        -{missing.deficit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Coverage Details by Paper */}
      {coverage.papers.map(paper => (
        <div key={paper.paperId} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => togglePaperExpanded(paper.paperId)}
            className="w-full px-6 py-4 border-b border-gray-200 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
          >
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">{paper.paperName}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {paper.averageCoveragePercentage.toFixed(1)}% coverage • {paper.promptsCount} prompts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(paper.status)}`}>
                {paper.status.toUpperCase()}
              </span>
              <span className="text-gray-400">
                {expandedPapers.has(paper.paperId) ? '▼' : '▶'}
              </span>
            </div>
          </button>

          {expandedPapers.has(paper.paperId) && (
            <div className="divide-y divide-gray-200">
              {paper.units.map(unit => (
                <div key={unit.unitId} className="px-6 py-4">
                  <button
                    onClick={() => toggleUnitExpanded(unit.unitId)}
                    className="w-full flex justify-between items-start mb-3 hover:opacity-75"
                  >
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        {getStatusIcon(unit.status)}
                        {unit.unitName}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {unit.topicsCoveredCount}/{unit.topicsCount} topics covered
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(unit.status)}`}>
                        {unit.averageCoveragePercentage.toFixed(0)}%
                      </span>
                      <span className="text-gray-400">
                        {expandedUnits.has(unit.unitId) ? '▼' : '▶'}
                      </span>
                    </div>
                  </button>

                  {expandedUnits.has(unit.unitId) && (
                    <div className="space-y-2 mt-3">
                      {unit.topics.map(topic => (
                        <div key={topic.topicId} className="ml-4 p-3 bg-gray-50 rounded border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900 flex items-center gap-2">
                                {getStatusIcon(topic.status)}
                                {topic.topicName}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                {topic.populatedQuestionTypesCount}/{topic.requiredQuestionTypesCount} types • {topic.promptsCount} prompts
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(topic.status)}`}>
                              {topic.coveragePercentage.toFixed(0)}%
                            </span>
                          </div>
                          {topic.missingTypes.length > 0 && (
                            <div className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded">
                              <p className="font-semibold mb-1">Missing types:</p>
                              <div className="space-y-1">
                                {topic.missingTypes.map(m => (
                                  <div key={m.questionTypeId} className="flex justify-between">
                                    <span>{m.typeId}</span>
                                    <span className="text-red-700 font-semibold">{m.currentPromptsCount}/{m.requiredPromptsCount}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CoveragePage;
