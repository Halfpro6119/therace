// Paper types for exam paper organization

export interface Paper {
  id: string;
  subjectId: string;
  paperKey: string;
  paperNumber?: number;
  name: string;
  calculatorAllowedDefault: boolean;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaperInput {
  subjectId: string;
  paperKey: string;
  paperNumber?: number;
  name: string;
  calculatorAllowedDefault?: boolean;
  description?: string;
  sortOrder?: number;
}

export interface UpdatePaperInput {
  name?: string;
  calculatorAllowedDefault?: boolean;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface PaperWithQuestionCount extends Paper {
  questionCount: number;
}
