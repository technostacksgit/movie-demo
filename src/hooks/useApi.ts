// useApi.ts
import { apiCall, ApiCallConfig } from "@/lib/utils/common/api.utils";
import { useState } from "react";

interface UseApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  callApi: (config: ApiCallConfig) => Promise<T>;
}

export const useApi = <T = unknown>(): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (config: ApiCallConfig): Promise<T> => {
    setLoading(true);
    setError(null);

    try {
      const responseData = await apiCall<T>(config);
      setData(responseData);
      return responseData;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, isLoading, error, callApi };
};