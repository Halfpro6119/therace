/**
 * Centralized DB query hook: runs an async query with loading/error state and optional error toast.
 * Use for consistent error handling and logging when calling db.* methods.
 */
import { useState, useCallback, useEffect } from 'react';

export interface UseDbQueryOptions<T> {
  /** If provided, called on error (e.g. toast.error). */
  onError?: (error: Error) => void;
  /** Initial data before first load. */
  initialData?: T;
}

export interface UseDbQueryResult<T> {
  data: T | undefined;
  error: Error | undefined;
  loading: boolean;
  refetch: () => Promise<void>;
}

/**
 * Run an async query (e.g. db.getQuiz) with loading and error state.
 * Runs on mount and when deps change. Optionally pass onError to show a toast or log.
 *
 * @example
 * const { data, error, loading, refetch } = useDbQuery(
 *   () => db.getQuiz(quizId),
 *   [quizId],
 *   { onError: (e) => toast.error(e.message) }
 * );
 */
export function useDbQuery<T>(
  queryFn: () => Promise<T | undefined>,
  deps: React.DependencyList,
  options: UseDbQueryOptions<T> = {}
): UseDbQueryResult<T> {
  const { onError, initialData } = options;
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      onError?.(e);
      if (import.meta.env?.DEV) {
        console.error('[useDbQuery]', e);
      }
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, error, loading, refetch: run };
}
