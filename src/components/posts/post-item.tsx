import React, { useState, useCallback, useEffect } from "react";
import { IPost } from "../../interfaces/posts.interface";
import { PostOverlay } from "./post-overlay";
import PostDetails from "./post-detail";
import { VoteCounter } from "./vote-counter";

export interface PostItemProperties {
  post: IPost;
}

export const PostItem = ({ post: tempPost }: PostItemProperties) => {
  const [post, setPost] = useState<IPost>(tempPost);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen((prevState) => !prevState);
  };

  const closeOverlay = () => setIsOverlayOpen(false);

  const onUpvote = useCallback((id: string) => {
    // todo
  }, []);

  const onDownvote = useCallback((id: string) => {
    // todo
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}`);

      if (!response.ok) {
        throw new Error("Could not fetch posts!");
      }

      const data = await response.json();

      setPost(data.data);
    } catch (error) {
      console.error("Could not fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPost();
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
