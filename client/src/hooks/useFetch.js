import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState({ content: '' });
  useEffect(() => {
    if (window) window.scrollTo(0, 0);
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [url]);
  return data;
};

export default useFetch;
