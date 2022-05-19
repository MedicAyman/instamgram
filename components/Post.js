/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { deleteDoc, doc, query, setDoc } from "firebase/firestore";

import {
  BookmarkIcon,
  EmojiHappyIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
function Post({ id, username, userImg, img, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );
  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uuid) !== -1
    );
  }, [likes, hasLiked, session?.user?.uuid]);
  const likesPost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uuid));
    } else {
      console.log("liked");
      await setDoc(doc(db, "posts", id, "likes", session.user.uuid), {
        username: session.user.username,
      });
    }
  };
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

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
            {hasLiked ? (
              <HeartIconSolid onClick={likesPost} className="post_buttons" />
            ) : (
              <HeartIcon onClick={likesPost} className="post_buttons" />
            )}
            <ChatIcon className="post_buttons" />
            <PaperAirplaneIcon className="post_buttons" />
          </div>
          <BookmarkIcon className="post_buttons" />
        </div>
      )}
      {/* Captions */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p className="font-bold mb-1">{likes.length} Likes</p>
        )}
        <span className="font-bold mr-2">{username}</span>
        {caption}
      </p>
      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((c) => (
            <div key={c.id} className="flex items-center space-x-2 mb-3">
              <img
                src={c.data().userImage}
                alt="user Image"
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{c.data().username}</span>
                {"   "}
                {c.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {c.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* Input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="border-none flex-1 focus:ring-0 outline-none"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            //disabled={}
            className="font-semibold text-blue-400"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
