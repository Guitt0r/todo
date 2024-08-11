import { type ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useCreateQueryString = (searchParams: ReadonlyURLSearchParams) => {
  return useCallback(
    (query: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString());
      query.forEach((param) => params.set(param.name, param.value));
      return params.toString();
    },
    [searchParams]
  );
};
