import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const clearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form onSubmit={handleSearch} className="mb-2">
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button type="submit" className="bg-orange rounded m-1 p-1">
          Search
        </button>
        <button
          type="button"
          onClick={clearSearch}
          className="bg-teal text-white p-1 rounded"
        >
          Clear
        </button>
      </form>
      {!error && loading ? (
        <div className="font-bold text-orange-dark">Loading Results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(({ objectID, url, title }) => (
            <li key={objectID}>
              <a
                href={url}
                className="text-indigo-dark hover:text-indigo-darkest"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}
