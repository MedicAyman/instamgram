import {} from "./Story";
import React, { useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Story from "./Story";
import { useSession } from "next-auth/react";
function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();
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
      {session && (
        <Story img={session?.user.image} username={session.user.username} />
      )}
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
