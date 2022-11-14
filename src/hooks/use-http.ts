import { useState, useCallback } from 'react';
import { abortAndGetSignalSafe } from '../controllers';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (
      requestConfig: { urls: string[]; signalKeys?: string[] },
      applyData: any
    ) => {
      setIsLoading(true);

      try {
        const responses = await Promise.all(
          requestConfig.urls.map(async (url, idx) => {
            const response = await fetch(url, {
              ...(requestConfig.signalKeys && {
                signal: abortAndGetSignalSafe(requestConfig.signalKeys[idx]),
              }),
            });

            if (!response.ok) throw new Error(response.status.toString());
            return response;
          })
        );

        const data = await Promise.all(responses.map(res => res.json()));

        applyData(data);
      } catch (error: any) {
        if (error.name === 'AbortError')
          return new Response(JSON.stringify({}), {
            status: 499,
            statusText: 'Client Closed Request',
          });

        setError(error.message);
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
