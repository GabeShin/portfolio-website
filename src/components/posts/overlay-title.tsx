import React from "react";
import { IPost } from "@/interfaces/posts.interface";
import { VoteCounter } from "./vote-counter";

interface OverlayTitleProps {
  post: IPost;
  onUpvote: () => void;
  onDownvote: () => void;
}

const OverlayTitle = ({ post, onUpvote, onDownvote }: OverlayTitleProps) => {
  const { counter, title, date, author } = post;
  const formattedDate = date.toDateString();

  return (
    <div className="flex items-start p-2 pt-4">
      {/* Upvote, Counter, Downvote */}
      <VoteCounter
        counter={counter}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        orientation="vertical"
      />

      {/* Profile Picture, Author, Date, and Title */}
      <div>
        <div className="flex items-center">
          <img
            src="profile-picture-small.jpeg"
            alt={"profile"}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm font-medium">r/iamGabeShin</span>
          <span className="text-xs text-gray-400 ml-2">
            Posted by {author} on {formattedDate}
          </span>
        </div>
        <h2 className="text-xl mt-1">{title}</h2>
      </div>
    </div>
  );
};

export default OverlayTitle;
