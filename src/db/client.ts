import { createClient } from '@supabase/supabase-js';
import { Subject, Unit, Topic, Quiz, Prompt, Playlist, PlaylistItem, UserSavedQuiz } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const mapSubject = (row: any): Subject => ({
  id: row.id,
  name: row.name,
  examBoard: row.exam_board,
  description: row.description,
  icon: row.icon,
  themeColor: row.theme_color,
});

const mapUnit = (row: any): Unit => ({
  id: row.id,
  subjectId: row.subject_id,
  name: row.name,
  orderIndex: row.order_index,
  description: row.description,
});

const mapTopic = (row: any): Topic => ({
  id: row.id,
  subjectId: row.subject_id,
  unitId: row.unit_id,
  name: row.name,
  orderIndex: row.order_index,
  description: row.description,
});

const mapPrompt = (row: any): Prompt => ({
  id: row.id,
  subjectId: row.subject_id,
  unitId: row.unit_id,
  topicId: row.topic_id,
  type: row.type,
  question: row.question,
  answers: row.answers,
  hint: row.hint,
  explanation: row.explanation,
  meta: row.meta,
});

const mapQuiz = (row: any): Quiz => ({
  id: row.id,
  subjectId: row.subject_id,
  scopeType: row.scope_type,
  topicId: row.topic_id,
  unitId: row.unit_id,
  title: row.title,
  description: row.description,
  timeLimitSec: row.time_limit_sec,
  grade9TargetSec: row.grade9_target_sec,
  promptIds: row.prompt_ids,
});

const mapPlaylist = (row: any): Playlist => ({
  id: row.id,
  title: row.title,
  description: row.description,
  subjectId: row.subject_id,
  unitId: row.unit_id,
  themeTag: row.theme_tag,
  isDaily: row.is_daily,
  isFeatured: row.is_featured,
  coverStyle: row.cover_style,
  orderIndex: row.order_index,
  createdAt: row.created_at,
});

const mapPlaylistItem = (row: any): PlaylistItem => ({
  id: row.id,
  playlistId: row.playlist_id,
  quizId: row.quiz_id,
  orderIndex: row.order_index,
  createdAt: row.created_at,
});

const mapUserSavedQuiz = (row: any): UserSavedQuiz => ({
  id: row.id,
  userId: row.user_id,
  quizId: row.quiz_id,
  savedAt: row.saved_at,
});

