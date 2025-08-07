import React, { useState } from "react";
import { searchAmazon } from "./api/search";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const items = await searchAmazon(query);
      setResults(items);
    } catch (err) {
      console.error("Error fetching Amazon results:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">DealDigger</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-l w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-r"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item, i) => (
          <div key={i} className="border rounded p-4 shadow">
            <img
              src={item.Images?.Primary?.Medium?.URL}
              alt={item.ItemInfo?.Title?.DisplayValue}
              className="mb-2 w-full h-48 object-contain"
            />
            <h2 className="font-semibold text-lg">
              {item.ItemInfo?.Title?.DisplayValue}
            </h2>
            <p className="text-green-700 font-bold mt-1">
              ${item.Offers?.Listings?.[0]?.Price?.Amount}
            </p>
            <a
              href={item.DetailPageURL}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline block mt-2"
            >
              View on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
