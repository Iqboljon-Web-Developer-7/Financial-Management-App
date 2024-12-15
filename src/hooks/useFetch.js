import { useState, useEffect } from "react";
import { axiosFun } from "@/API/index";

export const useFetch = (path, params, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosFun
      .get(path, { params })
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [...deps]);

  return { data, loading, error };
};
