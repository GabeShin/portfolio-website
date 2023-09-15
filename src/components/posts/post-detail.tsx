import React from "react";
import { IPost } from "../../interfaces/posts.interface";
import { CategoryIcon } from "./category-icon";

const formatDate = (date: Date) => {
  if (!date) return "Unknown Date";
  return date.toDateString();
};

const PostDetails = ({ post }: { post: IPost }) => {
  const { category, title, date, author = "Gabe" } = post;
  return (
    <div className="p-2 flex">
      <CategoryIcon category={category} />
      <div className="ml-4 flex flex-col">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs font-light text-gray-500">
          Posted by {author} on {formatDate(date)}
        </span>
      </div>
    </div>
  );
};

export default PostDetails;
