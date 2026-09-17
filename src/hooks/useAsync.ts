import { useEffect, useRef, useState } from 'react';

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
}

/**
 * Runs an async task and tracks idle/loading/success/error/empty states.
 * The latest request always wins: older in-flight requests are aborted and
 * their results discarded, so out-of-order responses can never clobber
 * fresh data (race-condition handling for debounced search).
 */
export function useAsync<T>(task: (signal: AbortSignal) => Promise<T>, deps: unknown[], enabled = true) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle', data: null, error: null });
  const runIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setState({ status: 'idle', data: null, error: null });
      return;
    }
    const controller = new AbortController();
    const runId = ++runIdRef.current;
    setState((s) => ({ status: 'loading', data: s.data, error: null }));
    task(controller.signal)
      .then((data) => {
        if (runId !== runIdRef.current) return; // a newer request superseded this one
        setState({ status: isEmpty(data) ? 'empty' : 'success', data, error: null });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return; // cancelled, ignore
        if (runId !== runIdRef.current) return;
        setState({ status: 'error', data: null, error: err instanceof Error ? err.message : 'Something went wrong' });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

function isEmpty(data: unknown): boolean {
  if (data == null) return true;
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object') return Object.keys(data).length === 0;
  return false;
}
