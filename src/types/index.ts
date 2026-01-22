export interface Subject {
  id: string;
  name: string;
  examBoard: string;
  description: string;
  icon: string;
  themeColor: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  name: string;
  orderIndex: number;
  description: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  unitId: string;
  name: string;
  orderIndex: number;
  description: string;
}

export type QuizScopeType = 'topic' | 'unit' | 'full';

export type QuizType = 'subject_master' | 'paper_master' | 'unit' | 'topic';

export type TierLevel = 'higher' | 'foundation' | null;
export type TierFilter = 'all' | 'higher' | 'foundation';

export interface QuizSettings {
  questionLimit?: number;
  difficultyRamp?: boolean;
  timeTarget?: number;
  [key: string]: any;
}
export type PromptType = 'short' | 'mcq' | 'fill' | 'match' | 'label';

export interface Quiz {
  id: string;
  subjectId: string;
  scopeType: QuizScopeType;
  topicId?: string;
  unitId?: string;
  title: string;
  description: string;
  timeLimitSec: number;
  grade9TargetSec: number;
  promptIds: string[];
  paperId?: string;           // NEW: for paper master quizzes
  quizType?: QuizType;        // NEW: subject_master | paper_master | unit | topic
  isActive?: boolean;         // NEW: enable/disable quizzes
  settings?: QuizSettings;    // NEW: configuration
  tierFilter?: TierFilter;    // NEW: tier filtering for quizzes
}

export interface Prompt {
  id: string;
  subjectId: string;
  unitId: string;
  topicId: string;
  type: PromptType;
  question: string;
  answers: string[];
  paperId?: string;
  tier?: TierLevel;           // NEW: tier assignment (higher, foundation, or null)
  calculatorAllowed?: boolean;
  hint?: string;
  explanation?: string;
  meta?: {
    calculatorAllowed?: boolean;
    drawingRecommended?: boolean;
    [key: string]: any;
  };
  diagram_metadata?: {
    mode?: 'auto' | 'template' | 'asset';
    templateId?: string;
    placement?: 'above' | 'inline' | 'below' | 'side';
    caption?: string;
    alt?: string;
    params?: Record<string, any>;
  };
}

export interface Attempt {
  id: string;
  quizId: string;
  startedAt: string;
  finishedAt: string;
  correctPromptIds: string[];
  missedPromptIds: string[];
  timeTakenSec: number;
  accuracyPct: number;
}

export type MasteryLevel = 0 | 1 | 2 | 3 | 4;

export interface MasteryState {
  quizId: string;
  bestAccuracyPct: number;
  bestTimeSec: number;
  masteryLevel: MasteryLevel;
  lastPlayedAt: string;
}

export interface StreakState {
  currentStreakDays: number;
  bestStreakDays: number;
  lastActiveDate: string;
}

export interface UserProfile {
  xpTotal: number;
  level: number;
  badges: string[];
  totalQuizzes: number;
  totalTimeMinutes: number;
  masteredCount: number;
  grade9SpeedCount: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  weeklyXP: number;
  streak: number;
  readinessPercent: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  subjectId?: string;
  unitId?: string;
  themeTag?: string;
  isDaily: boolean;
  isFeatured: boolean;
  coverStyle: 'gradient' | 'image' | 'minimal';
  orderIndex: number;
  createdAt: string;
}

export interface PlaylistItem {
  id: string;
  playlistId: string;
  quizId: string;
  orderIndex: number;
  createdAt: string;
}

export interface UserSavedQuiz {
  id: string;
  userId: string;
  quizId: string;
  savedAt: string;
}

export type DiagramStorageMode = 'vector' | 'canvas-json' | 'image';
export type DiagramPlacement = 'above' | 'inline' | 'below';

export interface Diagram {
  id: string;
  title: string;
  subjectId?: string;
  diagramType: string;
  tags: string[];
  storageMode: DiagramStorageMode;
  canvasData: CanvasData;
  svgData?: string;
  pngUrl?: string;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}

export interface DiagramVersion {
  id: string;
  diagramId: string;
  versionNumber: number;
  canvasData: CanvasData;
  svgData?: string;
  createdAt: string;
}

export interface CanvasData {
  elements: CanvasElement[];
  gridEnabled?: boolean;
  snapToGrid?: boolean;
  backgroundColor?: string;
}