export const db = {
  getSubjects: async (): Promise<Subject[]> => {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name');

    if (error) throw error;
    return (data || []).map(mapSubject);
  },

  getSubject: async (subjectId: string): Promise<Subject | undefined> => {
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', subjectId)
      .maybeSingle();

    if (error) throw error;
    return data ? mapSubject(data) : undefined;
  },

  getUnits: async (subjectId: string): Promise<Unit[]> => {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('subject_id', subjectId)
      .order('order_index');

    if (error) throw error;
    return (data || []).map(mapUnit);
  },

  getTopics: async (subjectId: string): Promise<Topic[]> => {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('subject_id', subjectId)
      .order('order_index');

    if (error) throw error;
    return (data || []).map(mapTopic);
  },

  getTopicsByUnit: async (unitId: string): Promise<Topic[]> => {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('unit_id', unitId)
      .order('order_index');

    if (error) throw error;
    return (data || []).map(mapTopic);
  },

  getQuizzesBySubject: async (subjectId: string): Promise<Quiz[]> => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('subject_id', subjectId);

    if (error) throw error;
    return (data || []).map(mapQuiz);
  },

  getQuizzesByTopic: async (topicId: string): Promise<Quiz[]> => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('topic_id', topicId);

    if (error) throw error;
    return (data || []).map(mapQuiz);
  },

  getQuizzesByUnit: async (unitId: string): Promise<Quiz[]> => {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('unit_id', unitId);

    if (error) throw error;
    return (data || []).map(mapQuiz);
  },

  getQuiz: async (quizId: string): Promise<Quiz | undefined> => {
    const { data, error} = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .maybeSingle();

    if (error) throw error;
    return data ? mapQuiz(data) : undefined;
  },

  getPromptsByIds: async (promptIds: string[]): Promise<Prompt[]> => {
    if (promptIds.length === 0) return [];

    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .in('id', promptIds);

    if (error) throw error;

    const promptMap = new Map((data || []).map(p => [p.id, mapPrompt(p)]));
    return promptIds.map(id => promptMap.get(id)).filter(Boolean) as Prompt[];
  },

  getPrompt: async (promptId: string): Promise<Prompt | undefined> => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', promptId)
      .maybeSingle();

    if (error) throw error;
    return data ? mapPrompt(data) : undefined;
  },

  getPromptsBySubject: async (subjectId: string): Promise<Prompt[]> => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('subject_id', subjectId);

    if (error) throw error;
    return (data || []).map(mapPrompt);
  },

  getPromptsByTopic: async (topicId: string): Promise<Prompt[]> => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('topic_id', topicId);

    if (error) throw error;
    return (data || []).map(mapPrompt);
  },

  createSubject: async (subject: Omit<Subject, 'id'>): Promise<Subject> => {
    const { data, error } = await supabase
      .from('subjects')
      .insert({
        name: subject.name,
        exam_board: subject.examBoard,
        description: subject.description,
        icon: subject.icon,
        theme_color: subject.themeColor,
      })
      .select()
      .single();

    if (error) throw error;
    return mapSubject(data);
  },

  updateSubject: async (id: string, updates: Partial<Subject>): Promise<void> => {
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.examBoard) dbUpdates.exam_board = updates.examBoard;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.icon) dbUpdates.icon = updates.icon;
    if (updates.themeColor) dbUpdates.theme_color = updates.themeColor;

    const { error } = await supabase
      .from('subjects')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  deleteSubject: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  createUnit: async (unit: Omit<Unit, 'id'>): Promise<Unit> => {
    const { data, error } = await supabase
      .from('units')
      .insert({
        subject_id: unit.subjectId,
        name: unit.name,
        order_index: unit.orderIndex,
        description: unit.description,
      })
      .select()
      .single();

    if (error) throw error;
    return mapUnit(data);
  },

  createTopic: async (topic: Omit<Topic, 'id'>): Promise<Topic> => {
    const { data, error } = await supabase
      .from('topics')
      .insert({
        subject_id: topic.subjectId,
        unit_id: topic.unitId,
        name: topic.name,
        order_index: topic.orderIndex,
        description: topic.description,
      })
      .select()
      .single();

    if (error) throw error;
    return mapTopic(data);
  },

  createPrompt: async (prompt: Omit<Prompt, 'id'>): Promise<Prompt> => {
    const { data, error } = await supabase
      .from('prompts')
      .insert({
        subject_id: prompt.subjectId,
        unit_id: prompt.unitId,
        topic_id: prompt.topicId,
        type: prompt.type,
        question: prompt.question,
        answers: prompt.answers,
        hint: prompt.hint,
        explanation: prompt.explanation,
        meta: prompt.meta,
      })
      .select()
      .single();

    if (error) throw error;
    return mapPrompt(data);
  },

  updatePrompt: async (id: string, updates: Partial<Prompt>): Promise<void> => {
    const dbUpdates: any = {};
    if (updates.question) dbUpdates.question = updates.question;
    if (updates.answers) dbUpdates.answers = updates.answers;
    if (updates.hint !== undefined) dbUpdates.hint = updates.hint;
    if (updates.explanation !== undefined) dbUpdates.explanation = updates.explanation;
    if (updates.type) dbUpdates.type = updates.type;
    if (updates.meta !== undefined) dbUpdates.meta = updates.meta;

    const { error } = await supabase
      .from('prompts')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  deletePrompt: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  createQuiz: async (quiz: Omit<Quiz, 'id'>): Promise<Quiz> => {
    const { data, error } = await supabase
      .from('quizzes')
      .insert({
        subject_id: quiz.subjectId,
        scope_type: quiz.scopeType,
        topic_id: quiz.topicId,
        unit_id: quiz.unitId,
        title: quiz.title,
        description: quiz.description,
        time_limit_sec: quiz.timeLimitSec,
        grade9_target_sec: quiz.grade9TargetSec,
        prompt_ids: quiz.promptIds,
      })
      .select()
      .single();

    if (error) throw error;
    return mapQuiz(data);
  },

  updateQuiz: async (id: string, updates: Partial<Quiz>): Promise<void> => {
    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.timeLimitSec) dbUpdates.time_limit_sec = updates.timeLimitSec;
    if (updates.grade9TargetSec) dbUpdates.grade9_target_sec = updates.grade9TargetSec;
    if (updates.promptIds) dbUpdates.prompt_ids = updates.promptIds;

    const { error } = await supabase
      .from('quizzes')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  deleteQuiz: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getLeaderboard: async () => {
    return [];
  },

  getPlaylists: async (): Promise<Playlist[]> => {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .order('order_index');

    if (error) throw error;
    return (data || []).map(mapPlaylist);
  },

  getFeaturedPlaylists: async (): Promise<Playlist[]> => {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('is_featured', true)
      .order('order_index');

    if (error) throw error;
    return (data || []).map(mapPlaylist);
  },

  getDailyPlaylists: async (): Promise<Playlist[]> => {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('is_daily', true)
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    return (data || []).map(mapPlaylist);
  },

  getPlaylist: async (playlistId: string): Promise<Playlist | undefined> => {
    const { data, error } = await supabase
      .from('playlists')
      .select('*')
      .eq('id', playlistId)
      .maybeSingle();

    if (error) throw error;
    return data ? mapPlaylist(data) : undefined;
  },

  getPlaylistItems: async (playlistId: string): Promise<PlaylistItem[]> => {
    const { data, error } = await supabase
      .from('playlist_items')
      .select('*')
      .eq('playlist_id', playlistId)
      .order('order_index');

    if (error) throw error;
    return (data || []).map(mapPlaylistItem);
  },

  getPlaylistQuizzes: async (playlistId: string): Promise<Quiz[]> => {
    const items = await db.getPlaylistItems(playlistId);
    if (items.length === 0) return [];

    const quizIds = items.map(item => item.quizId);
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .in('id', quizIds);

    if (error) throw error;

    const quizMap = new Map((data || []).map(q => [q.id, mapQuiz(q)]));
    return quizIds.map(id => quizMap.get(id)).filter(Boolean) as Quiz[];
  },

  createPlaylist: async (playlist: Omit<Playlist, 'id' | 'createdAt'>): Promise<Playlist> => {
    const { data, error } = await supabase
      .from('playlists')
      .insert({
        title: playlist.title,
        description: playlist.description,
        subject_id: playlist.subjectId,
        unit_id: playlist.unitId,
        theme_tag: playlist.themeTag,
        is_daily: playlist.isDaily,
        is_featured: playlist.isFeatured,
        cover_style: playlist.coverStyle,
        order_index: playlist.orderIndex,
      })
      .select()
      .single();

    if (error) throw error;
    return mapPlaylist(data);
  },

  addQuizToPlaylist: async (playlistId: string, quizId: string, orderIndex: number): Promise<PlaylistItem> => {
    const { data, error } = await supabase
      .from('playlist_items')
      .insert({
        playlist_id: playlistId,
        quiz_id: quizId,
        order_index: orderIndex,
      })
      .select()
      .single();

    if (error) throw error;
    return mapPlaylistItem(data);
  },

  getSavedQuizzes: async (userId: string): Promise<string[]> => {
    const { data, error } = await supabase
      .from('user_saved_quizzes')
      .select('quiz_id')
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) throw error;
    return (data || []).map(row => row.quiz_id);
  },

  saveQuiz: async (userId: string, quizId: string): Promise<void> => {
    const { error } = await supabase
      .from('user_saved_quizzes')
      .insert({
        user_id: userId,
        quiz_id: quizId,
      });

    if (error && error.code !== '23505') throw error;
  },

  unsaveQuiz: async (userId: string, quizId: string): Promise<void> => {
    const { error } = await supabase
      .from('user_saved_quizzes')
      .delete()
      .eq('user_id', userId)
      .eq('quiz_id', quizId);

    if (error) throw error;
  },

  isSaved: async (userId: string, quizId: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from('user_saved_quizzes')
      .select('id')
      .eq('user_id', userId)
      .eq('quiz_id', quizId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  deletePlaylist: async (playlistId: string): Promise<void> => {
    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId);

    if (error) throw error;
  },

  updatePlaylist: async (id: string, updates: Partial<Playlist>): Promise<void> => {
    const dbUpdates: any = {};
    if (updates.title) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.themeTag !== undefined) dbUpdates.theme_tag = updates.themeTag;
    if (updates.isDaily !== undefined) dbUpdates.is_daily = updates.isDaily;
    if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
    if (updates.coverStyle) dbUpdates.cover_style = updates.coverStyle;
    if (updates.orderIndex !== undefined) dbUpdates.order_index = updates.orderIndex;

    const { error } = await supabase
      .from('playlists')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  removeAllQuizzesFromPlaylist: async (playlistId: string): Promise<void> => {
    const { error } = await supabase
      .from('playlist_items')
      .delete()
      .eq('playlist_id', playlistId);

    if (error) throw error;
  },

  updateUnit: async (id: string, updates: Partial<Unit>): Promise<void> => {
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.orderIndex !== undefined) dbUpdates.order_index = updates.orderIndex;

    const { error } = await supabase
      .from('units')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  deleteUnit: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('units')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  updateTopic: async (id: string, updates: Partial<Topic>): Promise<void> => {
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.description) dbUpdates.description = updates.description;
    if (updates.orderIndex !== undefined) dbUpdates.order_index = updates.orderIndex;

    const { error } = await supabase
      .from('topics')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  deleteTopic: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  getPromptsByUnit: async (unitId: string): Promise<Prompt[]> => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('unit_id', unitId);

    if (error) throw error;
    return (data || []).map(mapPrompt);
  },

  getAllPrompts: async (): Promise<Prompt[]> => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*');

    if (error) throw error;
    return (data || []).map(mapPrompt);
  },

  supabase,
};

  // ===== COVERAGE FUNCTIONS =====

  getPapers: async (subjectId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('subject_id', subjectId)
      .order('paper_number');

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      subjectId: row.subject_id,
      paperNumber: row.paper_number,
      name: row.name,
      calculatorAllowedDefault: row.calculator_allowed_default,
      createdAt: row.created_at,
    })),

  getPaper: async (paperId: string): Promise<any | undefined> => {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('id', paperId)
      .maybeSingle();

    if (error) throw error;
    return data ? {
      id: data.id,
      subjectId: data.subject_id,
      paperNumber: data.paper_number,
      name: data.name,
      calculatorAllowedDefault: data.calculator_allowed_default,
      createdAt: data.created_at,
    } : undefined;
  },

  createPaper: async (paper: any): Promise<any> => {
    const { data, error } = await supabase
      .from('papers')
      .insert({
        subject_id: paper.subjectId,
        paper_number: paper.paperNumber,
        name: paper.name,
        calculator_allowed_default: paper.calculatorAllowedDefault,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      subjectId: data.subject_id,
      paperNumber: data.paper_number,
      name: data.name,
      calculatorAllowedDefault: data.calculator_allowed_default,
      createdAt: data.created_at,
    };
  },

  getQuestionTypes: async (subjectId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('question_types')
      .select('*')
      .eq('subject_id', subjectId);

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      subjectId: row.subject_id,
      paperId: row.paper_id,
      unitId: row.unit_id,
      topicId: row.topic_id,
      typeId: row.type_id,
      title: row.title,
      difficultyMin: row.difficulty_min,
      difficultyMax: row.difficulty_max,
      marksMin: row.marks_min,
      marksMax: row.marks_max,
      calculatorAllowed: row.calculator_allowed,
      diagramTemplateId: row.diagram_template_id,
      tags: row.tags || [],
      createdAt: row.created_at,
    }));
  },

  getQuestionTypesByTopic: async (topicId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('question_types')
      .select('*')
      .eq('topic_id', topicId);

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      subjectId: row.subject_id,
      paperId: row.paper_id,
      unitId: row.unit_id,
      topicId: row.topic_id,
      typeId: row.type_id,
      title: row.title,
      difficultyMin: row.difficulty_min,
      difficultyMax: row.difficulty_max,
      marksMin: row.marks_min,
      marksMax: row.marks_max,
      calculatorAllowed: row.calculator_allowed,
      diagramTemplateId: row.diagram_template_id,
      tags: row.tags || [],
      createdAt: row.created_at,
    }));
  },

  createQuestionType: async (qt: any): Promise<any> => {
    const { data, error } = await supabase
      .from('question_types')
      .insert({
        subject_id: qt.subjectId,
        paper_id: qt.paperId,
        unit_id: qt.unitId,
        topic_id: qt.topicId,
        type_id: qt.typeId,
        title: qt.title,
        difficulty_min: qt.difficultyMin,
        difficulty_max: qt.difficultyMax,
        marks_min: qt.marksMin,
        marks_max: qt.marksMax,
        calculator_allowed: qt.calculatorAllowed,
        diagram_template_id: qt.diagramTemplateId,
        tags: qt.tags || [],
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      subjectId: data.subject_id,
      paperId: data.paper_id,
      unitId: data.unit_id,
      topicId: data.topic_id,
      typeId: data.type_id,
      title: data.title,
      difficultyMin: data.difficulty_min,
      difficultyMax: data.difficulty_max,
      marksMin: data.marks_min,
      marksMax: data.marks_max,
      calculatorAllowed: data.calculator_allowed,
      diagramTemplateId: data.diagram_template_id,
      tags: data.tags || [],
      createdAt: data.created_at,
    };
  },

  getCoverageSettings: async (subjectId: string): Promise<any | undefined> => {
    const { data, error } = await supabase
      .from('coverage_settings')
      .select('*')
      .eq('subject_id', subjectId)
      .maybeSingle();

    if (error) throw error;
    return data ? {
      id: data.id,
      subjectId: data.subject_id,
      minPromptsPerQuestionType: data.min_prompts_per_question_type,
      minPromptsPerTopic: data.min_prompts_per_topic,
      minPromptsPerUnit: data.min_prompts_per_unit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } : undefined;
  },

  createCoverageSettings: async (settings: any): Promise<any> => {
    const { data, error } = await supabase
      .from('coverage_settings')
      .insert({
        subject_id: settings.subjectId,
        min_prompts_per_question_type: settings.minPromptsPerQuestionType || 10,
        min_prompts_per_topic: settings.minPromptsPerTopic || 50,
        min_prompts_per_unit: settings.minPromptsPerUnit || 200,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      subjectId: data.subject_id,
      minPromptsPerQuestionType: data.min_prompts_per_question_type,
      minPromptsPerTopic: data.min_prompts_per_topic,
      minPromptsPerUnit: data.min_prompts_per_unit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  updateCoverageSettings: async (id: string, settings: any): Promise<void> => {
    const dbUpdates: any = {};
    if (settings.minPromptsPerQuestionType !== undefined) dbUpdates.min_prompts_per_question_type = settings.minPromptsPerQuestionType;
    if (settings.minPromptsPerTopic !== undefined) dbUpdates.min_prompts_per_topic = settings.minPromptsPerTopic;
    if (settings.minPromptsPerUnit !== undefined) dbUpdates.min_prompts_per_unit = settings.minPromptsPerUnit;

    const { error } = await supabase
      .from('coverage_settings')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },

  // ===== COVERAGE FUNCTIONS =====

    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('subject_id', subjectId)
      .order('paper_number');

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      subjectId: row.subject_id,
      paperNumber: row.paper_number,
      name: row.name,
      calculatorAllowedDefault: row.calculator_allowed_default,
      createdAt: row.created_at,
    })),
  },

  getPaper: async (paperId: string): Promise<any | undefined> => {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('id', paperId)
      .maybeSingle();

    if (error) throw error;
    return data ? {
      id: data.id,
      subjectId: data.subject_id,
      paperNumber: data.paper_number,
      name: data.name,
      calculatorAllowedDefault: data.calculator_allowed_default,
      createdAt: data.created_at,
    } : undefined;
  },

  createPaper: async (paper: any): Promise<any> => {
    const { data, error } = await supabase
      .from('papers')
      .insert({
        subject_id: paper.subjectId,
        paper_number: paper.paperNumber,
        name: paper.name,
        calculator_allowed_default: paper.calculatorAllowedDefault,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      subjectId: data.subject_id,
      paperNumber: data.paper_number,
      name: data.name,
      calculatorAllowedDefault: data.calculator_allowed_default,
      createdAt: data.created_at,
    };
  },

  getQuestionTypes: async (subjectId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('question_types')
      .select('*')
      .eq('subject_id', subjectId);

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      subjectId: row.subject_id,
      paperId: row.paper_id,
      unitId: row.unit_id,
      topicId: row.topic_id,
      typeId: row.type_id,
      title: row.title,
      difficultyMin: row.difficulty_min,
      difficultyMax: row.difficulty_max,
      marksMin: row.marks_min,
      marksMax: row.marks_max,
      calculatorAllowed: row.calculator_allowed,
      diagramTemplateId: row.diagram_template_id,
      tags: row.tags || [],
      createdAt: row.created_at,
    }));
  },

  getQuestionTypesByTopic: async (topicId: string): Promise<any[]> => {
    const { data, error } = await supabase
      .from('question_types')
      .select('*')
      .eq('topic_id', topicId);

    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      subjectId: row.subject_id,
      paperId: row.paper_id,
      unitId: row.unit_id,
      topicId: row.topic_id,
      typeId: row.type_id,
      title: row.title,
      difficultyMin: row.difficulty_min,
      difficultyMax: row.difficulty_max,
      marksMin: row.marks_min,
      marksMax: row.marks_max,
      calculatorAllowed: row.calculator_allowed,
      diagramTemplateId: row.diagram_template_id,
      tags: row.tags || [],
      createdAt: row.created_at,
    }));
  },

  createQuestionType: async (qt: any): Promise<any> => {
    const { data, error } = await supabase
      .from('question_types')
      .insert({
        subject_id: qt.subjectId,
        paper_id: qt.paperId,
        unit_id: qt.unitId,
        topic_id: qt.topicId,
        type_id: qt.typeId,
        title: qt.title,
        difficulty_min: qt.difficultyMin,
        difficulty_max: qt.difficultyMax,
        marks_min: qt.marksMin,
        marks_max: qt.marksMax,
        calculator_allowed: qt.calculatorAllowed,
        diagram_template_id: qt.diagramTemplateId,
        tags: qt.tags || [],
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      subjectId: data.subject_id,
      paperId: data.paper_id,
      unitId: data.unit_id,
      topicId: data.topic_id,
      typeId: data.type_id,
      title: data.title,
      difficultyMin: data.difficulty_min,
      difficultyMax: data.difficulty_max,
      marksMin: data.marks_min,
      marksMax: data.marks_max,
      calculatorAllowed: data.calculator_allowed,
      diagramTemplateId: data.diagram_template_id,
      tags: data.tags || [],
      createdAt: data.created_at,
    };
  },

  getCoverageSettings: async (subjectId: string): Promise<any | undefined> => {
    const { data, error } = await supabase
      .from('coverage_settings')
      .select('*')
      .eq('subject_id', subjectId)
      .maybeSingle();

    if (error) throw error;
    return data ? {
      id: data.id,
      subjectId: data.subject_id,
      minPromptsPerQuestionType: data.min_prompts_per_question_type,
      minPromptsPerTopic: data.min_prompts_per_topic,
      minPromptsPerUnit: data.min_prompts_per_unit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    } : undefined;
  },

  createCoverageSettings: async (settings: any): Promise<any> => {
    const { data, error } = await supabase
      .from('coverage_settings')
      .insert({
        subject_id: settings.subjectId,
        min_prompts_per_question_type: settings.minPromptsPerQuestionType || 10,
        min_prompts_per_topic: settings.minPromptsPerTopic || 50,
        min_prompts_per_unit: settings.minPromptsPerUnit || 200,
      })
      .select()
      .single();

    if (error) throw error;
    return {
      id: data.id,
      subjectId: data.subject_id,
      minPromptsPerQuestionType: data.min_prompts_per_question_type,
      minPromptsPerTopic: data.min_prompts_per_topic,
      minPromptsPerUnit: data.min_prompts_per_unit,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  },

  updateCoverageSettings: async (id: string, settings: any): Promise<void> => {
    const dbUpdates: any = {};
    if (settings.minPromptsPerQuestionType !== undefined) dbUpdates.min_prompts_per_question_type = settings.minPromptsPerQuestionType;
    if (settings.minPromptsPerTopic !== undefined) dbUpdates.min_prompts_per_topic = settings.minPromptsPerTopic;
    if (settings.minPromptsPerUnit !== undefined) dbUpdates.min_prompts_per_unit = settings.minPromptsPerUnit;

    const { error } = await supabase
      .from('coverage_settings')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw error;
  },
};
