import {useState, useEffect} from 'react';

const useFetchJson = (baseUrl, queryString) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const resetTotalCount = () => {
    setTotalCount(0);
  }

  useEffect(() => {
    if(queryString !== ``) {
      fetch(baseUrl + queryString)
      .then(setLoading(true))
      .then(setError(null))
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
    }
  }, [queryString]);

  return [loading, data, error, totalCount, resetTotalCount];
};

export default useFetchJson;