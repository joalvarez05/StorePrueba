import React, { useState } from "react";

const MAPBOX_TOKEN = import.meta.env.VITE_API_TOKEN;

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&language=es&country=AR&limit=5&bbox=-66.5,-27.5,-64.5,-25.5`
    );

    const data = await response.json();
    setSuggestions(data.features);
  };

  const handleSelect = (place) => {
    setQuery(place.place_name);
    setSuggestions([]);
    if (onSelect) onSelect(place.place_name); //
  };

  return (
    <div className="relative">
      <label
        htmlFor="direccion"
        className="flex items-center gap-2 text-sm font-medium text-gray-700"
      ></label>
      <input
        type="text"
        name="direccion"
        id="direccion"
        placeholder="Buscar dirección "
        value={query}
        onChange={handleInput}
        className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            background: "#fff",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            zIndex: 1000,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
            >
              {item.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