export type CanvasElementType = 'line' | 'arrow' | 'rectangle' | 'circle' | 'text' | 'point' | 'freehand' | 'polygon' | 'angle';

export interface CanvasElement {
  id: string;
  type: CanvasElementType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  x2?: number;
  y2?: number;
  radius?: number;
  points?: { x: number; y: number }[];
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  textAlign?: string;
  strokeColor: string;
  fillColor?: string;
  strokeWidth: number;
  dashed?: boolean;
  arrowhead?: boolean;
  opacity?: number;
  locked?: boolean;
  zIndex: number;
  angleValue?: number;
  arcRadius?: number;
}

export interface DiagramTemplate {
  id: string;
  templateId: string;
  title: string;
  subjectId?: string;
  subjectKey?: string;
  topicTags: string[];
  engineMode?: 'auto' | 'template';
  baseCanvasData?: CanvasData;
  baseSvgData?: string;
  width: number;
  height: number;
  anchors: DiagramAnchors;
  schema: DiagramSchema;
  defaults?: DiagramParams;
  thumbnailSvg?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiagramAnchors {
  points?: string[];
  text?: string[];
  lines?: string[];
  marks?: string[];
  groups?: string[];
}

export interface DiagramSchema {
  labels?: Record<string, { default?: string; maxLen?: number }>;
  values?: Record<string, { default?: number | string; min?: number; max?: number; type?: 'number' | 'string' }>;
  visibility?: Record<string, { default?: boolean }>;
  positions?: Record<string, { default?: { x: number; y: number }; linkedText?: string }>;
  styles?: {
    highlight?: string[];
    muted?: string[];
  };
}

export type DiagramMode = 'asset' | 'template' | 'auto' | 'custom';
export type DiagramPlacementType = 'above' | 'inline' | 'below' | 'side';

// Metadata-only (no-template) custom diagrams
export interface DiagramCustomBlueprint {
  version: number;
  size?: { width: number; height: number };
  viewBox?: string;
  background?: { grid?: boolean; axes?: boolean };
  defs?: {
    points?: Record<string, { x: number; y: number }>;
    labels?: Record<string, string>;
    values?: Record<string, string | number>;
  };
  layers: Array<{
    id: string;
    items: Array<Record<string, any>>;
  }>;
}


export interface DiagramMetadata {
  mode: DiagramMode;
  diagramId?: string;
  templateId?: string;
  // When mode=custom (or when custom is present), render diagram directly from this blueprint
  custom?: DiagramCustomBlueprint;
  placement?: DiagramPlacementType;
  caption?: string;
  alt?: string;
  overrides?: DiagramOverrides;
  params?: DiagramParams;
}

export interface DiagramOverrides {
  labels?: Record<string, string>;
  values?: Record<string, number | string>;
  visibility?: Record<string, boolean>;
  styles?: {
    highlight?: string[];
    muted?: string[];
  };
  positions?: Record<string, { x: number; y: number }>;
}

export interface DiagramParams {
  labels?: Record<string, string>;
  positions?: Record<string, { x: number; y: number }>;
  values?: Record<string, number | string>;
  visibility?: Record<string, boolean>;
}

export interface DiagramEngineTemplate {
  templateId: string;
  title: string;
  description: string;
  category: string;
  schema: DiagramTemplateSchema;
  render: (params: DiagramParams) => DiagramRenderResult;
}

export interface DiagramTemplateSchema {
  labels?: Record<string, { default?: string; required?: boolean; maxLen?: number }>;
  positions?: Record<string, { default?: { x: number; y: number }; required?: boolean; normalized?: boolean }>;
  values?: Record<string, { default?: number | string; required?: boolean; min?: number; max?: number; type?: 'number' | 'string' }>;
  visibility?: Record<string, { default?: boolean }>;
}

export interface DiagramRenderResult {
  svg: string;
  width: number;
  height: number;
  warnings?: string[];
}

export interface DiagramValidationResult {
  ok: boolean;
  warnings: string[];
  errors: string[];
}

// ===== PAPERS =====
export interface Paper {
  id: string;
  subjectId: string;
  paperNumber: 1 | 2 | 3;
  name: string;
  calculatorAllowedDefault: boolean;
  createdAt: string;
}
