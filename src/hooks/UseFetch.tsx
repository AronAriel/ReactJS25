import { useState, useEffect } from "react";

type FetchOptions = RequestInit;

type FetchLog = {
  url: string;
  method: string;
  payload: any;
  status: number | string;
  timestamp: string;
  error?: string;
};

type UseFetchResult<T> = {
  data: T | undefined;
  status: number | string | null;
  error: Error | null;
};

export const useFetch = <T = unknown>(url: string | null, options: FetchOptions = {}): UseFetchResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [status, setStatus] = useState<number | string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: T = await response.json();
        setData(responseData);
        setStatus(response.status);

        let payload: any = null;
        try {
          payload = options.body ? JSON.parse(options.body as string) : null;
        } catch {
          payload = options.body;
        }

        const log: FetchLog = {
          url,
          method: options.method || "GET",
          payload,
          status: response.status,
          timestamp: new Date().toISOString(),
        };

        const prevLogs: FetchLog[] = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
        localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, log]));
      } catch (err: unknown) {
        const errorObj = err instanceof Error ? err : new Error("Unknown error");
        setError(errorObj);
        setStatus("error");

        let payload: any = null;
        try {
          payload = options.body ? JSON.parse(options.body as string) : null;
        } catch {
          payload = options.body;
        }

        const errorLog: FetchLog = {
          url,
          method: options.method || "GET",
          payload,
          status: "error",
          error: errorObj.message,
          timestamp: new Date().toISOString(),
        };

        const prevLogs: FetchLog[] = JSON.parse(localStorage.getItem("fetchLogs") || "[]");
        localStorage.setItem("fetchLogs", JSON.stringify([...prevLogs, errorLog]));
      }
    };

    fetchData();
    // Примечание: лучше следить за изменениями url и options вне useEffect
  }, [url, options]);

  return { data, status, error };
};
