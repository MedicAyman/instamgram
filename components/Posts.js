import React from "react";
import Post from "./Post";

const DUMMY_POSTS = [
  {
    id: "123",
    username: "whattheayman",
    userImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.wGX20c9DLIL7UkXxmvTV_QHaGN%26pid%3DApi&f=1",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Elon_Musk_at_a_Press_Conference.jpg",
    caption: "Let justice be done, though the heavens fall",
  },
  {
    id: "145",
    username: "whattheayman",
    userImg:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.wGX20c9DLIL7UkXxmvTV_QHaGN%26pid%3DApi&f=1",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Elon_Musk_at_a_Press_Conference.jpg",
    caption: "Let justice be done, though the heavens fall",
  },
];
function Posts() {
  return (
    <div>
      {/* Post */}
      {DUMMY_POSTS.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
