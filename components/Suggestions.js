/* eslint-disable @next/next/no-img-element */
import faker from "@faker-js/faker";
import React, { useEffect, useState } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    setSuggestions(suggestions);
  }, []);
  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-4">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            src={profile.avatar}
            alt="suggested profile picture"
            className="w-10 h-10 rounded-full border p-[2px]"
          />
          <div className="flex-1 ml-4">
            <h2 className="font-semiblod text-sm">{profile.username}</h2>
            <h3 className="text-gray-400 text-sm">
              Works at {profile.company.name}
            </h3>
          </div>
          <button className="text-blue-400 text-sm font-semibold">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
