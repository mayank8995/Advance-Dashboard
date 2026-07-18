import { useQueryClient } from '@tanstack/react-query';
import { useSyncExternalStore, useCallback } from 'react';

export function useQueryStatusByKey(staticKeyPrefix: any[]) {
  const queryClient = useQueryClient();
  const cache = queryClient.getQueryCache();

  const getSnapshot = useCallback(() => {
    const queries = cache.findAll({ queryKey: staticKeyPrefix });
    return {
      isLoading: queries.some(
        (q) =>
          q.state.fetchStatus === 'fetching' && q.state.status === 'pending'
      ),
      isError: queries.some((q) => q.state.status === 'error'),
    };
  }, [cache, staticKeyPrefix]);

  return useSyncExternalStore(
    (onChange) => cache.subscribe(onChange),
    getSnapshot,
    getSnapshot
  );
}
