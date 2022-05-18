/* eslint-disable @next/next/no-img-element */
import React from "react";

import { HearIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  BookmarkIcon,
  EmojiHappyIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5 ">
        <img
          src={userImg}
          alt="user image"
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>
      {/* Image */}
      <img src={img} alt="user shared image" className="object-cover w-full" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="post_buttons" />
            <ChatIcon className="post_buttons" />
            <PaperAirplaneIcon className="post_buttons" />
          </div>
          <BookmarkIcon className="post_buttons" />
        </div>
      )}
      {/* Captions */}
      <p className="p-5 truncate">
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* Comments */}
      {/* Input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none"
            placeholder="Add a comment..."
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      )}
    </div>
  );
}

export default Post;
