import {} from "./Story";
import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Story from "./Story";
function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div
      className="flex space-x-2 p-6 bg-white border-gray-200 
                rounded-sm overflow-x-scroll scrollbar-thumb-black"
    >
      {/* Story */}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
