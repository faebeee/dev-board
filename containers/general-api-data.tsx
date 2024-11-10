"use client";

import {useEffect, useState} from "react";
import {fetchApi} from "@/lib/fetch-api";
import {useInterval} from "react-use";
import {differenceBy} from "lodash";

export function GeneralApiData<T>({children, endpoint, identifier, onNew, fetchInit}: {
  endpoint: string,
  identifier?: string;
  onNew?: (data: T | null) => void;
  children: (data: T | null) => JSX.Element,
  fetchInit?: RequestInit;
}) {
  const [data, setData] = useState<T | null>(null);

  const load = async () => {
    const response = await fetchApi(endpoint, fetchInit)
    const d = await response.json() as T;
    if (data && Array.isArray(data) && Array.isArray(d) && identifier) {
      const newData = differenceBy(d, data ?? [], identifier);
      if (newData.length > 0) {
        onNew?.(newData as T);
      }
    }
    setData(d)
  }

  useInterval(
    () => {
      load()
    },
    60_000
  );


  useEffect(() => {
    load();
  }, []);

  return <>{children(data)}</>;
}