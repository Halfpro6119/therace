/**
 * ConceptLabSuperpowersSection – Renders Learning Superpowers for a concept
 * Design Plan §25: Every subject uses superpowers
 */
import React from 'react';
import {
  ExplainLikeIm11,
  ConceptBridge,
  CompareContrastMatrix,
  SchemaBuilder,
  MemoryPalace,
  WorkedExampleFade,
  RetrievalBeforeRelearn,
  MistakeMuseum,
} from './index';
import {
  getSuperpowerContent,
  getSuperpowersForSubject,
  getMistakeMuseumItems,
  type SubjectId,
} from '../../config/learningSuperpowersConfig';

export interface ConceptLabSuperpowersSectionProps {
  subjectId: SubjectId;
  conceptId: string;
  conceptTitle: string;
  coreIdea: string;
  /** Optional context e.g. "Biology", "Psychology" */
  context?: string;
}

export function ConceptLabSuperpowersSection({
  subjectId,
  conceptId,
  conceptTitle,
  coreIdea,
  context,
}: ConceptLabSuperpowersSectionProps) {
  const content = getSuperpowerContent(subjectId, conceptId, {
    conceptTitle,
    coreIdea,
  });
  const superpowerTypes = getSuperpowersForSubject(subjectId);

  const rendered: React.ReactNode[] = [];

  for (const type of superpowerTypes) {
    if (type === 'explainLike11' && content.explainLike11) {
      rendered.push(
        <ExplainLikeIm11
          key="eli11"
          concept={content.explainLike11.concept}
          context={context}
          modelExplanation={content.explainLike11.modelExplanation}
          showModel
        />
      );
    } else if (type === 'conceptBridge' && content.conceptBridge) {
      rendered.push(
        <ConceptBridge
          key="bridge"
          conceptA={content.conceptBridge.conceptA}
          conceptB={content.conceptBridge.conceptB}
          modelConnection={content.conceptBridge.modelConnection}
          showFeedback
        />
      );
    } else if (type === 'compareContrast' && content.compareContrast) {
      rendered.push(
        <CompareContrastMatrix
          key="compare"
          conceptA={content.compareContrast.conceptA}
          conceptB={content.compareContrast.conceptB}
          statements={content.compareContrast.statements}
        />
      );
    } else if (type === 'schemaBuilder' && content.schemaBuilder) {
      rendered.push(
        <SchemaBuilder
          key="schema"
          title={content.schemaBuilder.title}
          layout={content.schemaBuilder.layout}
          centralConcept={content.schemaBuilder.centralConcept}
          nodes={content.schemaBuilder.nodes}
          slots={content.schemaBuilder.slots}
          correctMapping={content.schemaBuilder.correctMapping}
        />
      );
    } else if (type === 'memoryPalace' && content.memoryPalace) {
      const rooms = content.memoryPalace.rooms ?? [
        { id: 'hall', name: 'Hall', icon: '🚪' },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
        { id: 'living', name: 'Living room', icon: '🛋️' },
        { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
        { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
      ];
      rendered.push(
        <MemoryPalace
          key="palace"
          title={content.memoryPalace.title}
          items={content.memoryPalace.items}
          rooms={rooms}
          enableRecall
        />
      );
    } else if (type === 'workedExample' && content.workedExample) {
      rendered.push(
        <WorkedExampleFade
          key="worked"
          title={content.workedExample.title}
          problem={content.workedExample.problem}
          steps={content.workedExample.steps}
        />
      );
    } else if (type === 'retrieval' && content.retrieval) {
      rendered.push(
        <RetrievalBeforeRelearn
          key="retrieval"
          prompt={content.retrieval.prompt}
          hint={content.retrieval.hint}
          content={
            <div className="text-sm" style={{ color: 'rgb(var(--text))' }}>
              {content.retrieval.content}
            </div>
          }
        />
      );
    } else if (type === 'mistakeMuseum') {
      const items = getMistakeMuseumItems(subjectId, conceptTitle);
      if (items.length > 0) {
        rendered.push(
          <MistakeMuseum
            key="mistake"
            title={`Common mistakes: ${conceptTitle}`}
            items={items}
          />
        );
      }
    }
  }

  if (rendered.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
        Strengthen with Learning Superpowers
      </h3>
      {rendered}
    </div>
  );
}
