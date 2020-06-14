import {useState, useEffect} from 'react';

const useFetchJson = (url, query) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    fetch(url + query)
      .then(setLoading(true))
      .then(response => {
        if(response.ok){
          return response.json()
        } else {
          throw new Error(response.status)
        }
      })
      .then(response => {
        setData(response);
        if(response.total_count) {
          setTotalCount(response.total_count)
        };
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      })
  }, [url, query]);

  return [loading, data, error, totalCount];
};

export default useFetchJson;