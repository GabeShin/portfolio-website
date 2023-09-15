import React, { useState, useCallback } from "react";
import { Post } from "../../interfaces/posts.interface";
import { PostOverlay } from "./post-overlay";
import PostDetails from "./post-detail";
import { VoteCounter } from "./vote-counter";

export interface PostItemProperties {
  post: Post;
}

export const PostItem = ({ post }: PostItemProperties) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen((prevState) => !prevState);
  };

  const closeOverlay = () => setIsOverlayOpen(false);

  const onUpvote = useCallback((id: string) => {
    console.log("onUpvote", id);
  }, []);

  const onDownvote = useCallback((id: string) => {
    console.log("onDownvote", id);
  }, []);

  return (
    <>
      {isOverlayOpen && (
        <PostOverlay
          post={post}
          onClose={closeOverlay}
          onUpvote={() => onUpvote(post.id)}
          onDownvote={() => onDownvote(post.id)}
        />
      )}
      <div
        className="flex w-full h-fit bg-white hover:m-0 border-b-2 border-b-gray-300 hover:border-green-400 clickable-item"
        onClick={toggleOverlay}
      >
        <div className=" flex bg-gray-100">
          <VoteCounter
            counter={post.counter}
            onUpvote={() => onUpvote(post.id)}
            onDownvote={() => onDownvote(post.id)}
            orientation="horizontal"
          />
        </div>
        <PostDetails post={post} />
      </div>
    </>
  );
};

export default PostItem;
