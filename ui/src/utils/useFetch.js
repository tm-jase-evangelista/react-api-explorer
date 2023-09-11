import { useEffect, useState } from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = (url) => {
    fetch(url)
    .then((res) => {
      if(!res.ok){
        setLoading(false);
        throw new Error(res.status + " Network response not OK");
      }
      const jsonData = res.json();
      return jsonData;
    }).then((data) => {
      setData(data);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      console.error(error);
    })
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, loading, error };
}
