import useSWR from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";

const fetcher = async ([url, token]: [string, string | undefined]) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(url, { headers }).then((res) => res.data);
};

export function useProfile() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const REFRESH_INTERVAL_MS = 3600000;

  const { data, error, mutate } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles`, token],
    fetcher,
    {
      refreshInterval: REFRESH_INTERVAL_MS,
    }
  );

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
