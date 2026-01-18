/**
 * Diagram Metadata System
 * 
 * Central export for all metadata-related functionality.
 * Provides validators, factory, and database manager.
 */

export {
  validateDiagramMetadata,
  validateDiagramParams,
  mergeParamsWithDefaults,
  type ValidationError,
  type MetadataValidationResult
} from './validator';

export {
  createDiagramFromMetadata,
  createDiagramsBatch,
  updateDiagramMetadata,
  generateMetadataFromSpec,
  type DiagramCreationSpec,
  type DiagramCreationResult
} from './factory';

export {
  saveDiagramMetadata,
  getDiagramMetadata,
  queryDiagramsByMetadata,
  getDiagramMetadataHistory,
  deleteDiagramMetadata,
  saveDiagramMetadataBatch,
  exportDiagramMetadata,
  importDiagramMetadata,
  type DiagramMetadataRecord,
  type MetadataQueryOptions
} from './manager';
